'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { ToastProvider } from '@/components/ui/Toast';

/** Routes where the sidebar should NOT be shown */
const AUTH_ROUTES = ['/login', '/change-password'];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = AUTH_ROUTES.includes(pathname);

    if (isAuthPage) {
        return (
            <ToastProvider>
                {children}
            </ToastProvider>
        );
    }

    return (
        <ToastProvider>
            <div className="app-layout">
                <Sidebar />
                <div className="app-layout__content">{children}</div>
            </div>
        </ToastProvider>
    );
}
