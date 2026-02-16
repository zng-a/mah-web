globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, o as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_M2etQWHN.mjs';
import { $ as $$Base } from '../../chunks/Base_mOsn7FPa.mjs';
import { c as getDonateSettings } from '../../chunks/payload_CwWBB_Tz.mjs';
export { renderers } from '../../renderers.mjs';

const $$Complete = createComponent(async ($$result, $$props, $$slots) => {
  let donateSettings = null;
  try {
    donateSettings = await getDonateSettings();
  } catch {
  }
  const successMessage = donateSettings?.successMessage ?? "JazakAllahu Khairan! Your donation has been received. May Allah reward you abundantly.";
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Donation Complete" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-[1440px] mx-auto px-5 md:px-10"> <div class="min-h-[60vh] flex items-center justify-center"> <div class="text-center max-w-[520px]" id="complete-container"> <!-- Loading state (shown while confirming) --> <div id="state-loading"> <div class="w-[80px] h-[80px] rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-6"> <svg class="animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"> <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle> <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" class="text-teal"></path> </svg> </div> <h1 class="text-navy text-[28px] sm:text-[36px] font-bold mb-3">Confirming your donation...</h1> <p class="text-[16px] leading-[1.7] text-muted">Please wait while we verify your payment.</p> </div> <!-- Success state --> <div id="state-success" class="hidden"> <div class="w-[80px] h-[80px] rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6"> <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-teal"> <path d="M20 6L9 17l-5-5"></path> </svg> </div> <h1 class="text-navy text-[32px] sm:text-[40px] font-bold mb-4">Thank You!</h1> <p class="text-[16px] sm:text-[18px] leading-[1.7] text-muted mb-8" id="success-message"> ${successMessage} </p> <a href="/" class="inline-flex items-center justify-center gap-2 bg-teal text-white font-bold text-[16px] rounded-xl h-[52px] px-8 hover:bg-teal/80 transition-colors">
Return Home
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path> </svg> </a> </div> <!-- Processing state (Bacs Direct Debit) --> <div id="state-processing" class="hidden"> <div class="w-[80px] h-[80px] rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6"> <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"> <circle cx="12" cy="12" r="10"></circle> <path d="M12 6v6l4 2"></path> </svg> </div> <h1 class="text-navy text-[32px] sm:text-[40px] font-bold mb-4">Payment Submitted</h1> <p class="text-[16px] sm:text-[18px] leading-[1.7] text-muted mb-8">
Your Direct Debit payment has been submitted and is being processed. This typically takes 2-3 business days to clear. You'll receive a confirmation once complete.
</p> <a href="/" class="inline-flex items-center justify-center gap-2 bg-teal text-white font-bold text-[16px] rounded-xl h-[52px] px-8 hover:bg-teal/80 transition-colors">
Return Home
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path> </svg> </a> </div> <!-- Error state --> <div id="state-error" class="hidden"> <div class="w-[80px] h-[80px] rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6"> <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"> <circle cx="12" cy="12" r="10"></circle> <path d="M15 9l-6 6"></path> <path d="M9 9l6 6"></path> </svg> </div> <h1 class="text-navy text-[32px] sm:text-[40px] font-bold mb-4">Payment Failed</h1> <p class="text-[16px] sm:text-[18px] leading-[1.7] text-muted mb-8">
Your payment could not be processed. Please try again with a different payment method.
</p> <a href="/donate" class="inline-flex items-center justify-center gap-2 bg-teal text-white font-bold text-[16px] rounded-xl h-[52px] px-8 hover:bg-teal/80 transition-colors">
Try Again
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path> </svg> </a> </div> </div> </div> </div> ` })} ${renderScript($$result, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/complete.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/complete.astro", void 0);

const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/complete.astro";
const $$url = "/donate/complete";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Complete,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
