"use client";

import React, { useState } from "react";
import { MdEmail, MdPhone, MdPerson, MdCheckCircle, MdError } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { submitContactForm } from "../../services/contact.api";

const ContactClient: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const handleChange = (
        field: keyof typeof formData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.email.trim() || !formData.message.trim()) {
            setStatus({
                type: "error",
                message: "Please fill in email and message fields.",
            });
            return;
        }

        try {
            setSubmitting(true);
            setStatus(null);

            const response = await submitContactForm({
                name: formData.name.trim() || undefined,
                email: formData.email.trim(),
                phone: formData.phone.trim() || undefined,
                message: formData.message.trim(),
            });

            setStatus({
                type: "success",
                message: response.message,
            });

            // Clear form on success
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });

            // Clear success message after 5 seconds
            setTimeout(() => setStatus(null), 5000);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to submit contact form";
            setStatus({
                type: "error",
                message: errorMessage,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <section className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-[2fr,3fr]">
                    {/* Left Column - Info */}
                    <div>
                        <span className="inline-block rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                            Contact Us
                        </span>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                            Let’s start a conversation
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Whether you need help with bookkeeping, tax planning, or financial strategy, our team is here to help your startup grow.
                        </p>

                        <div className="mt-12 space-y-8">
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                                    <MdEmail className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Email us</h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Reach out directly for general inquiries.
                                    </p>
                                    <a href="mailto:hello@booktaxsolution.com" className="mt-1 block text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500">hello@booktaxsolution.com</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="rounded-3xl bg-gray-50 dark:bg-gray-900 p-8 lg:p-12 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Send us a message
                        </h2>

                        {status && (
                            <div
                                className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${status.type === "success"
                                    ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30"
                                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30"
                                    }`}
                            >
                                {status.type === "success" ? (
                                    <MdCheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                ) : (
                                    <MdError className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                                )}
                                <p
                                    className={`text-sm ${status.type === "success"
                                        ? "text-emerald-800 dark:text-emerald-300"
                                        : "text-red-800 dark:text-red-300"
                                        }`}
                                >
                                    {status.message}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Name <span className="text-gray-400 dark:text-gray-500">(optional)</span>
                                </label>
                                <div className="relative">
                                    <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        placeholder="Your name"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Email (Required) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email <span className="text-red-500 dark:text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        placeholder="your.email@example.com"
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Phone (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Phone Number <span className="text-gray-400 dark:text-gray-500">(optional)</span>
                                </label>
                                <div className="relative">
                                    <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Message (Required) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message <span className="text-red-500 dark:text-red-400">*</span>
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => handleChange("message", e.target.value)}
                                    placeholder="Tell us about your project or inquiry..."
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <BiLoaderAlt className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <MdEmail className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                By submitting this form, you agree to receive communications from us.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactClient;
