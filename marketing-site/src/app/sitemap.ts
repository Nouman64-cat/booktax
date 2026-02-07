import { MetadataRoute } from "next";
import { fetchBlogs } from "../services/hygraphApi";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://booktaxsolution.com";

  // Static routes
  const routes = ["", "/about", "/services", "/blogs"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Fetch dynamic blog posts
  const { blogs } = await fetchBlogs();
  const blogRoutes = blogs.map((blog: any) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
