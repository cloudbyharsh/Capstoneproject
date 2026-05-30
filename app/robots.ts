import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/book/confirmation"],
    },
    sitemap: "https://setu.app/sitemap.xml",
  };
}
