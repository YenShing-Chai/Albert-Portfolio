import { z } from "zod";

/** Contact form schema — shared by the client form and the API route. */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(100),
  company: z.string().max(120).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email address."),
  role: z.string().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Please add a little more detail (10+ characters).")
    .max(4000),
  // Honeypot — must stay empty. Bots tend to fill every field.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
