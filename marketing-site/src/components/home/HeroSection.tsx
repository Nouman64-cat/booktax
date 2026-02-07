import React from "react";
import Link from "next/link";
import { FaArrowRight } from 'react-icons/fa';
import { STUDIO_URL } from "../../config";

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-white dark:bg-gray-950 overflow-hidden pt-16 pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-8 max-w-2xl relative z-10">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                            Financial Clarity for <span className="text-emerald-600 dark:text-emerald-500">Startups & Small Businesses.</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            Stop worrying about your books. We provide expert accounting, automated bookkeeping, and strategic tax planning so you can focus on scaling.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href="/contact"
                                className="px-8 py-4 rounded-xl bg-emerald-600 text-white text-base font-semibold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Get Started <FaArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/services"
                                className="px-8 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-base font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
                            >
                                View Services
                            </Link>
                        </div>

                        <div className="pt-8 flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Expert Accountants</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Tax Strategy</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - MacBook Mockup with Floating Cards */}
                    <div className="relative mt-12 lg:mt-0 lg:ml-auto w-full max-w-lg lg:max-w-xl perspective-1000">
                        {/* Abstract Background Blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl rounded-full -z-10" />

                        {/* MacBook Mockup Container */}
                        <div className="relative mx-auto w-full">
                            {/* Screen Frame */}
                            <div className="relative bg-gray-900 rounded-t-xl border-[8px] border-b-0 border-gray-800 shadow-2xl overflow-hidden aspect-[16/10]">
                                {/* Screen Content */}
                                <div className="absolute inset-0 bg-white dark:bg-gray-900 flex flex-col">
                                    {/* Mock Browser Header */}
                                    <div className="h-6 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    </div>
                                    {/* Dashboard Preview */}
                                    <div className="flex-1 p-6 overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                            <div className="h-8 w-24 bg-emerald-600 rounded-lg opacity-80" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div className="h-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                                                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                                            </div>
                                            <div className="h-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                                                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                                            </div>
                                            <div className="h-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                                                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                                                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                                            </div>
                                        </div>
                                        <div className="h-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                                            <div className="space-y-3">
                                                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded" />
                                                <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-700/50 rounded" />
                                                <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-700/50 rounded" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Base */}
                            <div className="bg-gray-800 rounded-b-lg h-4 w-full shadow-lg relative mx-auto" />
                            {/* Notch for Open */}
                            <div className="bg-gray-700 rounded-b-md h-1.5 w-16 mx-auto absolute top-0 left-1/2 -translate-x-1/2" />
                        </div>

                        {/* Floating Cards */}
                        {/* Card 1: Expert Accounting */}
                        <div className="absolute -left-4 top-12 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-[180px] animate-float-up" style={{ animationDelay: '0s' }}>
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 3.659c0 3.074-1.813 5.702-4.847 7.03-3.032-1.328-4.846-3.956-4.846-7.03 0-3.075 1.813-5.703 4.846-7.03 3.033 1.328 4.847 3.956 4.847 7.03zm0 3.659V18" /></svg>
                            </div>
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Expert Support</h3>
                            <p className="text-xs text-gray-500">CPA-reviewed financials</p>
                        </div>

                        {/* Card 2: Strategic Tax Planning */}
                        <div className="absolute -right-8 top-32 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-[180px] animate-float-up" style={{ animationDelay: '1.5s' }}>
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">Tax Savings</h3>
                            <p className="text-xs text-gray-500">Maximize your deductions</p>
                        </div>

                        {/* Card 3: Automated Bookkeeping */}
                        <div className="absolute left-8 -bottom-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-[200px] animate-float-up" style={{ animationDelay: '2.5s' }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-xs text-gray-900 dark:text-white">Auto-Sync</h3>
                                    <p className="text-[10px] text-gray-500">Real-time updates</p>
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full w-3/4 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
