export type AnnouncementSettings = {
  enabled: boolean;
  text: string;
  linkUrl: string;
  linkLabel: string;
  backgroundColor: string;
  textColor: string;
  dismissible: boolean;
};

export const DEFAULT_ANNOUNCEMENT: AnnouncementSettings = {
  enabled: false,
  text: '',
  linkUrl: '',
  linkLabel: 'Shop now',
  backgroundColor: '#d6869d',
  textColor: '#ffffff',
  dismissible: true,
};

function safeColor(value: unknown, fallback: string) {
  return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

function safeLink(value: unknown) {
  if (typeof value !== 'string') return '';
  const link = value.trim();
  if (!link) return '';
  return link.startsWith('/') || /^https?:\/\//i.test(link) ? link.slice(0, 500) : '';
}

export function normalizeAnnouncement(value: unknown): AnnouncementSettings {
  const input = value && typeof value === 'object' ? value as Partial<AnnouncementSettings> : {};
  return {
    enabled: Boolean(input.enabled),
    text: typeof input.text === 'string' ? input.text.trim().slice(0, 300) : '',
    linkUrl: safeLink(input.linkUrl),
    linkLabel: typeof input.linkLabel === 'string' ? input.linkLabel.trim().slice(0, 60) : DEFAULT_ANNOUNCEMENT.linkLabel,
    backgroundColor: safeColor(input.backgroundColor, DEFAULT_ANNOUNCEMENT.backgroundColor),
    textColor: safeColor(input.textColor, DEFAULT_ANNOUNCEMENT.textColor),
    dismissible: input.dismissible !== false,
  };
}
