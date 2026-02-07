import type { Metadata } from "next";
import React from "react";
import { SEO_KEYWORDS } from "../config/seo";
import { LOGO_URL } from "../config";
import HeroSection from "../components/home/HeroSection";
import ServicesOverview from "../components/home/ServicesOverview";
import TrustedBy from "../components/home/TrustedBy";

export const metadata: Metadata = {
  title: "Booktax Solution - Financial Clarity for Startups & Small Businesses",
  description: "Booktax provides expert bookkeeping, strategic tax planning, and automated financial insights for startups and small businesses. Stop worrying about your books and focus on scaling.",
  keywords: SEO_KEYWORDS.HOME,
  openGraph: {
    title: "Booktax - Expert Bookkeeping & Tax Services",
    description: "Automated bookkeeping and strategic tax planning for modern businesses.",
    images: [LOGO_URL],
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Booktax',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Expert bookkeeping, strategic tax planning, and automated financial insights for startups.',
    publisher: {
      '@type': 'Organization',
      name: 'Booktax',
      logo: LOGO_URL,
      url: 'https://booktaxsolution.com'
    }
  }
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ServicesOverview />
      <TrustedBy />
    </main>
  );
}
