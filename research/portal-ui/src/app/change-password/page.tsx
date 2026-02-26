'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const passwordRequirements = [
        { label: 'At least 8 characters', met: newPassword.length >= 8 },
        { label: 'Contains a number', met: /\d/.test(newPassword) },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(newPassword) },
        { label: 'Contains lowercase letter', met: /[a-z]/.test(newPassword) },
    ];

    const allRequirementsMet = passwordRequirements.every((r) => r.met);
    const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!allRequirementsMet) {
            setError('Please meet all password requirements');
            return;
        }

        if (!passwordsMatch) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const json = await res.json();

            if (!json.success) {
                setError(json.error || 'Failed to change password');
                return;
            }

            router.push('/');
        } catch {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card auth-card--wide">
                <div className="auth-card__header">
                    <div className="auth-card__logo">
                        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                            <defs>
                                <linearGradient id="cp-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                            <rect width="32" height="32" rx="8" fill="url(#cp-logo-grad)" />
                            <path d="M10 16l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className="auth-card__title">Set New Password</h1>
                    <p className="auth-card__subtitle">
                        You must change your temporary password before continuing
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="auth-form__error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="auth-form__field">
                        <label htmlFor="currentPassword" className="auth-form__label">
                            Current / Temporary Password
                        </label>
                        <input
                            id="currentPassword"
                            type="password"
                            className="auth-form__input"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter your temporary password"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="auth-form__field">
                        <label htmlFor="newPassword" className="auth-form__label">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            className="auth-form__input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="auth-form__field">
                        <label htmlFor="confirmPassword" className="auth-form__label">
                            Confirm New Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="auth-form__input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            autoComplete="new-password"
                        />
                        {confirmPassword && !passwordsMatch && (
                            <span className="auth-form__hint auth-form__hint--error">
                                Passwords do not match
                            </span>
                        )}
                    </div>

                    <div className="password-requirements">
                        <span className="password-requirements__title">Password Requirements</span>
                        {passwordRequirements.map((req, i) => (
                            <div
                                key={i}
                                className={`password-requirements__item ${req.met ? 'password-requirements__item--met' : ''
                                    }`}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    {req.met ? (
                                        <polyline points="20 6 9 17 4 12" />
                                    ) : (
                                        <circle cx="12" cy="12" r="2" />
                                    )}
                                </svg>
                                {req.label}
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="btn btn--primary btn--lg auth-form__submit"
                        disabled={loading || !allRequirementsMet || !passwordsMatch}
                    >
                        {loading ? 'Updating Password...' : 'Set New Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
