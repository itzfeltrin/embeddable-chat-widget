import { z } from "zod/v4";

export const SharedStateSchema = z.object({
  isOnline: z.boolean(),
  isMaintenance: z.boolean(),
});

export type SharedState = z.infer<typeof SharedStateSchema>;
