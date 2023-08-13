import { z } from "zod";

export const choreDataSchema = z.object({
  name: z.string().min(3),
  intervalDays: z.coerce.number().min(1),
  lastCompletedAt: z.date().optional(),
});
