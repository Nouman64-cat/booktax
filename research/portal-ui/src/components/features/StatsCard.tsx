import React from 'react';

interface StatsCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    trend?: string;
    color?: string;
}

export default function StatsCard({ icon, label, value, trend, color = 'var(--color-primary)' }: StatsCardProps) {
    return (
        <div className="stats-card">
            <div className="stats-card__icon" style={{ color }}>
                {icon}
            </div>
            <div className="stats-card__content">
                <span className="stats-card__label">{label}</span>
                <span className="stats-card__value">{value}</span>
                {trend && <span className="stats-card__trend">{trend}</span>}
            </div>
        </div>
    );
}
