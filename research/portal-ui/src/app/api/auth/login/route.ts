import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/users';
import {
    verifyPassword,
    createSession,
    setSessionCookie,
} from '@/lib/auth';
import { updateLastLogin } from '@/lib/users';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Look up user in DynamoDB
        const user = await getUserByEmail(email.toLowerCase().trim());
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Create JWT session
        const token = await createSession({
            email: user.email,
            name: user.name,
            role: user.role,
            mustChangePassword: user.mustChangePassword,
        });

        // Set cookie
        await setSessionCookie(token);

        // Update last login
        await updateLastLogin(user.email);

        return NextResponse.json({
            success: true,
            data: {
                email: user.email,
                name: user.name,
                mustChangePassword: user.mustChangePassword,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
