import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
    return (
        <div className={`spinner spinner--${size} ${className}`} role="status" aria-label="Loading">
            <svg viewBox="0 0 50 50">
                <circle
                    className="spinner__circle"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                />
            </svg>
        </div>
    );
}
