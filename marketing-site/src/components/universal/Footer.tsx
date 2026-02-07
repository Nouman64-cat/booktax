"use client";

import React, { useState } from "react";
import Link from "next/link";
import { subscribeToNewsletter } from "../../services/newsletter.api";
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const footerLinks = [
    {
        heading: "Company",
        links: [
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Services", to: "/services" },
            { label: "Contact", to: "/contact" },
        ],
    },
    {
        heading: "Resources",
        links: [
            { label: "Blogs", to: "/blogs" },
        ],
    },
];

const socialLinks = [
    {
        name: "Twitter",
        href: "https://x.com/Booktax",
        icon: <FaTwitter className="w-5 h-5" />,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/Booktax",
        icon: <FaLinkedin className="w-5 h-5" />,
    },
];

const Footer: React.FC = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [message, setMessage] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);

    const handleSubscribe = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!email) {
            setMessage({ text: "Please enter a valid email.", type: "error" });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await subscribeToNewsletter(email);
            setMessage({ text: response.message, type: "success" });
            setEmail("");
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.detail ||
                "Failed to subscribe. Please try again.";
            setMessage({ text: errorMessage, type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="relative mt-[-1px] overflow-hidden bg-gray-950 text-slate-200">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top gradient border */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

                {/* Subtle emerald glow */}
                <div className="absolute -left-40 -bottom-40 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px]" />
                <div className="absolute -right-40 -top-40 w-80 h-80 rounded-full bg-emerald-500/5 blur-[100px]" />
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-20">
                {/* Top Section - Newsletter CTA */}
                <div className="mb-16 lg:mb-20">
                    <div className={`relative mx-auto max-w-2xl rounded-2xl border transition-all duration-500 ${isFocused
                        ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/5"
                        : "border-white/10 bg-white/[0.02]"
                        } p-8 lg:p-10 backdrop-blur-sm`}>
                        {/* Glassmorphism effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                        <div className="relative text-center">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-semibold text-emerald-500">
                                    Newsletter
                                </span>
                            </div>

                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                    Stay on Top of Your Finances
                                </span>
                            </h3>
                            <p className="text-slate-400 text-sm lg:text-base mb-8 max-w-md mx-auto">
                                Get tax tips, financial strategies, and startup growth insights delivered to your inbox monthly.
                            </p>

                            <form className="mx-auto max-w-md" onSubmit={handleSubscribe}>
                                <div className={`relative flex items-center gap-2 rounded-full p-1.5 transition-all duration-300 ${isFocused
                                    ? "bg-white/10 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/20"
                                    : "bg-white/5 ring-1 ring-white/10"
                                    }`}>
                                    <div className="relative flex-1">
                                        <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            className="w-full rounded-full bg-transparent pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <FaSpinner className="animate-spin h-4 w-4" />
                                                <span>Subscribing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Subscribe</span>
                                                <svg
                                                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Status Messages */}
                                <div className="h-6 mt-3">
                                    {message && (
                                        <p className={`text-sm flex items-center justify-center gap-2 animate-fade-in ${message.type === "success" ? "text-emerald-500" : "text-red-400"
                                            }`}>
                                            {message.type === "success" ? (
                                                <FaCheckCircle className="w-4 h-4" />
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                            {message.text}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Middle Section - Links Grid */}
                <div className="grid gap-12 lg:gap-8 lg:grid-cols-12 pb-12 border-b border-white/10">
                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <div className="group inline-flex items-center gap-3 mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative w-12 h-12 flex items-center justify-center bg-gray-900 border border-emerald-500/30 rounded-xl text-white font-bold text-xl shadow-lg group-hover:border-emerald-500 transition-colors">
                                    <span className="text-emerald-500">B</span>
                                </div>
                            </div>
                            <div className="leading-tight">
                                <p className="text-lg font-bold text-white">
                                    Booktax
                                </p>
                                <p className="text-xs font-medium text-emerald-500">
                                    Solution
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
                            Expert bookkeeping, strategic tax planning, and automated financial insights for startups and small businesses.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-white hover:scale-110"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-8 grid gap-8 sm:grid-cols-2">
                        {footerLinks.map((section) => (
                            <div key={section.heading}>
                                <h4 className="text-xs font-semibold text-slate-500 mb-5">
                                    {section.heading}
                                </h4>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.to}
                                                className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-all duration-200 hover:text-white"
                                            >
                                                <span className="w-0 h-px bg-emerald-500 transition-all duration-300 group-hover:w-3" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section - Copyright */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Booktax Solution. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
