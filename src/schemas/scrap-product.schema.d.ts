import z from "zod";
export declare const scrapProductSchema: z.ZodObject<{
    source: z.ZodString;
    title: z.ZodString;
    price: z.ZodNumber;
    productUrl: z.ZodString;
    color: z.ZodOptional<z.ZodString>;
    memory: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
}, z.z.core.$strip>;
export type ScrapProduct = z.infer<typeof scrapProductSchema>;
//# sourceMappingURL=scrap-product.schema.d.ts.map