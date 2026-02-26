import { NextRequest, NextResponse } from 'next/server';
import {
    getCurrentUser,
    verifyPassword,
    hashPassword,
    createSession,
    setSessionCookie,
} from '@/lib/auth';
import { getUserByEmail, updatePassword } from '@/lib/users';

export async function POST(request: NextRequest) {
    try {
        const sessionUser = await getCurrentUser();
        if (!sessionUser) {
            return NextResponse.json(
                { success: false, error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { success: false, error: 'Current and new password are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { success: false, error: 'New password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Fetch user from DB and verify current password
        const user = await getUserByEmail(sessionUser.email);
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        const isValid = await verifyPassword(currentPassword, user.passwordHash);
        if (!isValid) {
            return NextResponse.json(
                { success: false, error: 'Current password is incorrect' },
                { status: 401 }
            );
        }

        // Hash new password and update in DB
        const newHash = await hashPassword(newPassword);
        await updatePassword(sessionUser.email, newHash);

        // Issue new session token with mustChangePassword = false
        const token = await createSession({
            email: sessionUser.email,
            name: sessionUser.name,
            role: sessionUser.role,
            mustChangePassword: false,
        });
        await setSessionCookie(token);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json(
            { success: false, error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
