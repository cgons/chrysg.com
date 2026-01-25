import { z } from "zod";

export const EmailDetailsSchema = z.object({
  name: z.string(),
  email: z.email(),
  message: z.string(),
  "cf-turnstile-response": z.string(),
});

export type EmailDetails = z.infer<typeof EmailDetailsSchema>;
