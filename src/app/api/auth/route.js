import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password, action } = await request.json();

    if (action === 'logout') {
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'admin_session',
        value: '',
        expires: new Date(0),
        path: '/',
      });
      return response;
    }

    if (username === 'admin' && password === 'admin123') {
      const response = NextResponse.json({ success: true });
      
      // Set session cookie (expires when browser closes)
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
      
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
