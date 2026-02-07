
"use client";

import React from "react";
import Link from "next/link";
import { FiCheckCircle, FiTrendingUp, FiPieChart, FiFileText, FiDollarSign, FiActivity } from "react-icons/fi";

const services = [
    {
        icon: FiPieChart,
        title: "Bookkeeping & Month-End Close",
        description: "Accurate, timely financial statements delivered every month. We handle the categorization, reconciliation, and reporting so you always know your numbers.",
        features: ["Monthly P&L and Balance Sheet", "Bank & Credit Card Reconciliation", "Burn Rate Analysis", "Expense Classification"]
    },
    {
        icon: FiFileText,
        title: "Tax Preparation & filing",
        description: "Strategic tax planning and compliance for startups. We ensure you maximize R&D credits and file accurate returns on time, every time.",
        features: ["Federal & State Income Tax", "R&D Tax Credit Calculation", "Sales Tax Compliance", "Quarterly Estimated Payments"]
    },
    {
        icon: FiTrendingUp,
        title: "Fractional CFO & Advisory",
        description: "High-level financial strategy to guide your growth. Get the insights of a CFO without the full-time cost.",
        features: ["Financial Modeling & Forecasting", "Board Meeting Support", "Fundraising Strategy", "Cash Flow Management"]
    },
    {
        icon: FiDollarSign,
        title: "Payroll & HR Support",
        description: "Seamless payroll management integrated with your accounting. We ensure your team gets paid correctly and compliance is maintained.",
        features: ["Payroll Processing", "Benefits Administration", "Contractor Payments (1099s)", "State Registration Support"]
    },
    {
        icon: FiActivity,
        title: "Accounts Payable & Receivable",
        description: "Optimize your cash flow. We manage bill payments and invoicing to keep your operations running smoothly.",
        features: ["Bill Pay Management", "Invoice Creation & Sending", "Collections Support", "Vendor Management"]
    }
];

const ServicesClient: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden pt-14 pb-16 sm:pb-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                            Comprehensive Financial Services
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            From day-to-day bookkeeping to strategic tax planning, we provide the financial infrastructure your business needs to scale.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/contact"
                                className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            >
                                Get Started
                            </Link>
                            <Link href="/pricing" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                View Pricing <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background Blur */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffdb] to-[#1c2143] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {services.map((service) => (
                        <div key={service.title} className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 hover:shadow-lg transition-all hover:ring-emerald-500/20">
                            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                                <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold leading-7 text-gray-900 dark:text-white">
                                {service.title}
                            </h3>
                            <p className="mt-4 flex-auto text-base leading-7 text-gray-600 dark:text-gray-400">
                                {service.description}
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <FiCheckCircle className="h-6 w-5 flex-none text-emerald-600" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* CTA Card */}
                    <div className="flex flex-col justify-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 text-center ring-1 ring-gray-200 dark:ring-gray-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Need something custom?</h3>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            We tailor our services to fit your specific business needs and growth stage.
                        </p>
                        <div className="mt-8">
                            <Link href="/contact" className="inline-block rounded-md bg-gray-900 dark:bg-white px-3.5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesClient;
