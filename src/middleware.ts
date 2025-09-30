import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for auth cookie
    const authCookie = request.cookies.get('admin-auth')

    // If no auth cookie or invalid, redirect to login
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Don't redirect if already on login page
      if (request.nextUrl.pathname === '/admin/login') {
        return NextResponse.next()
      }

      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
