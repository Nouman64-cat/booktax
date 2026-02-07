
"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";

const dummyBlogs = [
    {
        slug: "top-tax-deductions-startups-2026",
        title: "10 Essential Tax Deductions for Startups in 2026",
        excerpt: "Maximize your tax savings this year with our guide to the most overlooked deductions for new businesses. From R&D credits to home office expenses, ensure you're not leaving money on the table.",
        coverImage: {
            url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000",
        },
        date: "2026-01-15",
        author: {
            name: "Sarah Jenkins, CPA",
            picture: {
                url: "https://randomuser.me/api/portraits/women/44.jpg",
            },
        },
        category: "Tax Strategy",
    },
    {
        slug: "bookkeeping-mistakes-to-avoid",
        title: "5 Common Bookkeeping Mistakes That Kill Startups",
        excerpt: "Poor financial records can sink a promising company. Learn about the most common bookkeeping errors founders make and how to automate your way to accuracy.",
        coverImage: {
            url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
        },
        date: "2026-02-01",
        author: {
            name: "Michael Chang",
            picture: {
                url: "https://randomuser.me/api/portraits/men/32.jpg",
            },
        },
        category: "Bookkeeping",
    },
    {
        slug: "hiring-fractional-cfo",
        title: "When Is the Right Time to Hire a Fractional CFO?",
        excerpt: "As your revenue grows, so does financial complexity. Discover the key indicators that suggest your startup is ready for high-level financial strategic guidance.",
        coverImage: {
            url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2000",
        },
        date: "2026-02-05",
        author: {
            name: "Nouman Ejaz",
            picture: {
                url: "https://randomuser.me/api/portraits/men/85.jpg",
            },
        },
        category: "Growth Strategy",
    },
];

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
                                <img
                                    src={post.coverImage.url}
                                    alt={post.title}
                                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
                            </div>
                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.date} className="text-gray-500 dark:text-gray-400">
                                        {format(new Date(post.date), "MMM d, yyyy")}
                                    </time>
                                    <span className="relative z-10 rounded-full bg-gray-50 dark:bg-gray-800 px-3 py-1.5 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        {post.category}
                                    </span>
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
                                    <img src={post.author.picture.url} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </p>
                                    </div>
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
