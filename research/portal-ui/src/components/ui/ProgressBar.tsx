import React from 'react';

interface ProgressBarProps {
    value: number; // 0-100
    label?: string;
    className?: string;
}

export default function ProgressBar({ value, label, className = '' }: ProgressBarProps) {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
        <div className={`progress ${className}`}>
            {label && <span className="progress__label">{label}</span>}
            <div className="progress__track">
                <div
                    className="progress__fill"
                    style={{ width: `${clampedValue}%` }}
                    role="progressbar"
                    aria-valuenow={clampedValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
            <span className="progress__value">{clampedValue}%</span>
        </div>
    );
}
