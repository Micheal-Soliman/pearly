import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminSessionToken } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const configuredPassword = process.env.ADMIN_DASHBOARD_PASSWORD;
  const { password } = await request.json() as { password?: string };

  if (!configuredPassword || password !== configuredPassword) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, adminSessionToken()!, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12,
    path: '/',
  });
  return response;
}
