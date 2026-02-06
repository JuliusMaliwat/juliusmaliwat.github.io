// Content collections define the structured data powering pages.
import { defineCollection, z } from "astro:content";

const profile = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    location: z.string().optional(),
    email: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
    // Optional greeting shown on the Home hero.
    homeGreeting: z.string().optional(),
    bioShort: z.string(),
  }),
});

const experience = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).optional(),
    tech: z.array(z.string()).optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
  }),
});

const education = defineCollection({
  type: "content",
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    summary: z.string().optional(),
    grade: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    thesis: z.string().optional(),
    projects: z.array(z.string()).optional(),
    courses: z.array(z.string()).optional(),
  }),
});

const certifications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    credentialUrl: z.string().url(),
  }),
});

const interests = defineCollection({
  type: "content",
  schema: z.object({
    label: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.enum(["university", "personal", "work-sample"]),
    status: z.enum(["active", "shipped", "archived"]).optional(),
    // Draft items are hidden from the Projects list.
    draft: z.boolean().optional(),
    summary: z.string(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    tech: z.array(z.string()).optional(),
    year: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .optional(),
    media: z
      .array(
        z.object({
          alt: z.string(),
          src: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { profile, experience, education, certifications, interests, projects };
