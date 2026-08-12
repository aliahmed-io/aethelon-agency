import { z } from "zod";
import { budgetOptions, projectFocusOptions, timelineOptions } from "../../../shared/form-options";

const normalizedOptionalText = (maximumLength: number) => z
  .string()
  .trim()
  .max(maximumLength)
  .transform((value) => value || undefined)
  .optional();

function isHttpUrl(value: string) {
  try {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

const optionalWebsite = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => value === "" || isHttpUrl(value), "Enter a valid website URL.")
  .transform((value) => value || undefined)
  .optional();

export const contactInputSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(320).transform((value) => value.toLowerCase()),
  company: normalizedOptionalText(160),
  website: optionalWebsite,
  focus: z.enum(projectFocusOptions, { error: "Choose a project focus." }),
  budget: z.enum(budgetOptions).optional(),
  timeline: z.enum(timelineOptions).optional(),
  description: z.string().trim().min(20, "Share a little more about the project.").max(5000),
  middleName: z.string().max(0).optional(),
});

export const newsletterInputSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(320).transform((value) => value.toLowerCase()),
  middleName: z.string().max(0).optional(),
});
