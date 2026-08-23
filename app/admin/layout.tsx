import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, adminSessionToken } from '@/lib/admin-auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const expected = adminSessionToken();
  if (expected) {
    const cookieStore = await cookies();
    if (cookieStore.get(ADMIN_COOKIE)?.value !== expected) redirect('/admin-login');
  }
  return children;
}
