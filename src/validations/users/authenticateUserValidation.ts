import { z } from "zod";

export const AuthenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthenticateUserInput = z.infer<typeof AuthenticateUserSchema>;
