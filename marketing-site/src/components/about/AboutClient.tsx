"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    FaGithub,
    FaUsers,
    FaDiscord,
} from "react-icons/fa";
import { HiBeaker, HiCog } from "react-icons/hi";


const CONTACT_EMAIL = "contact@Booktax.com";

const values = [
    {
        name: "Scientific rigor",
        icon: HiBeaker,
        description:
            "Probability engines are validated against published ratios and unit tests, keeping outputs predictable and reproducible.",
        color: "from-blue-500 to-cyan-500",
    },
    {
        name: "Design empathy",
        icon: FaUsers,
        description:
            "Interfaces are built for cross-functional teams so engineers, geneticists, and operators work from a shared language.",
        color: "from-purple-500 to-pink-500",
    },
    {
        name: "Extensible tooling",
        icon: HiCog,
        description:
            "Traits, weights, and downstream pipelines are modular so teams can adapt Booktax to bespoke research programs.",
        color: "from-primary-500 to-primary-500",
    },
];

const AboutClient: React.FC = () => {
    const router = useRouter();

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
            {/* Background decoration - optional, subtle */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-gradient-to-bl from-primary-50/40 via-primary-50/20 to-transparent dark:from-primary-900/10 dark:via-primary-900/5 dark:to-transparent rounded-full blur-3xl opacity-50" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-24">
                <div className="grid gap-16 lg:grid-cols-[1.2fr,1fr] lg:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 rounded-full bg-primary-50 dark:bg-primary-900/20 px-4 py-2 border border-primary-100 dark:border-primary-800">
                            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                                Our Story
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold leading-tight text-gray-900 dark:text-white sm:text-6xl">
                            Booktax is crafted for teams who translate
                            <span className="relative whitespace-nowrap px-2">
                                <span className="relative z-10 text-primary-500">genetics</span>
                            </span>
                            into action.
                        </h1>

                        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-2xl">
                            We believe that understanding inheritance patterns should feel
                            intuitive, whether you are prototyping in a notebook or running
                            production simulations. Booktax distills complex models into
                            approachable building blocks so you can focus on insight
                            generation.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="group inline-flex items-center justify-center rounded-lg bg-gray-900 dark:bg-white px-8 py-3 text-sm font-semibold text-white dark:text-gray-900 transition-all hover:bg-gray-800 dark:hover:bg-gray-100"
                            >
                                <span>Contact us</span>
                                <svg
                                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm">
                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-10 shadow-xl">

                                {/* Logo or placeholder */}
                                <div className="mx-auto w-36 mb-6 flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white">
                                    Booktax
                                </div>

                                <p className="text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    Merging Mendelian logic, polygenic scoring, and thoughtful
                                    interaction design into a single learning platform.
                                </p>

                                <div className="mt-6 flex justify-center gap-2">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce delay-100" />
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mt-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 rounded-full bg-primary-50 dark:bg-primary-900/20 px-4 py-2 border border-primary-100 dark:border-primary-800 mb-6">
                            <div className="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
                            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                                Our Values
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            What guides us
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={value.name}
                                    className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                                    style={{ animationDelay: `${index * 200}ms` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative">
                                        <div
                                            className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-900 dark:bg-gray-800 text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300"
                                        >
                                            <Icon className="w-8 h-8" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                                            {value.name}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Community Section */}
                <div className="mt-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 rounded-full bg-primary-50 dark:bg-primary-900/20 px-4 py-2 border border-primary-100 dark:border-primary-800 mb-6">
                            <FaUsers className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                                Our Community
                            </span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Join the Booktax Community
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Connect with genetics enthusiasts, researchers, and developers. Share ideas, get support, and be part of our growing community.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                        {/* Discord Card */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-gray-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative flex items-start gap-4">
                                <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gray-900 dark:bg-gray-800 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <FaDiscord className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        Discord Server
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                        Join our Discord for real-time discussions, community events, and direct support from the team.
                                    </p>
                                    <a
                                        href="https://discord.gg/5qtEfusv"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-semibold hover:gap-3 transition-all"
                                    >
                                        Join Server <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* GitHub Card */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-gray-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative flex items-start gap-4">
                                <div className="flex-shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <FaGithub className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        GitHub
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                        Explore our open-source contributions, report issues, and contribute to the codebase.
                                    </p>
                                    <a
                                        href="https://github.com/Nouman64-cat/Booktax"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-400 font-semibold hover:gap-3 transition-all"
                                    >
                                        View Repository <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AboutClient;
