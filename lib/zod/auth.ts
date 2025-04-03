import { z } from "zod";

const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export { signInSchema };
