import { NextResponse } from 'next/server';
import { DEFAULT_ANNOUNCEMENT, normalizeAnnouncement } from '@/lib/announcement';
import { isSupabaseConfigured, supabaseRequest } from '@/lib/supabase-admin';

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json(DEFAULT_ANNOUNCEMENT, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const response = await supabaseRequest('site_settings?id=eq.announcement&select=value&limit=1');
    if (!response.ok) throw new Error('Announcement settings are unavailable');
    const rows = await response.json();
    return NextResponse.json(normalizeAnnouncement(rows?.[0]?.value), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json(DEFAULT_ANNOUNCEMENT, { headers: { 'Cache-Control': 'no-store' } });
  }
}
