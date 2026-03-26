import * as cheerio from "cheerio";
import { apiClient } from "../http/api-client.js";
import {
  scrapProductSchema,
  type ScrapProduct,
} from "../schemas/scrap-product.schema.js";
import { normalizeUrl } from "../utils/normalizeUrl.js";

export async function scrapeAmazon(url: string): Promise<ScrapProduct> {
  const response = await apiClient.get(url);

  if (response.data.includes("Type the characters you see")) {
    throw new Error("Amazon bloqueou o scrapping (CAPTCHA)");
  }

  const $ = cheerio.load(response.data);

  const title = $("#productTitle").text().trim();

  const whole = $("#apex-pricetopay-value .a-price-whole")
    .first()
    .text()
    .replace(/\./g, "")
    .trim();

  const fraction = $("#apex-pricetopay-value .a-price-fraction")
    .first()
    .text()
    .trim();

  let rawPriceText = $("#apex-pricetopay-accessibility-label")
    .first()
    .text()
    .trim();

  let price: number;

  if (rawPriceText) {
    price = Number(rawPriceText.replace(/[^\d,]/g, "").replace(",", "."));
  } else if (whole && fraction) {
    price = Number(`${whole}.${fraction}`);
  } else {
    throw new Error("Preço não encontrado no HTML da Amazon");
  }

  price = Math.round(price * 100) / 100;

  const priceSource = rawPriceText
    ? "accessibility-label"
    : "price-whole/fraction";

  const memory =
    $("#inline-twister-expanded-dimension-text-size_name").text().trim() ||
    undefined;

  const color =
    $("#inline-twister-expanded-dimension-text-color_name").text().trim() ||
    undefined;

  const imageUrl =
    $("#imgTagWrapperId img").attr("src") ?? $("#landingImage").attr("src");

  if (!title || Number.isNaN(price) || price <= 0) {
    throw new Error("Falha ao extrair produto da Amazon");
  }

  const result = {
    title,
    price,
    imageUrl,
    productUrl: normalizeUrl(url),
    source: "amazon",
    memory,
    color,
    priceSource,
  };

  return scrapProductSchema.parse(result);
}
