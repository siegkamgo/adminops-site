export default function robots() {
  const baseUrl = "https://adminops.cloud";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      }
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
