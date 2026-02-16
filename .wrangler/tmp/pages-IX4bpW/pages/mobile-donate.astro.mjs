globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, p as renderHead, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_M2etQWHN.mjs';
/* empty css                                  */
import { $ as $$DonationForm } from '../chunks/DonationForm_B3o3a1-0.mjs';
import { c as getDonateSettings } from '../chunks/payload_CwWBB_Tz.mjs';
/* empty css                                         */
export { renderers } from '../renderers.mjs';

const $$MobileDonate = createComponent(async ($$result, $$props, $$slots) => {
  const donateSettings = await getDonateSettings();
  const PAYLOAD_URL = "http://localhost:3000";
  const TENANT_ID = "698365970695a7eb198f40f9";
  const stripeRes = await fetch(`${PAYLOAD_URL}/api/stripe/publishable-key?tenant=${TENANT_ID}`).then((r) => r.json()).catch(() => ({ publishableKey: "" }));
  const publishableKey = stripeRes?.publishableKey ?? "";
  return renderTemplate`<html lang="en" data-astro-cid-y5pdcu35> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet"><title>Donate - Masjid Al-Hikmah</title>${renderHead()}</head> <body data-astro-cid-y5pdcu35> <!-- Header --> <header style="background: #0A1C30; padding: 40px 20px 30px; text-align: center;" data-astro-cid-y5pdcu35> <img src="/images/logo-white.png" alt="Masjid Al-Hikmah" style="width: 150px; height: auto; margin: 0 auto;" data-astro-cid-y5pdcu35> </header> <!-- Navigation Tabs --> <nav style="display: flex; background: #0A1C30; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" data-astro-cid-y5pdcu35> <a href="/mobile" style="flex: 1; padding: 18px; text-align: center; color: rgba(255,255,255,0.85); font-weight: 700; font-size: 18px; text-decoration: none; border-bottom: 3px solid transparent;" data-astro-cid-y5pdcu35>
Salah
</a> <a href="/mobile-donate" style="flex: 1; padding: 18px; text-align: center; color: white; font-weight: 700; font-size: 18px; text-decoration: none; background: rgba(255,255,255,0.15); border-bottom: 3px solid white;" data-astro-cid-y5pdcu35>
Donate
</a> <a href="/news-mobile" style="flex: 1; padding: 18px; text-align: center; color: rgba(255,255,255,0.85); font-weight: 700; font-size: 18px; text-decoration: none; border-bottom: 3px solid transparent;" data-astro-cid-y5pdcu35>
News
</a> </nav> <!-- Content --> <main style="padding: 0; max-width: 600px; margin: 0 auto;" data-astro-cid-y5pdcu35> ${renderComponent($$result, "DonationForm", $$DonationForm, { "block": {
    heading: donateSettings?.heading || "Support Our Masjid",
    description: donateSettings?.description || "Your donations help us maintain the masjid and serve our community.",
    funds: donateSettings?.funds || [],
    amounts: donateSettings?.amounts || [{ value: 5 }, { value: 10 }, { value: 20 }, { value: 50 }],
    frequencies: donateSettings?.frequencies || [
      { label: "One-time", value: "one-time" },
      { label: "Monthly", value: "monthly" }
    ],
    style: "card",
    publishableKey
  }, "data-astro-cid-y5pdcu35": true })} </main> </body></html>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/mobile-donate.astro", void 0);
const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/mobile-donate.astro";
const $$url = "/mobile-donate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MobileDonate,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
