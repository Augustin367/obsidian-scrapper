import "dotenv/config";
import Fastify from "fastify";
import { scrapeProductsJob } from "./jobs/scrape-products.job.js";
import type { ScrapBody } from "./schemas/scrap-body.schema.js";

const app = Fastify({ logger: true });

app.get("/", async () => {
  return { status: "ok", service: "scrapper" };
});

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

const port = Number(process.env.PORT) || 8080;

app.listen({ port, host: "0.0.0.0" }, () => {
  console.log(`Scrapper HTTP rodando na porta ${port}`);
});
