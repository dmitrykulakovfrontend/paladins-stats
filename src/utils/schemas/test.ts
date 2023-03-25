import { z } from "zod";

export const testSchema = z.object({
  date: z.string(),
});

export type Test = z.infer<typeof testSchema>;
