import "dotenv/config";
import Fastify from "fastify";
import { scrapeProductsJob } from "./jobs/scrape-products.job.js";
import type { ScrapBody } from "./schemas/scrap-body.schema.js";

const app = Fastify({ logger: true });

app.post<{ Body: ScrapBody }>("/scrap", async (request, reply) => {
  const { url } = request.body;
  console.log("[SCRAPPER] URL recebida:", url);

  if (!url) {
    return reply.status(400).send({ error: "URL é obrigatória" });
  }

  try {
    const product = await scrapeProductsJob(url);
    return product;
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({
      error: "Erro ao scrapear produto",
    });
  }
});

app.listen({ port: 4001, host: "0.0.0.0" }, () => {
  console.log("🕷️ Scrapper HTTP rodando em http://localhost:4001");
});
