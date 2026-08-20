import { NextResponse } from 'next/server';

export function proxy(req) {
  const url = req.nextUrl;

  // Protect all /dashboard routes
  if (url.pathname.startsWith('/dashboard')) {
    const session = req.cookies.get('admin_session')?.value;
    
    // Check if the cookie exists and has the correct value
    if (session === 'authenticated') {
      return NextResponse.next();
    }
    
    // Redirect to custom login page if not authenticated
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
