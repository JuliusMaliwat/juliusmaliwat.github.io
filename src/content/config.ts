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

const skills = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    category: z.enum([
      "Programming & Development",
      "Data Engineering & Cloud",
      "Data Science, AI & Analytics",
    ]),
    order: z.number().optional(),
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

export const collections = {
  profile,
  skills,
  projects,
};
