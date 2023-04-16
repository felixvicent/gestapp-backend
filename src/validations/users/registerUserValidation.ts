import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
