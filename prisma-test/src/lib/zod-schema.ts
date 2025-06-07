import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.string().min(2, "name is req"),
  email: z.string().email("invalid email format!").min(5, "email is required."),
  password: z.string().min(4, "min 4 lengths!"),
});
