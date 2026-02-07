import type {
  BlogDetail,
  BlogListEntry,
  CategorySummary,
  TagSummary,
} from "../types/blog";
import { dummyBlogs } from "../data/dummyBlogs";

// Mock implementation using dummy data

export const fetchBlogs = async (
  signal?: AbortSignal,
): Promise<{
  blogs: BlogListEntry[];
  categories: CategorySummary[];
  tags: TagSummary[];
}> => {
  // Extract categories and tags if needed, or return empty for now
  return Promise.resolve({
    blogs: dummyBlogs,
    categories: [],
    tags: [],
  });
};

export const fetchBlogBySlug = async (
  slug: string,
  signal?: AbortSignal,
): Promise<BlogDetail | null> => {
  const blog = dummyBlogs.find((b) => b.slug === slug);
  return Promise.resolve(blog || null);
};

export const fetchBlogsByAuthor = async (
  authorName: string,
  signal?: AbortSignal,
): Promise<BlogListEntry[]> => {
  const blogs = dummyBlogs.filter((b) =>
    b.authors.some((a) => a.name === authorName),
  );
  return Promise.resolve(blogs);
};
