
import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import Image from "next/image";
import { fetchBlogBySlug } from "../../../services/hygraphApi";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface BlogPageProps {
    params: { slug: string };
}

export async function generateMetadata(
    { params }: BlogPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const blog = await fetchBlogBySlug(params.slug);

    if (!blog) {
        return {
            title: "Blog Post Not Found",
        };
    }

    return {
        title: `${blog.title} | Booktax Blog`,
        description: blog.excerpt,
        openGraph: {
            images: blog.imageUrl ? [blog.imageUrl] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
    const blog = await fetchBlogBySlug(params.slug);

    if (!blog) {
        notFound();
    }

    return (
        <article className="mx-auto max-w-3xl px-6 lg:px-8 py-24 sm:py-32 bg-white dark:bg-gray-950 min-h-screen">
            <div className="mx-auto text-center">
                <div className="flex items-center justify-center gap-x-4 text-xs mb-8">
                    <time dateTime={blog.date} className="text-gray-500 dark:text-gray-400">
                        {format(new Date(blog.date), "MMMM d, yyyy")}
                    </time>
                    {blog.categories.map(cat => (
                        <span key={cat.slug} className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300">
                            {cat.title}
                        </span>
                    ))}
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
                    {blog.title}
                </h1>
                <div className="flex items-center justify-center gap-x-4 mb-10">
                    {blog.authors.map(author => (
                        <div key={author.name} className="flex items-center gap-x-2">
                            {author.imageUrl && <img src={author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />}
                            <div className="text-sm leading-6">
                                <p className="font-semibold text-gray-900 dark:text-white">{author.name}</p>
                                {author.role && <p className="text-gray-500 dark:text-gray-400 text-xs">{author.role}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 aspect-[16/9] w-full relative">
                {blog.imageUrl && (
                    <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="rounded-2xl object-cover w-full h-full shadow-xl ring-1 ring-gray-900/10 dark:ring-white/10"
                    />
                )}
            </div>

            <div className="mt-10 max-w-2xl mx-auto prose dark:prose-invert lg:prose-lg">
                <p className="lead">{blog.excerpt}</p>
                <div dangerouslySetInnerHTML={{ __html: blog.content.markdown }} />
            </div>
        </article>
    );
}
