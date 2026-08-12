import { z } from "zod";

export const contactInputSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(320).transform((value) => value.toLowerCase()),
  company: z.string().trim().max(160).optional(),
  website: z.string().trim().max(2048).optional(),
  focus: z.string().trim().min(2, "Choose a project focus.").max(120),
  budget: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(80).optional(),
  description: z.string().trim().min(20, "Share a little more about the project.").max(5000),
  middleName: z.string().max(0).optional(),
});

export const newsletterInputSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(320).transform((value) => value.toLowerCase()),
  middleName: z.string().max(0).optional(),
});
