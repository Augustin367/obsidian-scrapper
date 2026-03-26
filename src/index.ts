import "dotenv/config";
import { scrapeProductsJob } from "./jobs/scrape-products.job.js";

async function main() {
  const url = <string>process.argv[2] || process.env.SCRAP_URL;

  if (!url) {
    throw new Error("URL não informada");
  }

  console.log("Scraper iniciado");
  await scrapeProductsJob(url);
  console.log("Scraper finalizado");
}

main().catch((err) => {
  console.error("Erro no scraper", err);
  process.exit(1);
});
