import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE_NAME = 'bixious_session';

/** Routes that don't require authentication */
const PUBLIC_ROUTES = ['/login', '/change-password'];
const PUBLIC_API_ROUTES = ['/api/auth/'];

function getSecret() {
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error('AUTH_SECRET environment variable is required');
    return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow static files, _next, favicon
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Allow public routes
    const isPublicPage = PUBLIC_ROUTES.some((route) => pathname === route);
    const isPublicApi = PUBLIC_API_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    if (isPublicPage || isPublicApi) {
        return NextResponse.next();
    }

    // Check session cookie
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        // Not authenticated — redirect to login
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    try {
        const { payload } = await jwtVerify(token, getSecret());

        // If user must change password, redirect to change-password page
        if (payload.mustChangePassword && pathname !== '/change-password') {
            return NextResponse.redirect(
                new URL('/change-password', request.url)
            );
        }

        // Attach user info to request headers for downstream use
        const response = NextResponse.next();
        response.headers.set('x-user-email', String(payload.email));
        response.headers.set('x-user-name', String(payload.name));
        response.headers.set('x-user-role', String(payload.role));

        return response;
    } catch {
        // Invalid token — clear cookie and redirect to login
        const loginUrl = new URL('/login', request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete(SESSION_COOKIE_NAME);
        return response;
    }
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
