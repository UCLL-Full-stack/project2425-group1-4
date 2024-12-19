import { NextResponse } from 'next/server';

const validateToken = (token) => {
    if (!token) return null;

    try {
        const user = JSON.parse(atob(token.split('.')[1]));
        return user;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

export function middleware(req) {
    const { pathname } = req.nextUrl;

    const protectedRoutes = ['/admin', '/users'];
    if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    const token = req.cookies.get('token')?.value;

    const user = validateToken(token);

    if (!user) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    const requiredRoles = {
        '/admin': ['ADMIN'],
        '/users': ['ADMIN', 'EDITOR'],
    };

    const rolesForRoute = requiredRoles[pathname] || [];
    if (!rolesForRoute.includes(user.role)) {
        const homeUrl = new URL('/', req.url);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/users/:path*'],
};
