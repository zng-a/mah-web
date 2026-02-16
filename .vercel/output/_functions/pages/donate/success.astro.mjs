import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DUCctX1J.mjs';
import 'piccolore';
import { $ as $$Base } from '../../chunks/Base_CVtgPXyw.mjs';
import { c as getDonateSettings } from '../../chunks/payload_CTOlXju1.mjs';
export { renderers } from '../../renderers.mjs';

const $$Success = createComponent(async ($$result, $$props, $$slots) => {
  let donateSettings = null;
  try {
    donateSettings = await getDonateSettings();
  } catch {
  }
  const successMessage = donateSettings?.successMessage ?? "JazakAllahu Khairan! Your donation has been received. May Allah reward you abundantly.";
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Donation Successful" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-[1440px] mx-auto px-5 md:px-10"> <div class="min-h-[60vh] flex items-center justify-center"> <div class="text-center max-w-[520px]"> <!-- Checkmark icon --> <div class="w-[80px] h-[80px] rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6"> <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-teal"> <path d="M20 6L9 17l-5-5"></path> </svg> </div> <h1 class="text-navy text-[32px] sm:text-[40px] font-bold mb-4">Thank You!</h1> <p class="text-[16px] sm:text-[18px] leading-[1.7] text-muted mb-8"> ${successMessage} </p> <a href="/" class="inline-flex items-center justify-center gap-2 bg-teal text-white font-bold text-[16px] rounded-xl h-[52px] px-8 hover:bg-teal/80 transition-colors">
Return Home
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path> </svg> </a> </div> </div> </div> ` })}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/success.astro", void 0);

const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/donate/success.astro";
const $$url = "/donate/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
