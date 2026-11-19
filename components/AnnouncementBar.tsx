'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { DEFAULT_ANNOUNCEMENT, type AnnouncementSettings } from '@/lib/announcement';

const DISMISSED_KEY = 'pearly-dismissed-announcement';

export default function AnnouncementBar() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<AnnouncementSettings>(DEFAULT_ANNOUNCEMENT);
  const [dismissed, setDismissed] = useState(false);
  const hiddenRoute = pathname.startsWith('/admin');
  const visible = !hiddenRoute && settings.enabled && Boolean(settings.text) && !dismissed;

  useEffect(() => {
    fetch('/api/announcement', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        setSettings(data);
        setDismissed(sessionStorage.getItem(DISMISSED_KEY) === data.text);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!visible || !barRef.current) {
      root.style.setProperty('--announcement-height', '0px');
      return;
    }

    const bar = barRef.current;
    const updateHeight = () => root.style.setProperty('--announcement-height', `${bar.offsetHeight}px`);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.setProperty('--announcement-height', '0px');
    };
  }, [visible, settings.text]);

  if (!visible) return null;

  return <>
    <div ref={barRef} className="fixed inset-x-0 top-0 z-[60] min-h-9 px-10 py-2 flex items-center justify-center text-center text-xs sm:text-sm tracking-wide" style={{ backgroundColor: settings.backgroundColor, color: settings.textColor }}>
      <span>{settings.text}</span>
      {settings.linkUrl && <a className="ml-2 font-bold underline underline-offset-4" href={settings.linkUrl}>{settings.linkLabel || 'Shop now'}</a>}
      {settings.dismissible && <button type="button" aria-label="Close announcement" className="absolute right-3 p-1 opacity-80 hover:opacity-100" onClick={() => { sessionStorage.setItem(DISMISSED_KEY, settings.text); setDismissed(true); }}><X size={15}/></button>}
    </div>
    <div aria-hidden style={{ height: 'var(--announcement-height, 0px)' }}/>
  </>;
}
