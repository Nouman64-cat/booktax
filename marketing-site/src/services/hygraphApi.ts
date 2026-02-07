import type {
  BlogDetail,
  BlogListEntry,
  CategorySummary,
  TagSummary,
} from "../types/blog";

// Mock empty responses since Hygraph implementation is being removed

export const fetchBlogs = async (
  signal?: AbortSignal,
): Promise<{
  blogs: BlogListEntry[];
  categories: CategorySummary[];
  tags: TagSummary[];
}> => {
  return Promise.resolve({
    blogs: [],
    categories: [],
    tags: [],
  });
};

export const fetchBlogBySlug = async (
  slug: string,
  signal?: AbortSignal,
): Promise<BlogDetail | null> => {
  return Promise.resolve(null);
};

export const fetchBlogsByAuthor = async (
  authorName: string,
  signal?: AbortSignal,
): Promise<BlogListEntry[]> => {
  return Promise.resolve([]);
};
