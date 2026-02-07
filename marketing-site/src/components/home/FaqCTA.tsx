"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus, FiArrowRight } from "react-icons/fi";

const faqs = [
    {
        question: "How is Booktax different from a traditional CPA?",
        answer: "We combine enterprise-grade software with expert human review. Unlike a traditional CPA who might only talk to you at tax time, we provide real-time bookkeeping, monthly financial statements, and ongoing strategic advice—all for a transparent monthly fee."
    },
    {
        question: "Do you handle R&D tax credits for startups?",
        answer: "Absolutely. We specialize in identifying and filing Federal and State R&D tax credits. For many pre-revenue startups, this can mean saving up to $250,000+ per year against payroll taxes."
    },
    {
        question: "What software do you integrate with?",
        answer: "We integrate seamlessly with the modern stack: QuickBooks Online, Xero, Gusto, Rippling, Stripe, Brex, Ramp, and Mercury. We pull data automatically so you don't have to send us CSVs."
    },
    {
        question: "What if I'm behind on my books?",
        answer: "No problem. Our 'Catch Up' service is designed exactly for this. We'll go back as far as needed to categorize transactions, reconcile accounts, and get you tax-ready quickly."
    }
];

const FaqCTA: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-white dark:bg-gray-950 py-24 sm:py-32 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">

                    {/* FAQ Column */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Common Questions
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Everything you need to know about switching to a modern financial stack.
                        </p>

                        <div className="mt-10 space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-200 dark:border-gray-800 pb-6">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="flex w-full items-start justify-between text-left"
                                    >
                                        <span className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            {faq.question}
                                        </span>
                                        <span className="ml-6 flex h-7 items-center">
                                            {openIndex === index ? (
                                                <FiMinus className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                                            ) : (
                                                <FiPlus className="h-5 w-5 text-gray-400" />
                                            )}
                                        </span>
                                    </button>
                                    {openIndex === index && (
                                        <div className="mt-2 pr-12">
                                            <p className="text-base leading-7 text-gray-600 dark:text-gray-400">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Column */}
                    <div className="flex flex-col justify-center">
                        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl rounded-3xl sm:px-24 xl:py-32">
                            {/* Background Effects */}
                            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.gray.800),theme(colors.gray.900))] opacity-20" />
                            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-gray-600/10 ring-1 ring-gray-900/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center opacity-5" />

                            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Ready to scale your business?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-gray-300">
                                Stop drowning in paperwork. Get expert bookkeeping and tax strategy today.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto text-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all transform hover:scale-105"
                                >
                                    Book a Consultation
                                </Link>
                                <Link
                                    href="/services"
                                    className="text-sm font-semibold leading-6 text-white flex items-center gap-1 group opacity-80 hover:opacity-100 transition-opacity mt-2 sm:mt-0"
                                >
                                    Our Services <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FaqCTA;
