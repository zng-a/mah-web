import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro, k as renderComponent, o as renderScript } from '../chunks/astro/server_DUCctX1J.mjs';
import 'piccolore';
import { $ as $$Base } from '../chunks/Base_CVtgPXyw.mjs';
import { $ as $$DonationForm } from '../chunks/DonationForm_l-ecpdFs.mjs';
import 'clsx';
/* empty css                                 */
import { c as getDonateSettings, d as getDonationFunds, e as getCampaigns } from '../chunks/payload_CTOlXju1.mjs';
import { g as getTodayPrayerTimes } from '../chunks/prayer-times_B5FbJ4dH.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$CampaignCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CampaignCard;
  const { campaign, isGeneral = false } = Astro2.props;
  const progress = campaign?.goalAmount ? Math.min(100, campaign.currentAmount / campaign.goalAmount * 100) : 0;
  const href = isGeneral ? "#donation-form" : `/donate/${campaign?.slug}`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([
    "group border rounded-xl lg:rounded-2xl px-4 lg:px-6 py-5 lg:py-7 flex flex-col items-center text-center transition-all duration-200",
    isGeneral ? "border-teal bg-teal/5 hover:bg-teal/10 hover:border-teal/80 hover:shadow-lg hover:shadow-teal/10" : "border-navy/10 hover:border-teal hover:shadow-lg hover:shadow-teal/8"
  ], "class:list")} data-astro-cid-yoyoeyxv>  <span class="text-[15px] lg:text-[18px] font-bold text-navy mb-2" data-astro-cid-yoyoeyxv> ${isGeneral ? "General Donation" : campaign?.name} </span>  ${campaign?.goalAmount ? renderTemplate`<div class="w-full" data-astro-cid-yoyoeyxv> <div class="flex items-baseline justify-center gap-1.5 text-[12px] lg:text-[13px] mb-2.5" data-astro-cid-yoyoeyxv> <span class="font-bold text-teal" data-astro-cid-yoyoeyxv>£${campaign.currentAmount.toLocaleString()}</span> <span class="text-muted" data-astro-cid-yoyoeyxv>of £${campaign.goalAmount.toLocaleString()}</span> </div>  <div class="relative h-1 lg:h-1.5 bg-navy/[0.08] rounded-full overflow-hidden" data-astro-cid-yoyoeyxv> <div class="absolute inset-y-0 left-0 bg-gradient-to-r from-teal to-green transition-all duration-700 ease-out"${addAttribute(`width: ${progress}%`, "style")} data-astro-cid-yoyoeyxv> <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 animate-shimmer" data-astro-cid-yoyoeyxv></div> </div> </div> </div>` : isGeneral ? renderTemplate`<p class="text-[12px] lg:text-[13px] text-navy/60" data-astro-cid-yoyoeyxv>
Support all services
</p>` : null} </a> `;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/CampaignCard.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const PAYLOAD_URL = "http://localhost:3000";
  const TENANT_ID = "698365970695a7eb198f40f9";
  const [donateSettings, funds, campaigns, prayerData, stripeRes] = await Promise.all([
    getDonateSettings().catch(() => null),
    getDonationFunds().catch(() => []),
    getCampaigns({ active: true }).catch(() => []),
    getTodayPrayerTimes().catch(() => null),
    fetch(`${PAYLOAD_URL}/api/stripe/publishable-key?tenant=${TENANT_ID}`).then((r) => r.json()).catch(() => ({ publishableKey: "" }))
  ]);
  const publishableKey = stripeRes?.publishableKey ?? "";
  const heading = donateSettings?.heading ?? "Support Your Masjid";
  const description = donateSettings?.description ?? "";
  const amounts = donateSettings?.amounts ?? [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 50 },
    { value: 75 },
    { value: 100 }
  ];
  const frequencies = donateSettings?.frequencies ?? [
    { label: "One-off", value: "one-off" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" }
  ];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Donate", "prayerData": prayerData }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-[1440px] mx-auto py-8 sm:py-12">  <section class="max-w-[1200px] mx-auto px-5 md:px-10 mb-12"> <h2 class="text-navy text-[28px] font-bold mb-6">Donation Options</h2> <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">  ${renderComponent($$result2, "CampaignCard", $$CampaignCard, { "isGeneral": true })}  ${campaigns.map((campaign) => renderTemplate`${renderComponent($$result2, "CampaignCard", $$CampaignCard, { "campaign": campaign })}`)} </div> </section>  <div id="donation-form" class="max-w-[1200px] mx-auto px-5 md:px-10 scroll-mt-8"> ${renderComponent($$result2, "DonationForm", $$DonationForm, { "block": {
    heading,
    description,
    funds,
    amounts,
    frequencies,
    style: "card",
    publishableKey
  } })} </div> </div> ` })} ${renderScript($$result, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/index.astro", void 0);
const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/index.astro";
const $$url = "/donate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
