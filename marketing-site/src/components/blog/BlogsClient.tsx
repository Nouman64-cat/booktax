
"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { dummyBlogs } from "../../data/dummyBlogs";

const BlogsClient: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen py-24 sm:py-32 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Financial Insights & Resources</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Expert advice to help you manage your finances, optimize taxes, and scale your business.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {dummyBlogs.map((post) => (
                        <article key={post.slug} className="flex flex-col items-start justify-between">
                            <div className="relative w-full">
                                {post.imageUrl && (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    />
                                )}
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.date} className="text-gray-500 dark:text-gray-400">
                                        {format(new Date(post.date), "MMM d, yyyy")}
                                    </time>
                                    {post.categories.map((cat) => (
                                        <span key={cat.slug} className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            {cat.title}
                                        </span>
                                    ))}
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                        <Link href={`/blogs/${post.slug}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    {post.authors.map((author) => (
                                        <div key={author.name} className="flex items-center gap-x-2">
                                            {author.imageUrl && (
                                                <img src={author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                                            )}
                                            <div className="text-sm leading-6">
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    <span className="absolute inset-0" />
                                                    {author.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogsClient;
