"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiCpu, FiLayout } from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import { LOGO_URL, STUDIO_URL } from "../../config";

import { MdOutlineAutoAwesome } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

const baseNavItems = [
    { label: "Services", to: "/services" },
    { label: "About", to: "/about" },
    { label: "Blogs", to: "/blogs" },
];

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const pathname = usePathname();
    const { user, signOut } = useAuth();

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const navItems = useMemo(() => {
        return baseNavItems;
    }, []);

    const getLinkClasses = (path: string) => {
        const isActive = pathname === path;
        return `text-sm font-normal transition-colors ${isActive
            ? "text-gray-900"
            : "text-gray-600 hover:text-gray-900"
            }`;
    };

    const handleSignOut = () => {
        signOut();
    };

    return (
        <header className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img src={LOGO_URL} alt="Booktax Solution" className="w-6 h-6 object-contain" />
                        <span className="text-base font-semibold text-gray-900">
                            Booktax Solution
                        </span>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                        {navItems.map((item) => (
                            <Link key={item.to} href={item.to} className={getLinkClasses(item.to)}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <>
                                <a
                                    href={STUDIO_URL}
                                    className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all hover:ring-2 hover:ring-primary-500/50 shadow-sm hover:shadow-primary-500/20"
                                >
                                    Open Studio
                                </a>
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="text-sm font-normal text-gray-600 hover:text-red-600 transition-colors"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Contact Us Button */}
                                <Link
                                    href="/contact"
                                    className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-sm"
                                >
                                    Contact Us
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="p-2 text-gray-600 lg:hidden"
                        onClick={() => setMobileOpen((value) => !value)}
                        aria-label="Toggle navigation"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-gray-200 bg-white">
                    <div className="px-6 py-4 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                href={item.to}
                                className={`block py-2 text-sm ${pathname === item.to ? "text-gray-900" : "text-gray-600"}`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="pt-4 space-y-2">
                            {user ? (
                                <>
                                    <a href={STUDIO_URL} className="block w-full px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium text-center">
                                        Open Studio
                                    </a>
                                    <button onClick={handleSignOut} className="block w-full text-sm text-gray-600 text-center py-2">
                                        Sign out
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Mobile Contact Button */}
                                    <Link
                                        href="/contact"
                                        className="block w-full px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium text-center mt-2"
                                    >
                                        Contact Us
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
