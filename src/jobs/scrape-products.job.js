import { resolveSource } from "../utils/resolve-source.js";
import { scrapeAmazon } from "../scrappers/amazon.scrapper.js";
export async function scrapeProductsJob(url) {
    console.log("Buscando produto...");
    const source = resolveSource(url);
    let product;
    switch (source) {
        case "amazon":
            product = await scrapeAmazon(url);
            break;
        default:
            throw new Error("Scrapper não implementado para este site");
    }
    console.log("Produto extraído:");
    console.log(product);
    return product;
}
//# sourceMappingURL=scrape-products.job.js.map