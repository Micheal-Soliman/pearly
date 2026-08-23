import { createHash, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE = 'pearly_admin_session';

function digest(value: string) {
  return createHash('sha256').update(value).digest();
}

export function adminSessionToken() {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  return password ? digest(`pearly-admin:${password}`).toString('hex') : null;
}

export function isAdminRequest(request: NextRequest) {
  const expected = adminSessionToken();
  if (!expected) return true;
  const actual = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!actual || actual.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}
