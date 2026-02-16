import { e as createComponent, p as renderHead, g as addAttribute, r as renderTemplate } from '../chunks/astro/server_DUCctX1J.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                  */
import { m as mediaUrl } from '../chunks/payload_CTOlXju1.mjs';
/* empty css                                       */
export { renderers } from '../renderers.mjs';

const $$NewsMobile = createComponent(async ($$result, $$props, $$slots) => {
  const PAYLOAD_URL = "http://localhost:3000";
  const TENANT_ID = "698365970695a7eb198f40f9";
  let newsItems = [];
  try {
    const res = await fetch(
      `${PAYLOAD_URL}/api/news?where[tenant][equals]=${TENANT_ID}&sort=-publishedDate&limit=20`,
      { headers: { "Content-Type": "application/json" } }
    );
    if (res.ok) {
      const json = await res.json();
      newsItems = json?.docs ?? [];
    }
  } catch (e) {
    console.error("Failed to fetch news:", e);
  }
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  }
  return renderTemplate`<html lang="en" data-astro-cid-23fmd5v5> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet"><title>News - Masjid Al-Hikmah</title>${renderHead()}</head> <body data-astro-cid-23fmd5v5> <!-- Header --> <header style="background: #0A1C30; padding: 40px 20px 30px; text-align: center;" data-astro-cid-23fmd5v5> <img src="/images/logo-white.png" alt="Masjid Al-Hikmah" style="width: 150px; height: auto; margin: 0 auto;" data-astro-cid-23fmd5v5> </header> <!-- Navigation Tabs --> <nav style="display: flex; background: #0A1C30; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" data-astro-cid-23fmd5v5> <a href="/mobile" style="flex: 1; padding: 18px; text-align: center; color: rgba(255,255,255,0.85); font-weight: 700; font-size: 18px; text-decoration: none; border-bottom: 3px solid transparent;" data-astro-cid-23fmd5v5>
Salah
</a> <a href="/mobile-donate" style="flex: 1; padding: 18px; text-align: center; color: rgba(255,255,255,0.85); font-weight: 700; font-size: 18px; text-decoration: none; border-bottom: 3px solid transparent;" data-astro-cid-23fmd5v5>
Donate
</a> <a href="/news-mobile" style="flex: 1; padding: 18px; text-align: center; color: white; font-weight: 700; font-size: 18px; text-decoration: none; background: rgba(255,255,255,0.15); border-bottom: 3px solid white;" data-astro-cid-23fmd5v5>
News
</a> </nav> <!-- Content --> <main style="padding: 20px; max-width: 600px; margin: 0 auto;" data-astro-cid-23fmd5v5> ${newsItems.length > 0 ? renderTemplate`<div style="display: flex; flex-direction: column; gap: 16px;" data-astro-cid-23fmd5v5> ${newsItems.map((item) => {
    const imgSrc = item.featuredImage ? mediaUrl(item.featuredImage, "card") : null;
    return renderTemplate`<a${addAttribute(`/news/${item.slug}`, "href")} style="display: block; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 12px rgba(0,0,0,0.08)'" data-astro-cid-23fmd5v5> ${imgSrc && renderTemplate`<img${addAttribute(imgSrc, "src")}${addAttribute(item.title, "alt")} style="width: 100%; height: 200px; object-fit: cover;" data-astro-cid-23fmd5v5>`} <div style="padding: 20px;" data-astro-cid-23fmd5v5> <div style="color: #44839e; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;" data-astro-cid-23fmd5v5> ${formatDate(item.publishedDate)} </div> <h3 style="color: #0f243e; font-size: 18px; font-weight: 700; line-height: 1.4; margin-bottom: 8px;" data-astro-cid-23fmd5v5> ${item.title} </h3> ${item.excerpt && renderTemplate`<p style="color: #666; font-size: 15px; line-height: 1.6;" data-astro-cid-23fmd5v5> ${item.excerpt} </p>`} </div> </a>`;
  })} </div>` : renderTemplate`<div style="background: white; border-radius: 16px; padding: 40px 20px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.08);" data-astro-cid-23fmd5v5> <p style="color: #666; font-size: 16px;" data-astro-cid-23fmd5v5>No news available at the moment.</p> </div>`} </main> </body></html>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/news-mobile.astro", void 0);
const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/news-mobile.astro";
const $$url = "/news-mobile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$NewsMobile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
