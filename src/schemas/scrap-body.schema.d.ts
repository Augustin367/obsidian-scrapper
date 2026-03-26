import z from "zod";
export declare const scrapBodySchema: z.ZodObject<{
    url: z.ZodURL;
}, z.z.core.$strip>;
export type ScrapBody = z.infer<typeof scrapBodySchema>;
//# sourceMappingURL=scrap-body.schema.d.ts.map