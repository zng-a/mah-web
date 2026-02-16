globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_M2etQWHN.mjs';
import { $ as $$Base } from '../../chunks/Base_mOsn7FPa.mjs';
import { $ as $$DonationForm } from '../../chunks/DonationForm_B3o3a1-0.mjs';
import { b as getCampaignBySlug } from '../../chunks/payload_CwWBB_Tz.mjs';
import { l as lexicalToHtml } from '../../chunks/lexical_Dk2_9CvM.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$ThousandTwelve = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ThousandTwelve;
  const campaign = await getCampaignBySlug("thousand-twelve");
  if (!campaign || !campaign.active) {
    return Astro2.redirect("/donate");
  }
  const PAYLOAD_URL = "http://localhost:3000";
  const TENANT_ID = "698365970695a7eb198f40f9";
  const stripeRes = await fetch(`${PAYLOAD_URL}/api/stripe/publishable-key?tenant=${TENANT_ID}`).then((r) => r.json()).catch(() => ({ publishableKey: "" }));
  const publishableKey = stripeRes?.publishableKey ?? "";
  const totalAmount = campaign.installmentsConfig?.totalAmount || 1e3;
  const installments = campaign.installmentsConfig?.numberOfInstallments || 12;
  const perMonth = Math.round(totalAmount / installments * 100) / 100;
  const descriptionHtml = campaign.description ? lexicalToHtml(campaign.description) : "";
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": campaign.name }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<div class="px-5 md:px-10 py-4"> <div class="flex items-center gap-3 text-[13px] md:text-[14px]"> <a href="/donate" class="inline-flex items-center gap-2 text-teal hover:text-navy transition-colors font-medium"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path> </svg> <span>Back</span> </a> <span class="text-muted">/</span> <a href="/donate" class="text-teal hover:text-navy transition-colors font-medium">Donate</a> <span class="text-muted">/</span> <span class="text-navy">${campaign.name}</span> </div> </div> <div class="max-w-[1200px] mx-auto px-5 md:px-10 py-12"> <div class="text-center mb-8"> <h1 class="text-navy text-[32px] md:text-[38px] font-bold mb-3"> ${campaign.name} </h1> ${descriptionHtml ? renderTemplate`<div class="text-[15px] md:text-[16px] text-muted max-w-[680px] mx-auto mb-6">${unescapeHTML(descriptionHtml)}</div>` : renderTemplate`<p class="text-[15px] md:text-[16px] text-muted max-w-[680px] mx-auto mb-6">
Make a significant impact with manageable monthly installments.
          Pay just £${perMonth} per month for ${installments} months.
</p>`} <div class="inline-flex items-center gap-6 md:gap-8 bg-gradient-to-r from-teal/10 to-navy/10 border-2 border-teal/30 rounded-2xl px-6 md:px-10 py-4 md:py-5"> <div class="text-center"> <div class="text-[36px] md:text-[42px] font-bold text-teal mb-0.5">£${perMonth}</div> <div class="text-[12px] md:text-[13px] text-muted uppercase tracking-wide">Per Month</div> </div> <div class="w-px h-12 md:h-14 bg-teal/30"></div> <div class="text-center"> <div class="text-[36px] md:text-[42px] font-bold text-navy mb-0.5">£${totalAmount}</div> <div class="text-[12px] md:text-[13px] text-muted uppercase tracking-wide">Total</div> </div> </div> </div> <div class="max-w-[900px] mx-auto">  <div class="flex flex-wrap items-center justify-center gap-2 mb-6"> ${[
    "Automatic monthly payments",
    "Auto-ends after final payment",
    "Gift Aid eligible",
    "Secure via Stripe"
  ].map((feature) => renderTemplate`<div class="inline-flex items-center gap-1.5 bg-teal/[0.08] border border-teal/20 rounded-full px-3 md:px-4 py-1.5 text-[12px] md:text-[13px] font-medium text-navy"> <svg class="w-3.5 h-3.5 text-teal shrink-0" fill="currentColor" viewBox="0 0 16 16"> <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path> </svg> <span>${feature}</span> </div>`)} </div> ${renderComponent($$result2, "DonationForm", $$DonationForm, { "block": {
    heading: "Start Your Monthly Giving",
    description: `${installments} monthly contributions of £${perMonth}`,
    funds: campaign.fund ? [campaign.fund] : [],
    amounts: [perMonth].map((v) => ({ value: v })),
    frequencies: [{ label: "Monthly", value: "monthly" }],
    style: "card",
    publishableKey,
    campaign,
    campaignType: "fixed-installments",
    totalInstallments: installments,
    hideAmountSelector: true,
    hideFrequencySelector: true,
    hideFundSelector: true
  } })} </div> </div> ` })}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/thousand-twelve.astro", void 0);
const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/thousand-twelve.astro";
const $$url = "/donate/thousand-twelve";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ThousandTwelve,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
