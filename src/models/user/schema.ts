import { z } from "zod/v4";

export const UserSchema = z.object({
  email: z.string(),
});

export type User = z.infer<typeof UserSchema>;
