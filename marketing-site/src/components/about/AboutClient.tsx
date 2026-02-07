"use client";

import React from "react";
import Link from "next/link";
import { FiTarget, FiShield, FiZap, FiUsers, FiTrendingUp, FiArrowRight } from "react-icons/fi";

const values = [
    {
        name: "Proactive, Not Reactive",
        description: "Traditional accountants talk to you once a year. We monitor your financials daily and alert you to savings opportunities before it's too late.",
        icon: FiTrendingUp,
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        name: "Transparency First",
        description: "No hourly billing. No hidden fees. You get a predictable monthly subscription and a clear view of your financial health at all times.",
        icon: FiShield,
        color: "bg-blue-100 text-blue-600",
    },
    {
        name: "Speed & Accuracy",
        description: "We combine AI automation for speed with expert CPA review for accuracy. You get your books closed in days, not weeks.",
        icon: FiZap,
        color: "bg-purple-100 text-purple-600",
    },
];

const AboutClient: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden pt-24 pb-16 sm:pb-24">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-50/50 rounded-full blur-3xl -z-10" />

                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 mb-6 border border-emerald-100">
                        <FiUsers className="w-4 h-4" />
                        <span>Our Mission</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl mx-auto">
                        Finance wasn't built for startups. <span className="text-emerald-600">So we rebuilt it.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Booktax exists to bridge the gap between complex legacy accounting and the speed of modern business. We believe financial clarity is a right, not a luxury.
                    </p>
                </div>
            </div>

            {/* The Story / Problem Section */}
            <div className="py-24 bg-gray-50 border-y border-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-blue-50 rounded-3xl transform rotate-3 scale-105 opacity-50" />
                            <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 border border-red-100">
                                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">✕</div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">The Old Way</h4>
                                            <p className="text-sm text-gray-600 mt-1"> emailing CSVs, waiting weeks for replies, surprise bills, and reactive tax filing.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="w-0.5 h-8 bg-gray-200"></div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                            <FiArrowRight className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">The Booktax Way</h4>
                                            <p className="text-sm text-gray-600 mt-1">Real-time dashboards, automated categorization, dedicated expert support, and year-round strategy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Why we started Booktax
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                As founders ourselves, we were frustrated. We had modern tools for everything—Slack for comms, Linear for tasks, Stripe for payments—but our finances were stuck in 1990.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We realized that most "tech-enabled" accounting firms were just traditional firms with a better website. They still relied on manual entry and outdated processes.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We built Booktax to be the financial operating system we always wanted: <strong>fast, transparent, and intelligent.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Grid */}
            <div className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                            Our Core Principles
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We're not just bookkeepers; we're partners in your growth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${value.color} group-hover:scale-110 transition-transform`}>
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.name}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Simple Stats / Trust Section */}
            <div className="bg-gray-900 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-12">
                        Trusted by founders scaling from $0 to $50M
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
                        {/* Placeholder generic stats or labels */}
                        <div className="p-4">
                            <div className="text-4xl font-bold text-emerald-400 mb-2">$500M+</div>
                            <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">Transactions Processed</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
                            <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">Audit Success Rate</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-purple-400 mb-2">24h</div>
                            <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">Response Time</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
                            <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">Partner Integrations</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-emerald-50 py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                        Ready to upgrade your finance stack?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                        Join hundreds of fast-growing companies who trust Booktax with their numbers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-emerald-700 bg-white border border-emerald-200 rounded-xl hover:bg-emerald-50 transition-all"
                        >
                            Explore Services
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutClient;
