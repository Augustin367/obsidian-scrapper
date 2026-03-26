export function resolveSource(url) {
    const hostname = new URL(url).hostname;
    if (hostname.includes("amazon"))
        return "amazon";
    if (hostname.includes("shopee"))
        return "shopee";
    if (hostname.includes("mercadolivre"))
        return "mercadolivre";
    throw new Error("Site não suportado");
}
//# sourceMappingURL=resolve-source.js.map