import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { DEFAULT_ANNOUNCEMENT, normalizeAnnouncement } from '@/lib/announcement';
import { isSupabaseConfigured, supabaseRequest } from '@/lib/supabase-admin';

function unauthorized(request: NextRequest) {
  return !isAdminRequest(request)
    ? NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    : null;
}

export async function GET(request: NextRequest) {
  const denied = unauthorized(request);
  if (denied) return denied;
  if (!isSupabaseConfigured) return NextResponse.json({ configured: false, settings: DEFAULT_ANNOUNCEMENT });

  const response = await supabaseRequest('site_settings?id=eq.announcement&select=value&limit=1');
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  const rows = await response.json();
  return NextResponse.json({ configured: true, settings: normalizeAnnouncement(rows?.[0]?.value) });
}

export async function PUT(request: NextRequest) {
  const denied = unauthorized(request);
  if (denied) return denied;
  if (!isSupabaseConfigured) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });

  const settings = normalizeAnnouncement(await request.json());
  if (settings.enabled && !settings.text) {
    return NextResponse.json({ error: 'Write announcement text before enabling the bar.' }, { status: 400 });
  }

  const response = await supabaseRequest('site_settings', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({ id: 'announcement', value: settings, updated_at: new Date().toISOString() }),
  });
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  return NextResponse.json(settings);
}
