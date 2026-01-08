import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';

    const token = request.cookies.get("token")?.value || "";

    // Redirect to home if logged in user tries to access public paths
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // Redirect to login if user tries to access protected paths without token
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Matching paths
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}