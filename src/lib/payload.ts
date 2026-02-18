// Payload CMS API client

// For Cloudflare Workers, we need to access runtime env vars
// Don't initialize from import.meta.env to avoid build-time values being baked in
let PAYLOAD_URL = '';
let TENANT_ID = '';

// Runtime config setter for Cloudflare Workers
export function setRuntimeConfig(config: { PAYLOAD_URL?: string; TENANT_ID?: string }) {
  if (config.PAYLOAD_URL) PAYLOAD_URL = config.PAYLOAD_URL;
  if (config.TENANT_ID) TENANT_ID = config.TENANT_ID;
}

// Get current config values with fallbacks for local dev
export function getRuntimeConfig() {
  return {
    PAYLOAD_URL: PAYLOAD_URL || import.meta.env.PAYLOAD_URL || 'http://localhost:3000',
    TENANT_ID: TENANT_ID || import.meta.env.TENANT_ID || ''
  };
}

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
  logo?: (string | null) | Media;
  navLinks?:
    | {
        label: string;
        linkType?: 'page' | 'custom';
        page?: (string | null) | { slug: string };
        url?: string | null;
        openInNewTab?: boolean | null;
        children?:
          | {
              label: string;
              linkType?: 'page' | 'custom';
              page?: (string | null) | { slug: string };
              url?: string | null;
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
  themeColor?: string | null;
  socialLinks?:
    | {
        platform?: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'whatsapp' | 'tiktok';
        url?: string | null;
        id?: string | null;
      }[]
    | null;
}

export interface DonationFund {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  active?: boolean | null;
  order?: number | null;
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
  funds?: (string | DonationFund)[] | null;
  defaultFund?: (string | DonationFund) | null;
  successMessage?: string | null;
}

export interface Campaign {
  id: string;
  name: string;
  slug: string;
  description?: unknown;
  type: 'fixed-unit' | 'ramadan-nightly' | 'fixed-installments';
  fixedUnitConfig?: {
    pricePerUnit: number;
    unitName: string;
    maxQuantity: number;
  };
  ramadanConfig?: {
    ramadanStartDate: string;
    ramadanEndDate: string;
  };
  installmentsConfig?: {
    totalAmount: number;
    numberOfInstallments: number;
    installmentFrequency: 'weekly' | 'monthly';
  };
  fund?: DonationFund | string;
  startDate?: string;
  endDate?: string;
  goalAmount?: number;
  currentAmount: number;
  active: boolean;
  featuredImage?: Media;
  order: number;
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
  content?: unknown;
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
  const config = getRuntimeConfig();
  const url = `${config.PAYLOAD_URL}/api${path}`;
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
  const config = getRuntimeConfig();
  const tenantFilter = config.TENANT_ID ? `where[tenant][equals]=${config.TENANT_ID}` : '';
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

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const result = await getCollection<Page>('pages', `where[slug][equals]=${slug}&where[status][equals]=published&depth=2`);
  return result.docs[0] ?? null;
}

export async function getHomePage(): Promise<Page | null> {
  return getPageBySlug('home');
}

export interface Event {
  id: string;
  title: string;
  description?: unknown;
  eventDate: string;
  startTime: string;
  endTime?: string | null;
  location?: string | null;
  featuredImage?: string | Media | null;
  status?: string | null;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon?: string | Media | null;
  shortDescription?: string | null;
  featuredImage?: string | Media | null;
  order?: number | null;
}

export interface TeamMember {
  id: string;
  name?: string | null;
  title?: string | null;
  role?: string | null;
  photo?: string | Media | null;
  bio?: string | null;
  order?: number | null;
}

export async function getEvents(filter: 'upcoming' | 'all' = 'upcoming', limit = 10): Promise<Event[]> {
  const today = new Date().toISOString().split('T')[0];
  const whereFilter = filter === 'upcoming'
    ? `where[status][equals]=upcoming&where[eventDate][greater_than_equal]=${today}`
    : '';
  const result = await getCollection<Event>('events', `${whereFilter}&sort=eventDate&limit=${limit}&depth=1`);
  return result.docs;
}

export async function getServices(limit = 20): Promise<Service[]> {
  const result = await getCollection<Service>('services', `sort=order&limit=${limit}&depth=1`);
  return result.docs;
}

export async function getTeamMembers(limit = 20): Promise<TeamMember[]> {
  const result = await getCollection<TeamMember>('team-members', `sort=order&limit=${limit}&depth=1`);
  return result.docs;
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  const result = await getCollection<News>(
    'news',
    `where[slug][equals]=${slug}&where[status][equals]=published&limit=1&depth=1`,
  );
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

export async function getDonationFunds(): Promise<DonationFund[]> {
  const result = await getCollection<DonationFund>(
    'donation-funds',
    'where[active][equals]=true&sort=order&depth=0',
  );
  return result.docs;
}

export async function getCampaigns(filters: { active?: boolean } = {}): Promise<Campaign[]> {
  let query = 'sort=order&depth=1';
  if (filters.active !== undefined) {
    query += `&where[active][equals]=${filters.active}`;
  }
  const result = await getCollection<Campaign>('campaigns', query);
  return result.docs;
}

export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
  const result = await getCollection<Campaign>(
    'campaigns',
    `where[slug][equals]=${slug}&limit=1&depth=1`,
  );
  return result.docs[0] ?? null;
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

  const config = getRuntimeConfig();

  // Fix localhost URLs from CMS (when CMS has wrong PAYLOAD_URL configured)
  if (url && url.includes('localhost:3000')) {
    url = url.replace('http://localhost:3000', config.PAYLOAD_URL);
  }
  // Payload returns relative paths for local storage — make them absolute
  else if (url && url.startsWith('/')) {
    url = `${config.PAYLOAD_URL}${url}`;
  }

  return url;
}
