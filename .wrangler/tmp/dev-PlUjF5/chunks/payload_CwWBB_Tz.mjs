globalThis.process ??= {}; globalThis.process.env ??= {};
const PAYLOAD_URL = "http://localhost:3000";
const TENANT_ID = "698365970695a7eb198f40f9";
async function payloadFetch(path) {
  const url = `${PAYLOAD_URL}/api${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status} ${res.statusText} – ${url}`);
  }
  return res.json();
}
async function getGlobal(slug) {
  return payloadFetch(`/globals/${slug}`);
}
async function getCollection(slug, query = "") {
  const tenantFilter = `where[tenant][equals]=${TENANT_ID}` ;
  const parts = [query, tenantFilter].filter(Boolean).join("&");
  const qs = parts ? `?${parts}` : "";
  return payloadFetch(`/${slug}${qs}`);
}
async function getHeader() {
  return getGlobal("header");
}
async function getFooter() {
  return getGlobal("footer");
}
async function getSiteSettings() {
  return getGlobal("site-settings");
}
async function getDonateSettings() {
  return getGlobal("donate-settings");
}
async function getPageBySlug(slug) {
  const result = await getCollection("pages", `where[slug][equals]=${slug}&where[status][equals]=published&depth=2`);
  return result.docs[0] ?? null;
}
async function getHomePage() {
  return getPageBySlug("home");
}
async function getEvents(filter = "upcoming", limit = 10) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const whereFilter = filter === "upcoming" ? `where[status][equals]=upcoming&where[eventDate][greater_than_equal]=${today}` : "";
  const result = await getCollection("events", `${whereFilter}&sort=eventDate&limit=${limit}&depth=1`);
  return result.docs;
}
async function getServices(limit = 20) {
  const result = await getCollection("services", `sort=order&limit=${limit}&depth=1`);
  return result.docs;
}
async function getTeamMembers(limit = 20) {
  const result = await getCollection("team-members", `sort=order&limit=${limit}&depth=1`);
  return result.docs;
}
async function getLatestNews(limit = 3) {
  const result = await getCollection(
    "news",
    `where[status][equals]=published&sort=-publishedDate&limit=${limit}&depth=1`
  );
  return result.docs;
}
async function getBannerAnnouncements() {
  const result = await getCollection(
    "announcements",
    "where[status][equals]=published&sort=-publishedAt&limit=5"
  );
  return result.docs;
}
async function getDonationFunds() {
  const result = await getCollection(
    "donation-funds",
    "where[active][equals]=true&sort=order&depth=0"
  );
  return result.docs;
}
async function getCampaigns(filters = {}) {
  let query = "sort=order&depth=1";
  if (filters.active !== void 0) {
    query += `&where[active][equals]=${filters.active}`;
  }
  const result = await getCollection("campaigns", query);
  return result.docs;
}
async function getCampaignBySlug(slug) {
  const result = await getCollection(
    "campaigns",
    `where[slug][equals]=${slug}&limit=1&depth=1`
  );
  return result.docs[0] ?? null;
}
function mediaUrl(media, size) {
  if (!media) return "";
  if (typeof media === "string") return media;
  let url = "";
  if (size && media.sizes?.[size]?.url) {
    url = media.sizes[size].url;
  } else {
    url = media.url ?? "";
  }
  if (url && url.startsWith("/")) {
    url = `${PAYLOAD_URL}${url}`;
  }
  return url;
}

export { getSiteSettings as a, getCampaignBySlug as b, getDonateSettings as c, getDonationFunds as d, getCampaigns as e, getHomePage as f, getFooter as g, getLatestNews as h, getServices as i, getTeamMembers as j, getEvents as k, getPageBySlug as l, mediaUrl as m, getHeader as n, getBannerAnnouncements as o };
