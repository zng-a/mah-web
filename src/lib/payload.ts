// Payload CMS API client

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL || 'http://localhost:3000';
const TENANT_ID = import.meta.env.TENANT_ID || '';

// ----- Shared types (mirrors payload-types.ts shapes) -----

export interface Media {
  id: string;
  alt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: { url?: string | null; width?: number | null; height?: number | null };
    card?: { url?: string | null; width?: number | null; height?: number | null };
    hero?: { url?: string | null; width?: number | null; height?: number | null };
  };
}

export interface Header {
  announcementBar?: {
    enabled?: boolean | null;
    message?: string | null;
    linkText?: string | null;
    linkUrl?: string | null;
  };
  logo?: (string | null) | Media;
  navLinks?:
    | {
        label: string;
        url?: string | null;
        page?: (string | null) | { slug: string };
        openInNewTab?: boolean | null;
        children?:
          | {
              label: string;
              url?: string | null;
              page?: (string | null) | { slug: string };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
}

export interface Footer {
  logo?: (string | null) | Media;
  columns?:
    | {
        heading: string;
        links?:
          | {
              label: string;
              url?: string | null;
              page?: (string | null) | { slug: string };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  address?: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    postcode?: string | null;
    phone?: string | null;
    email?: string | null;
  };
  charityNumber?: string | null;
  copyright?: string | null;
}

export interface SiteSettings {
  siteTitle?: string | null;
  tagline?: string | null;
  defaultMetaDescription?: string | null;
  defaultOgImage?: (string | null) | Media;
  socialLinks?:
    | {
        platform?: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'whatsapp';
        url?: string | null;
        id?: string | null;
      }[]
    | null;
}

export interface DonateSettings {
  amounts?: { value: number; id?: string | null }[] | null;
  defaultAmount?: number | null;
  frequencies?: { label: string; value: string; id?: string | null }[] | null;
  defaultFrequency?: string | null;
  heading?: string | null;
  description?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
}

export interface HeroSlide {
  image: string | Media;
  kicker?: string | null;
  title: string;
  subtitle?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  id?: string | null;
}

export interface HeroSliderBlock {
  slides?: HeroSlide[] | null;
  autoAdvance?: number | null;
  blockType: 'hero-slider';
}

export interface IconCard {
  icon?: (string | null) | Media;
  label: string;
  url?: string | null;
  page?: (string | null) | { slug: string };
  id?: string | null;
}

export interface IconCardGridBlock {
  cards?: IconCard[] | null;
  columns?: '3' | '4' | null;
  blockType: 'icon-card-grid';
}

export type LayoutBlock = HeroSliderBlock | IconCardGridBlock | { blockType: string; [k: string]: unknown };

export interface Page {
  id: string;
  title: string;
  slug: string;
  template: string;
  showDonateBar?: boolean | null;
  donateBarPosition?: string | null;
  status?: string | null;
  layout?: LayoutBlock[] | null;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  featuredImage: string | Media;
  excerpt?: string | null;
  publishedDate: string;
  featured?: boolean | null;
  status?: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  status?: string | null;
  publishedAt?: string | null;
}

// ----- API helpers -----

async function payloadFetch<T>(path: string): Promise<T> {
  const url = `${PAYLOAD_URL}/api${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status} ${res.statusText} – ${url}`);
  }
  return res.json() as Promise<T>;
}

export async function getGlobal<T>(slug: string): Promise<T> {
  return payloadFetch<T>(`/globals/${slug}`);
}

export async function getCollection<T>(slug: string, query = ''): Promise<{ docs: T[]; totalDocs: number }> {
  // Automatically scope every collection query to the configured tenant
  const tenantFilter = TENANT_ID ? `where[tenant][equals]=${TENANT_ID}` : '';
  const parts = [query, tenantFilter].filter(Boolean).join('&');
  const qs = parts ? `?${parts}` : '';
  return payloadFetch<{ docs: T[]; totalDocs: number }>(`/${slug}${qs}`);
}

export async function getHeader(): Promise<Header> {
  return getGlobal<Header>('header');
}

export async function getFooter(): Promise<Footer> {
  return getGlobal<Footer>('footer');
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return getGlobal<SiteSettings>('site-settings');
}

export async function getDonateSettings(): Promise<DonateSettings> {
  return getGlobal<DonateSettings>('donate-settings');
}

export async function getHomePage(): Promise<Page | null> {
  const result = await getCollection<Page>('pages', 'where[slug][equals]=home&depth=2');
  return result.docs[0] ?? null;
}

export async function getLatestNews(limit = 3): Promise<News[]> {
  const result = await getCollection<News>(
    'news',
    `where[status][equals]=published&sort=-publishedDate&limit=${limit}&depth=1`,
  );
  return result.docs;
}

export async function getBannerAnnouncements(): Promise<Announcement[]> {
  const result = await getCollection<Announcement>(
    'announcements',
    'where[status][equals]=published&sort=-publishedAt&limit=5',
  );
  return result.docs;
}

/** Resolve a media field to its full URL. Prepends PAYLOAD_URL for relative paths. */
export function mediaUrl(media: string | Media | null | undefined, size?: 'thumbnail' | 'card' | 'hero'): string {
  if (!media) return '';
  if (typeof media === 'string') return media; // raw ID – can't resolve without another fetch

  let url = '';
  if (size && media.sizes?.[size]?.url) {
    url = media.sizes[size].url!;
  } else {
    url = media.url ?? '';
  }

  // Payload returns relative paths for local storage — make them absolute
  if (url && url.startsWith('/')) {
    url = `${PAYLOAD_URL}${url}`;
  }

  return url;
}
