import React from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    noPadding?: boolean;
    glow?: boolean;
}

export default function Card({
    title,
    subtitle,
    children,
    footer,
    className = '',
    noPadding = false,
    glow = false,
}: CardProps) {
    return (
        <div className={`card ${glow ? 'card--glow' : ''} ${className}`}>
            {(title || subtitle) && (
                <div className="card__header">
                    {title && <h3 className="card__title">{title}</h3>}
                    {subtitle && <p className="card__subtitle">{subtitle}</p>}
                </div>
            )}
            <div className={`card__body ${noPadding ? 'card__body--no-padding' : ''}`}>
                {children}
            </div>
            {footer && <div className="card__footer">{footer}</div>}
        </div>
    );
}
