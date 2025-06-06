import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.string().min(2, "at least 2 characters!").max(20),
  email: z.string().email(),
  password: z.string().min(8).max(50),
});
