import z from "zod";

export const scrapProductSchema = z.object({
  source: z.string(),
  title: z.string().min(1),
  price: z.number().positive(),
  productUrl: z.string().url(),
  color: z.string().optional(),
  memory: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export type ScrapProduct = z.infer<typeof scrapProductSchema>;
