import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const nextIntlMiddleware = createMiddleware(routing);

export default function middleware(request) {
    const { pathname } = request.nextUrl;

    // لو المستخدم دخل على root الموقع، حوله للعربي
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/ar', request.url));
    }

    return nextIntlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};