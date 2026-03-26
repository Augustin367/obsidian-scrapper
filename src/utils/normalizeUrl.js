export function normalizeUrl(url) {
    try {
        const u = new URL(url);
        const asin = u.pathname.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
        if (!asin)
            return url;
        return `https://www.amazon.com.br/dp/${asin}`;
    }
    catch {
        return url;
    }
}
//# sourceMappingURL=normalizeUrl.js.map