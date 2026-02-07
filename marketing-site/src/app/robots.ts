import { MetadataRoute } from "next";

export const dynamic = "force-static"; // Force static generation needed for output: export

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/"],
    },
    sitemap: "https://booktaxsolution.com/sitemap.xml",
  };
}
