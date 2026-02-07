
import type { Metadata } from "next";
import React from "react";
import { SEO_KEYWORDS } from "../../config/seo";
import ServicesClient from "../../components/services/ServicesClient";

export const metadata: Metadata = {
    title: "Comprehensive Financial Services | Booktax",
    description: "Explore our range of financial services including bookkeeping, tax preparation, CFO advisory, and payroll management for startups and small businesses.",
    keywords: SEO_KEYWORDS.SERVICES,
};

export default function ServicesPage() {
    return (
        <main>
            <ServicesClient />
        </main>
    );
}
