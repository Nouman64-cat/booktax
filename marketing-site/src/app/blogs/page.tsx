
import type { Metadata } from "next";
import React from "react";
import { SEO_KEYWORDS } from "../../config/seo";
import BlogsClient from "../../components/blog/BlogsClient";

export const metadata: Metadata = {
    title: "Booktax Blog - Financial Insights for Startups",
    description: "Expert advice on bookkeeping, tax strategy, and financial planning for startups and small businesses. Stay informed with our latest articles.",
    keywords: SEO_KEYWORDS.BLOGS,
};

export default function BlogsPage() {
    return (
        <main>
            <BlogsClient />
        </main>
    );
}
