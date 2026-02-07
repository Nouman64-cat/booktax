import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../components/Providers";
import Navbar from "../components/universal/Navbar";
import Footer from "../components/universal/Footer";

const axiforma = localFont({
    src: [
        {
            path: "../../public/fonts/Axiforma-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/Axiforma-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Axiforma-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/Axiforma-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/Axiforma-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-axiforma",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://booktaxsolution.com'),
    title: {
        template: '%s | Booktax Solution',
        default: 'Booktax Solution - Financial Clarity for Startups',
    },
    description: "Expert bookkeeping, strategic tax planning, and automated financial insights for startups and small businesses.",
    alternates: {
        canonical: './',
    },
    openGraph: {
        title: "Booktax Solution - Financial Clarity",
        description: "Expert bookkeeping, strategic tax planning, and automated financial insights for startups and small businesses.",
        type: "website",
        images: ["https://cdn-booktax.s3.us-east-1.amazonaws.com/booktax-logo.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${axiforma.variable} antialiased font-sans`}
            >
                <Providers>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
