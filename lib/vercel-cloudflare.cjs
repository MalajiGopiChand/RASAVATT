// Vercel demo has no Cloudflare bindings. APIs require trusted identity and
// return 401, allowing the existing browser-storage preview to operate.
module.exports = { env: {} };
