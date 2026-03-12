import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const DEFAULT_INPUT = path.join(
  repoRoot,
  ".codex",
  "Plants_of_julius.maliwat2000@gmail.com_(Julius).csv"
);
const DEFAULT_OUTPUT = path.join(repoRoot, "src", "data", "what-did-it-take.json");

const WINDOW = {
  start: "2023-09-01",
  endExclusive: "2025-11-01",
  startLabel: "Sep 2023",
  endLabel: "Oct 2025",
};

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOT_HOURS = Array.from({ length: 16 }, (_, index) => index + 7);
const SLOT_MINUTES_THRESHOLD = 10;

const parseArgs = () => {
  const args = process.argv.slice(2);
  const getFlag = (name) => {
    const index = args.indexOf(name);
    return index >= 0 ? args[index + 1] : null;
  };

  return {
    input: getFlag("--input") ?? DEFAULT_INPUT,
    output: getFlag("--output") ?? DEFAULT_OUTPUT,
  };
};

const parseCsvLine = (line) => {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        current += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
};

const parseCsv = (raw) => {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return [];

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });
    return row;
  });
};

const parseForestDate = (value) => {
  if (!value) return null;
  const normalized = value.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatHours = (value) => Number(value.toFixed(1));

const formatMinutes = (value) => Number(value.toFixed(1));

const normalizeTag = (value) => String(value ?? "").trim().toLowerCase();

const monthKey = (date) => date.toISOString().slice(0, 7);

const dateKey = (date) => date.toISOString().slice(0, 10);

const monthRange = (start, endExclusive) => {
  const months = [];
  const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
  const end = new Date(Date.UTC(endExclusive.getUTCFullYear(), endExclusive.getUTCMonth(), 1));

  while (cursor < end) {
    const key = monthKey(cursor);
    const label = new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(cursor);
    months.push({ key, label, hours: 0 });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }

  return months;
};

const buildPayload = (rows, sourceFile) => {
  const start = new Date(`${WINDOW.start}T00:00:00.000Z`);
  const endExclusive = new Date(`${WINDOW.endExclusive}T00:00:00.000Z`);
  const monthSeries = monthRange(start, endExclusive);
  const monthMap = new Map(monthSeries.map((month) => [month.key, month]));
  const dayMap = new Map();
  const slotBuckets = new Map();

  const trackedSessions = [];

  rows.forEach((row) => {
    const sessionStart = parseForestDate(row["Start Time"]);
    const sessionEnd = parseForestDate(row["End Time"]);
    if (!sessionStart || !sessionEnd) return;

    const startMs = sessionStart.getTime();
    if (startMs < start.getTime() || startMs >= endExclusive.getTime()) return;
    if (String(row["Is Success"]).toLowerCase() !== "true") return;
    if (normalizeTag(row.Tag) !== "studio") return;

    const durationMs = Math.max(0, sessionEnd.getTime() - startMs);
    if (!durationMs) return;

    const durationHours = durationMs / 3_600_000;
    const durationMinutes = durationMs / 60_000;
    trackedSessions.push({ sessionStart, durationHours, durationMinutes });

    const month = monthMap.get(monthKey(sessionStart));
    if (month) month.hours += durationHours;

    const day = dateKey(sessionStart);
    dayMap.set(day, (dayMap.get(day) ?? 0) + durationHours);

    const dayofweek = (sessionStart.getDay() + 6) % 7;
    const hour = sessionStart.getHours();
    if (hour >= 7 && hour <= 22) {
      const slotKey = `${dayofweek}-${hour}`;
      slotBuckets.set(slotKey, (slotBuckets.get(slotKey) ?? 0) + durationMinutes);
    }
  });

  const focusSessions = trackedSessions.length;
  const totalHours = trackedSessions.reduce((acc, session) => acc + session.durationHours, 0);
  const daysWithStudy = dayMap.size;
  const avgSessionMinutes =
    focusSessions > 0
      ? trackedSessions.reduce((acc, session) => acc + session.durationMinutes, 0) / focusSessions
      : 0;
  const avgStudyDayHours = daysWithStudy > 0 ? totalHours / daysWithStudy : 0;

  const peakMonth = monthSeries.reduce(
    (peak, month) => (month.hours > peak.hours ? month : peak),
    { key: "", label: "-", hours: 0 }
  );

  const totalWeeks = Math.max(1, (endExclusive.getTime() - start.getTime()) / (7 * 24 * 3_600_000));
  const slotData = [];

  WEEKDAY_LABELS.forEach((_, dayofweek) => {
    SLOT_HOURS.forEach((hour) => {
      const key = `${dayofweek}-${hour}`;
      const totalMinutes = slotBuckets.get(key) ?? 0;
      const avgMinutesPerWeek = totalMinutes / totalWeeks;
      slotData.push({
        dayofweek,
        hour,
        avgMinutesPerWeek: formatMinutes(avgMinutesPerWeek >= SLOT_MINUTES_THRESHOLD ? avgMinutesPerWeek : 0),
      });
    });
  });

  const dailyHours = Array.from(dayMap.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, hours]) => ({
      date,
      hours: formatHours(hours),
    }));

  return {
    title: "What did it take",
    subtitle: "M.Sc in Data Science completed while working full-time",
    window: {
      start: WINDOW.start,
      end: "2025-10-31",
      startLabel: WINDOW.startLabel,
      endLabel: WINDOW.endLabel,
    },
    generatedAt: new Date().toISOString(),
    source: {
      file: sourceFile,
      filter:
        "Tag=Studio, Is Success=true, Start Time between 2023-09-01 and 2025-10-31, avg weekly minutes >= 10",
    },
    metrics: {
      hoursStudied: formatHours(totalHours),
      focusSessions,
      daysWithStudy,
      avgStudyDayHours: formatHours(avgStudyDayHours),
      peakMonthHours: formatHours(peakMonth.hours),
      peakMonthLabel: peakMonth.label,
      avgSessionMinutes: formatMinutes(avgSessionMinutes),
    },
    monthlyHours: monthSeries.map((month) => ({
      key: month.key,
      label: month.label,
      hours: formatHours(month.hours),
    })),
    slotData,
    dailyHours,
    methodology:
      "Forest sessions filtered to Tag=Studio and successful completions only, within Sep 2023 to Oct 2025.",
  };
};

const run = async () => {
  const { input, output } = parseArgs();
  const rawCsv = await fs.readFile(input, "utf8");
  const rows = parseCsv(rawCsv);
  const payload = buildPayload(rows, path.relative(repoRoot, input).replaceAll("\\", "/"));

  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  const relativeOutput = path.relative(repoRoot, output).replaceAll("\\", "/");
  console.log(`[build-msc-dashboard-data] Wrote ${relativeOutput}`);
  console.log(
    `[build-msc-dashboard-data] Sessions: ${payload.metrics.focusSessions}, Hours: ${payload.metrics.hoursStudied}`
  );
};

run().catch((error) => {
  console.error("[build-msc-dashboard-data] Failed:", error);
  process.exitCode = 1;
});
