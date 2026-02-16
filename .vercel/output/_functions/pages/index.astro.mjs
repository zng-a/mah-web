import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro, k as renderComponent } from '../chunks/astro/server_DUCctX1J.mjs';
import 'piccolore';
import { $ as $$Base } from '../chunks/Base_CVtgPXyw.mjs';
import { g as getPreviewData, $ as $$HeroSlider, a as $$DonateBar, b as $$QuickLinks } from '../chunks/preview-store_CfqAjgRn.mjs';
import 'clsx';
import { m as mediaUrl, f as getHomePage, h as getLatestNews, c as getDonateSettings } from '../chunks/payload_CTOlXju1.mjs';
import { g as getTodayPrayerTimes } from '../chunks/prayer-times_B5FbJ4dH.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$NewsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$NewsSection;
  const { articles } = Astro2.props;
  const featured = articles[0] ?? null;
  const sideArticles = articles.slice(1);
  return renderTemplate`${maybeRenderHead()}<div class="bg-teal-tint rounded-[24px] lg:rounded-[40px] p-6 md:p-8 lg:p-10 flex-[1.5] min-w-0"> <div class="flex items-baseline justify-between mb-5 lg:mb-7"> <h2 class="text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-tight">Latest News & Announcements</h2> <a href="/news" class="text-teal text-[14px] lg:text-[16px] font-medium border border-teal rounded-full px-4 lg:px-5 py-1.5 lg:py-2 hover:bg-teal hover:text-white transition-colors whitespace-nowrap">See all news</a> </div> ${featured && renderTemplate`<a${addAttribute(`/news/${featured.slug}`, "href")} class="block relative rounded-xl lg:rounded-2xl overflow-hidden aspect-[672/280] mb-5 lg:mb-7 group"> <img${addAttribute(mediaUrl(featured.featuredImage, "card") || "/images/quran-revision.png", "src")}${addAttribute(typeof featured.featuredImage === "object" ? featured.featuredImage.alt : featured.title, "alt")} class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"> <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-5 md:p-8"> <h3 class="text-white text-[22px] md:text-[26px] lg:text-[30px] font-medium leading-tight">${featured.title}</h3> ${featured.excerpt && renderTemplate`<p class="text-white/90 text-[13px] lg:text-[15px] leading-relaxed mt-1.5 lg:mt-2 max-w-[560px]">${featured.excerpt}</p>`} </div> </a>`} ${sideArticles.length > 0 && renderTemplate`<div class="grid grid-cols-2 gap-4 lg:gap-6"> ${sideArticles.map((article) => renderTemplate`<a${addAttribute(`/news/${article.slug}`, "href")} class="group"> <div class="rounded-lg lg:rounded-xl overflow-hidden aspect-[322/126]"> <img${addAttribute(mediaUrl(article.featuredImage, "card") || "/images/hero.png", "src")}${addAttribute(typeof article.featuredImage === "object" ? article.featuredImage.alt : article.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"> </div> <h3 class="text-[16px] lg:text-[20px] font-medium leading-snug mt-2 lg:mt-3 group-hover:text-teal transition-colors">${article.title}</h3> </a>`)} </div>`} </div>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/NewsSection.astro", void 0);

const $$Astro$1 = createAstro();
const $$PrayerTimesPanel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PrayerTimesPanel;
  const { prayerData } = Astro2.props;
  const nextPrayerName = prayerData.nextPrayer?.name ?? null;
  return renderTemplate`${maybeRenderHead()}<div class="bg-teal-tint rounded-[24px] lg:rounded-[40px] pt-8 lg:pt-10 pb-6 lg:pb-8 px-6 lg:px-8 lg:w-[420px] lg:shrink-0 flex flex-col"> <h2 class="text-[28px] lg:text-[34px] font-bold text-center leading-tight">Prayer Times</h2> <p class="text-gray-text text-[20px] lg:text-[24px] font-bold text-center mt-1 lg:mt-1.5 mb-4 lg:mb-6">${prayerData.date}</p> <!-- Next prayer --> ${prayerData.nextPrayer && renderTemplate`<div class="bg-navy rounded-xl lg:rounded-2xl px-5 lg:px-7 py-4 lg:py-5 mb-4 lg:mb-5 flex items-center justify-between"> <div> <span class="text-white/50 text-[12px] lg:text-[13px] font-semibold uppercase tracking-[1px]">Next Prayer</span> <div class="text-white text-[24px] lg:text-[28px] font-bold leading-tight mt-0.5">${prayerData.nextPrayer.name}</div> </div> <div class="text-right"> <span class="text-white/50 text-[12px] lg:text-[13px] font-semibold uppercase tracking-[1px]">Jama'ah</span> <div class="text-green text-[24px] lg:text-[28px] font-bold leading-tight mt-0.5">${prayerData.nextPrayer.jamaah} PM</div> </div> </div>`} <!-- Table --> <div class="rounded-xl lg:rounded-2xl overflow-hidden flex-1 flex flex-col"> <div class="bg-navy text-white font-bold text-[16px] lg:text-[20px] flex py-3 lg:py-4 px-5 lg:px-7"> <span class="w-[38%]">Prayer</span> <span class="w-[31%] text-center">Begins</span> <span class="w-[31%] text-right">Jama'ah</span> </div> <div class="flex-1 flex flex-col justify-evenly bg-white"> ${prayerData.prayers.map((prayer, i) => {
    const isNext = prayer.name === nextPrayerName;
    return renderTemplate`<div${addAttribute(`flex items-center py-3 lg:py-4 px-5 lg:px-7 text-[16px] lg:text-[20px] ${isNext ? "bg-green/15 border-l-4 border-green" : i % 2 === 1 ? "bg-navy/[0.03]" : ""}`, "class")}> <span${addAttribute(`w-[38%] font-bold ${isNext ? "text-green" : ""}`, "class")}>${prayer.name}</span> <span${addAttribute(`w-[31%] text-center font-medium ${isNext ? "text-green" : ""}`, "class")}>${prayer.begins}</span> <span${addAttribute(`w-[31%] text-right font-medium ${isNext ? "text-green" : ""}`, "class")}>${prayer.jamaah}</span> </div>`;
  })} </div> </div> <a href="/salah-times" class="text-teal text-[14px] lg:text-[16px] font-medium border border-teal rounded-full px-4 lg:px-5 py-1.5 lg:py-2 hover:bg-teal hover:text-white transition-colors inline-block mx-auto mt-5 lg:mt-6">View Full Timetable</a> </div>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/PrayerTimesPanel.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const isPreview = Astro2.url.searchParams.has("preview");
  const [homePage, newsArticles, donateSettings, prayerData] = await Promise.all([
    isPreview ? getPreviewData("home") ?? getHomePage().catch(() => null) : getHomePage().catch(() => null),
    getLatestNews(3).catch(() => []),
    getDonateSettings().catch(() => null),
    getTodayPrayerTimes().catch(() => null)
  ]);
  const layout = homePage?.layout ?? [];
  const heroBlock = layout.find((b) => b.blockType === "hero-slider");
  const iconCardBlock = layout.find((b) => b.blockType === "icon-card-grid");
  const heroSlides = heroBlock?.slides?.length ? heroBlock.slides : [
    { image: "/images/hero.png", title: "Daily Ramadan Talks", subtitle: "After Asr & Esha", ctaLabel: "View Schedule", ctaUrl: "#" },
    { image: "/images/hero.png", kicker: "EYFS & Primary Open Day", title: "Quwwat-ul-Islam Girls' School", subtitle: "Mon 5 Jan 2026 \xB7 9:30 \u2013 12:30", ctaLabel: "Register Now", ctaUrl: "#" }
  ];
  const autoAdvance = heroBlock?.autoAdvance ?? 6;
  const quickLinkCards = iconCardBlock?.cards?.length ? iconCardBlock.cards : [
    { label: "Donate Online", url: "#" },
    { label: "Prayer Times", url: "#" },
    { label: "News", url: "#" },
    { label: "Forms", url: "#" },
    { label: "Volunteering", url: "#" },
    { label: "Contact Us", url: "#" },
    { label: "Facilities", url: "#" },
    { label: "Our Schools", url: "#" }
  ];
  const quickLinkColumns = iconCardBlock?.columns ?? "4";
  const donate = donateSettings ?? {
    amounts: [{ value: 5 }, { value: 10 }, { value: 20 }, { value: 50 }, { value: 100 }],
    defaultAmount: 10,
    frequencies: [
      { label: "One Time", value: "once" },
      { label: "Monthly", value: "monthly" }
    ],
    defaultFrequency: "once",
    heading: "Donate",
    ctaText: "Donate Now"
  };
  const fallbackPrayerData = {
    prayers: [
      { name: "Fajr", begins: "6:07", jamaah: "7:00" },
      { name: "Sunrise", begins: "7:46", jamaah: "" },
      { name: "Zuhr", begins: "12:19", jamaah: "1:00" },
      { name: "Asr", begins: "2:52", jamaah: "3:15" },
      { name: "Maghrib", begins: "4:43", jamaah: "4:48" },
      { name: "Isha", begins: "6:21", jamaah: "7:30" }
    ],
    nextPrayer: { name: "Isha", jamaah: "7:30" },
    date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    hijriDate: "",
    isRamadan: false
  };
  const prayers = prayerData ?? fallbackPrayerData;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Home", "prayerData": prayers }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "HeroSlider", $$HeroSlider, { "slides": heroSlides, "autoAdvance": autoAdvance })}  ${maybeRenderHead()}<div class="max-w-[1440px] mx-auto"> <!-- ===== DONATE BAR ===== --> ${renderComponent($$result2, "DonateBar", $$DonateBar, { "donate": donate })} <!-- ===== NEWS + PRAYER TIMES ===== --> <section class="px-5 md:px-10 mt-8 lg:mt-10 flex flex-col lg:flex-row gap-6"> ${renderComponent($$result2, "NewsSection", $$NewsSection, { "articles": newsArticles })} ${renderComponent($$result2, "PrayerTimesPanel", $$PrayerTimesPanel, { "prayerData": prayers })} </section> <!-- ===== QUICK LINKS ===== --> ${renderComponent($$result2, "QuickLinks", $$QuickLinks, { "cards": quickLinkCards, "columns": quickLinkColumns })} </div> ` })}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/index.astro", void 0);

const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
