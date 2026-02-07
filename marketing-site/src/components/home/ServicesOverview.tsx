"use client";

import React from "react";
import Link from "next/link";
import { FiPieChart, FiTrendingUp, FiActivity, FiArrowRight } from "react-icons/fi";

const ServicesOverview: React.FC = () => {
    return (
        <section className="bg-white dark:bg-gray-950 py-24 sm:py-32 relative overflow-hidden transition-colors duration-300">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-emerald-600 dark:text-emerald-500 font-semibold tracking-wide uppercase text-sm mb-3">
                        Why Booktax Solution?
                    </h2>
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
                        The Ecosystem for Your Finances
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Replace your disconnected spreadsheets and legacy accountants with a unified, tech-forward financial engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Card 1: Main Feature (Autopilot Bookkeeping) */}
                    <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 hover:border-emerald-500/30 transition-all duration-300 flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6">
                                <FiPieChart className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Autopilot Bookkeeping</h4>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                We sync directly with your bank accounts, categorize transactions in real-time, and deliver CPA-reviewed financial statements every month. Zero manual data entry required.
                            </p>
                        </div>

                        {/* Interactive Spreadsheet UI */}
                        <div className="relative z-10 mt-auto bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden text-sm">
                            {/* Toolbar/Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                                    </div>
                                    <span className="ml-3 text-xs font-medium text-gray-500 dark:text-gray-400">General Ledger - Jan 2026</span>
                                </div>
                                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Live Sync
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50/50 dark:bg-gray-900/30 text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                                <div className="col-span-2">DATE</div>
                                <div className="col-span-4">DESCRIPTION</div>
                                <div className="col-span-3">CATEGORY</div>
                                <div className="col-span-3 text-right">AMOUNT</div>
                            </div>

                            {/* Table Rows */}
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors cursor-default">
                                    <div className="col-span-2 text-gray-500 dark:text-gray-400 font-mono text-xs">Jan 14</div>
                                    <div className="col-span-4 font-medium text-gray-900 dark:text-white truncate">Stripe Payout #9921</div>
                                    <div className="col-span-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                                            Revenue
                                        </span>
                                    </div>
                                    <div className="col-span-3 text-right font-medium text-gray-900 dark:text-white">+$4,250.00</div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors cursor-default">
                                    <div className="col-span-2 text-gray-500 dark:text-gray-400 font-mono text-xs">Jan 12</div>
                                    <div className="col-span-4 font-medium text-gray-900 dark:text-white truncate">AWS Web Services</div>
                                    <div className="col-span-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                            Hosting
                                        </span>
                                    </div>
                                    <div className="col-span-3 text-right font-medium text-gray-900 dark:text-white">-$245.20</div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors cursor-default">
                                    <div className="col-span-2 text-gray-500 dark:text-gray-400 font-mono text-xs">Jan 10</div>
                                    <div className="col-span-4 font-medium text-gray-900 dark:text-white truncate">WeWork NYC</div>
                                    <div className="col-span-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                            Rent
                                        </span>
                                    </div>
                                    <div className="col-span-3 text-right font-medium text-gray-900 dark:text-white">-$1,200.00</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Stack */}
                    <div className="flex flex-col gap-8">
                        {/* Card 2: Strategic Tax Planning */}
                        <div className="relative group overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 hover:border-blue-500/30 transition-all duration-300 flex-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                                    <FiTrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Proactive Tax Strategy</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Don't wait until April. We identify R&D credits and deductions year-round to minimize your liability.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Fractional CFO */}
                        <div className="relative group overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 hover:border-purple-500/30 transition-all duration-300 flex-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-6">
                                    <FiActivity className="w-6 h-6 text-purple-600 dark:text-purple-500" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fractional CFO</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Board-ready reporting, burn rate analysis, and fundraising support when you need it most.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 font-semibold transition-colors group"
                    >
                        Explore all services
                        <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesOverview;
