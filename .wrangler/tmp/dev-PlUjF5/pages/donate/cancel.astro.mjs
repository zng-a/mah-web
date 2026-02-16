globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_M2etQWHN.mjs';
import { $ as $$Base } from '../../chunks/Base_mOsn7FPa.mjs';
export { renderers } from '../../renderers.mjs';

const $$Cancel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Donation Cancelled" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-[1440px] mx-auto px-5 md:px-10"> <div class="min-h-[60vh] flex items-center justify-center"> <div class="text-center max-w-[520px]"> <!-- Info icon --> <div class="w-[80px] h-[80px] rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-6"> <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-navy/50"> <circle cx="12" cy="12" r="10"></circle> <path d="M12 8v4"></path> <circle cx="12" cy="16" r="0.5" fill="currentColor"></circle> </svg> </div> <h1 class="text-navy text-[32px] sm:text-[40px] font-bold mb-4">Donation Cancelled</h1> <p class="text-[16px] sm:text-[18px] leading-[1.7] text-muted mb-8">
Your donation was not completed. No payment has been taken. You can try again whenever you're ready.
</p> <div class="flex flex-col sm:flex-row gap-3 items-center justify-center"> <a href="/" class="inline-flex items-center justify-center gap-2 bg-teal text-white font-bold text-[16px] rounded-xl h-[52px] px-8 hover:bg-teal/80 transition-colors">
Return Home
</a> <a href="/#donate-bar" class="inline-flex items-center justify-center gap-2 bg-navy text-white font-bold text-[16px] rounded-xl h-[52px] px-8 hover:bg-navy/80 transition-colors">
Try Again
</a> </div> </div> </div> </div> ` })}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/cancel.astro", void 0);

const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/cancel.astro";
const $$url = "/donate/cancel";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cancel,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
