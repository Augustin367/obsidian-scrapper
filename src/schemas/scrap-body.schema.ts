import z from "zod";

export const scrapBodySchema = z.object({
  url: z.url(),
});

export type ScrapBody = z.infer<typeof scrapBodySchema>;
