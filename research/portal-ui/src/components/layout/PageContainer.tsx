import React from 'react';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
    return (
        <main className={`page-container ${className}`}>
            {children}
        </main>
    );
}
