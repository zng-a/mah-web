globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, m as maybeRenderHead, g as addAttribute, r as renderTemplate, h as createAstro, u as unescapeHTML, k as renderComponent, l as Fragment } from '../chunks/astro/server_M2etQWHN.mjs';
import { $ as $$Base } from '../chunks/Base_mOsn7FPa.mjs';
import { b as $$QuickLinks, $ as $$HeroSlider, g as getPreviewData, a as $$DonateBar } from '../chunks/preview-store_CPZTG4Zs.mjs';
import { m as mediaUrl, h as getLatestNews, i as getServices, j as getTeamMembers, g as getFooter, k as getEvents, l as getPageBySlug, c as getDonateSettings } from '../chunks/payload_CwWBB_Tz.mjs';
import { l as lexicalToHtml } from '../chunks/lexical_Dk2_9CvM.mjs';
import { $ as $$DonationForm } from '../chunks/DonationForm_B3o3a1-0.mjs';
import { g as getTodayPrayerTimes } from '../chunks/prayer-times_CieQLz7Y.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$e = createAstro();
const $$HeroSimple = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$HeroSimple;
  const { block } = Astro2.props;
  const imgSrc = mediaUrl(block.image, "hero") || "/images/hero.jpeg";
  const opacity = block.overlayOpacity === "40" ? "bg-black/40" : block.overlayOpacity === "15" ? "bg-black/15" : "bg-black/25";
  return renderTemplate`${maybeRenderHead()}<section class="relative rounded-b-[24px] md:rounded-b-[40px] overflow-hidden h-[220px] sm:h-[260px] lg:h-[320px] -mt-[52px] pt-[52px]"> <img${addAttribute(imgSrc, "src")}${addAttribute(block.title, "alt")} class="absolute inset-0 w-full h-full object-cover"> <div${addAttribute(`absolute inset-0 ${opacity}`, "class")}></div> <div class="relative z-10 flex flex-col justify-end h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-10 lg:pb-14"> <h1 class="text-white text-[32px] sm:text-[42px] lg:text-[56px] font-bold leading-[1.1] max-w-[700px]">${block.title}</h1> ${block.subtitle && renderTemplate`<p class="text-white/90 text-[18px] sm:text-[22px] lg:text-[28px] font-medium mt-2">${block.subtitle}</p>`} </div> </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/HeroSimple.astro", void 0);

const $$Astro$d = createAstro();
const $$RichTextBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$RichTextBlock;
  const { block } = Astro2.props;
  const html = lexicalToHtml(block.content);
  const widthClass = block.width === "wide" ? "max-w-[960px]" : block.width === "full" ? "max-w-none" : "max-w-[720px]";
  return renderTemplate`${html && renderTemplate`${maybeRenderHead()}<section class="px-5 md:px-10 py-8 lg:py-12"><div${addAttribute(`${widthClass} mx-auto prose prose-lg prose-navy max-w-none`, "class")}>${unescapeHTML(html)}</div></section>`}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/RichTextBlock.astro", void 0);

const $$Astro$c = createAstro();
const $$SectionHeading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$SectionHeading;
  const { block } = Astro2.props;
  const align = block.alignment === "center" ? "text-center" : "text-left";
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`px-5 md:px-10 pt-10 lg:pt-14 pb-4 lg:pb-6 max-w-[1440px] mx-auto ${align}`, "class")}> <h2 class="text-[26px] lg:text-[34px] font-bold text-navy">${block.heading}</h2> ${block.subtitle && renderTemplate`<p class="text-muted text-[16px] lg:text-[18px] mt-2">${block.subtitle}</p>`} </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/SectionHeading.astro", void 0);

const $$Astro$b = createAstro();
const $$CardGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$CardGrid;
  const { block } = Astro2.props;
  const cols = block.columns ?? "3";
  const gridCols = cols === "2" ? "lg:grid-cols-2" : cols === "4" ? "lg:grid-cols-4" : "lg:grid-cols-3";
  const bgClass = block.background === "teal-tint" ? "bg-teal-tint" : "";
  const limit = block.limit ?? 6;
  let cards = [];
  if (block.source === "news") {
    const news = await getLatestNews(limit).catch(() => []);
    cards = news.map((n) => ({
      image: mediaUrl(n.featuredImage, "card"),
      title: n.title,
      description: n.excerpt ?? void 0,
      href: `/news/${n.slug}`
    }));
  } else if (block.source === "services") {
    const services = await getServices(limit).catch(() => []);
    cards = services.map((s) => ({
      image: mediaUrl(s.featuredImage, "card"),
      title: s.title,
      description: s.shortDescription ?? void 0,
      href: `/services/${s.slug}`
    }));
  } else {
    cards = (block.cards ?? []).map((c) => ({
      image: mediaUrl(c.image, "card"),
      title: c.title,
      description: c.description ?? void 0,
      href: c.linkUrl ?? void 0
    }));
  }
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`px-5 md:px-10 py-8 lg:py-12 ${bgClass}`, "class")}> <div class="max-w-[1440px] mx-auto"> <div${addAttribute(`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-5 lg:gap-6`, "class")}> ${cards.map((card) => renderTemplate`<a${addAttribute(card.href || "#", "href")} class="group bg-white rounded-xl lg:rounded-2xl overflow-hidden border border-navy/5 hover:shadow-lg transition-shadow"> ${card.image && renderTemplate`<div class="aspect-[16/10] overflow-hidden"> <img${addAttribute(card.image, "src")}${addAttribute(card.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"> </div>`} <div class="p-5 lg:p-6"> <h3 class="text-[17px] lg:text-[20px] font-bold text-navy group-hover:text-teal transition-colors">${card.title}</h3> ${card.description && renderTemplate`<p class="text-muted text-[14px] lg:text-[15px] mt-2 line-clamp-3">${card.description}</p>`} </div> </a>`)} </div> </div> </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/CardGrid.astro", void 0);

const $$Astro$a = createAstro();
const $$NewsFeature = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$NewsFeature;
  const { block } = Astro2.props;
  const limit = block.limit ?? 3;
  let articles = [];
  if (block.populateFrom === "manual" && block.featuredArticle) {
    articles = [block.featuredArticle, ...block.sideArticles ?? []];
  } else {
    articles = await getLatestNews(limit).catch(() => []);
  }
  const featured = articles[0] ?? null;
  const sideArticles = articles.slice(1);
  return renderTemplate`${maybeRenderHead()}<section class="px-5 md:px-10 py-8 lg:py-12"> <div class="max-w-[1440px] mx-auto bg-teal-tint rounded-[24px] lg:rounded-[40px] p-6 md:p-8 lg:p-10"> <div class="flex items-baseline justify-between mb-5 lg:mb-7"> <h2 class="text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-tight">Latest News & Announcements</h2> ${block.showViewAllLink !== false && renderTemplate`<a href="/news" class="text-teal text-[14px] lg:text-[16px] font-medium border border-teal rounded-full px-4 lg:px-5 py-1.5 lg:py-2 hover:bg-teal hover:text-white transition-colors whitespace-nowrap">See all news</a>`} </div> ${featured && renderTemplate`<a${addAttribute(`/news/${featured.slug}`, "href")} class="block relative rounded-xl lg:rounded-2xl overflow-hidden aspect-[672/280] mb-5 lg:mb-7 group"> <img${addAttribute(mediaUrl(featured.featuredImage, "card") || "/images/hero.jpeg", "src")}${addAttribute(typeof featured.featuredImage === "object" ? featured.featuredImage.alt : featured.title, "alt")} class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"> <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-5 md:p-8"> <h3 class="text-white text-[22px] md:text-[26px] lg:text-[30px] font-medium leading-tight">${featured.title}</h3> ${featured.excerpt && renderTemplate`<p class="text-white/90 text-[13px] lg:text-[15px] leading-relaxed mt-1.5 lg:mt-2 max-w-[560px]">${featured.excerpt}</p>`} </div> </a>`} ${sideArticles.length > 0 && renderTemplate`<div class="grid grid-cols-2 gap-4 lg:gap-6"> ${sideArticles.map((article) => renderTemplate`<a${addAttribute(`/news/${article.slug}`, "href")} class="group"> <div class="rounded-lg lg:rounded-xl overflow-hidden aspect-[322/126]"> <img${addAttribute(mediaUrl(article.featuredImage, "card") || "/images/hero.jpeg", "src")}${addAttribute(typeof article.featuredImage === "object" ? article.featuredImage.alt : article.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"> </div> <h3 class="text-[16px] lg:text-[20px] font-medium leading-snug mt-2 lg:mt-3 group-hover:text-teal transition-colors">${article.title}</h3> </a>`)} </div>`} </div> </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/NewsFeature.astro", void 0);

const $$Astro$9 = createAstro();
const $$TeamGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$TeamGrid;
  const { block } = Astro2.props;
  const cols = block.columns ?? "3";
  const gridCols = cols === "4" ? "lg:grid-cols-4" : "lg:grid-cols-3";
  let members = [];
  if (block.populateFrom === "manual" && block.members?.length) {
    members = block.members;
  } else {
    members = await getTeamMembers().catch(() => []);
  }
  return renderTemplate`${maybeRenderHead()}<section class="px-5 md:px-10 py-6 lg:py-8"> <div class="max-w-[1440px] mx-auto"> <div${addAttribute(`grid grid-cols-2 sm:grid-cols-3 ${gridCols} gap-5 lg:gap-6`, "class")}> ${members.map((member) => {
    const photo = mediaUrl(member.photo, "card");
    return renderTemplate`<div class="text-center"> <div class="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden mx-auto mb-3 bg-teal-tint"> ${photo ? renderTemplate`<img${addAttribute(photo, "src")}${addAttribute(member.name ?? "", "alt")} class="w-full h-full object-cover">` : renderTemplate`<div class="w-full h-full flex items-center justify-center text-teal text-[32px] font-bold"> ${(member.name ?? "?")[0]} </div>`} </div> <h3 class="text-[16px] lg:text-[18px] font-bold text-navy">${member.name}</h3> ${member.role && renderTemplate`<p class="text-muted text-[14px] lg:text-[15px] mt-0.5">${member.role}</p>`} </div>`;
  })} </div> </div> </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/TeamGrid.astro", void 0);

const $$Astro$8 = createAstro();
const $$ContactSplit = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ContactSplit;
  const { block } = Astro2.props;
  const info = block.infoSide ?? {};
  let footer = null;
  try {
    footer = await getFooter();
  } catch {
  }
  const addr = footer?.address;
  return renderTemplate`${maybeRenderHead()}<section class="px-5 md:px-10 py-8 lg:py-12"> <div class="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14"> <!-- Info side --> <div> <h2 class="text-[26px] lg:text-[32px] font-bold text-navy mb-4">${info.heading ?? "Get in Touch"}</h2> ${info.description && renderTemplate`<p class="text-muted text-[15px] lg:text-[17px] leading-relaxed mb-6">${info.description}</p>`} <div class="space-y-4 text-[15px] lg:text-[16px]"> ${info.showAddress && addr && renderTemplate`<div class="flex gap-3"> <svg class="w-5 h-5 text-teal shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg> <div class="text-navy"> ${addr.line1 && renderTemplate`<div>${addr.line1}</div>`} ${addr.line2 && renderTemplate`<div>${addr.line2}</div>`} ${addr.city && addr.postcode && renderTemplate`<div>${addr.city}, ${addr.postcode}</div>`} </div> </div>`} ${info.showPhone && addr?.phone && renderTemplate`<div class="flex gap-3"> <svg class="w-5 h-5 text-teal shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg> <a${addAttribute(`tel:${addr.phone}`, "href")} class="text-teal hover:text-navy transition-colors">${addr.phone}</a> </div>`} ${info.showEmail && addr?.email && renderTemplate`<div class="flex gap-3"> <svg class="w-5 h-5 text-teal shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg> <a${addAttribute(`mailto:${addr.email}`, "href")} class="text-teal hover:text-navy transition-colors">${addr.email}</a> </div>`} </div> ${info.openingHours && info.openingHours.length > 0 && renderTemplate`<div class="mt-6"> <h3 class="font-bold text-navy text-[16px] lg:text-[18px] mb-3">Opening Hours</h3> <div class="space-y-1.5"> ${info.openingHours.map((h) => renderTemplate`<div class="flex justify-between text-[14px] lg:text-[15px]"> <span class="text-navy font-medium">${h.label}</span> <span class="text-muted">${h.hours}</span> </div>`)} </div> </div>`} </div> <!-- Form side (placeholder — form builder integration TBD) --> <div class="bg-teal-tint rounded-xl lg:rounded-2xl p-6 lg:p-8"> <h3 class="text-[20px] lg:text-[24px] font-bold text-navy mb-4">Send us a Message</h3> <form class="space-y-4"> <input type="text" placeholder="Your Name" class="w-full px-4 py-3 rounded-xl border border-navy/10 text-[15px] focus:outline-none focus:border-teal"> <input type="email" placeholder="Email Address" class="w-full px-4 py-3 rounded-xl border border-navy/10 text-[15px] focus:outline-none focus:border-teal"> <input type="text" placeholder="Subject" class="w-full px-4 py-3 rounded-xl border border-navy/10 text-[15px] focus:outline-none focus:border-teal"> <textarea placeholder="Your Message" rows="5" class="w-full px-4 py-3 rounded-xl border border-navy/10 text-[15px] focus:outline-none focus:border-teal resize-none"></textarea> <button type="submit" class="bg-teal text-white font-bold text-[16px] px-8 py-3 rounded-xl hover:bg-teal/80 transition-colors">Send Message</button> </form> </div> </div> </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/ContactSplit.astro", void 0);

const $$Astro$7 = createAstro();
const $$MapEmbed = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$MapEmbed;
  const { block } = Astro2.props;
  const height = block.height ?? "450";
  const heightPx = `${height}px`;
  return renderTemplate`${block.googleMapsEmbedUrl && renderTemplate`${maybeRenderHead()}<section class="px-5 md:px-10 py-6 lg:py-8"><div class="max-w-[1440px] mx-auto rounded-xl lg:rounded-2xl overflow-hidden"><iframe${addAttribute(block.googleMapsEmbedUrl, "src")} width="100%"${addAttribute(heightPx, "height")} style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map"></iframe></div></section>`}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/MapEmbed.astro", void 0);

const $$Astro$6 = createAstro();
const $$FormBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$FormBlock;
  const { block } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="px-5 md:px-10 py-8 lg:py-12"> <div class="max-w-[720px] mx-auto"> ${block.heading && renderTemplate`<h2 class="text-[26px] lg:text-[32px] font-bold text-navy text-center mb-2">${block.heading}</h2>`} ${block.description && renderTemplate`<p class="text-muted text-[15px] lg:text-[17px] text-center mb-8">${block.description}</p>`} <div class="bg-teal-tint rounded-xl lg:rounded-2xl p-6 lg:p-8"> <p class="text-muted text-center text-[15px]">Form integration coming soon.</p> </div> </div> </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/FormBlock.astro", void 0);

const $$Astro$5 = createAstro();
const $$CTABanner = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$CTABanner;
  const { block } = Astro2.props;
  const href = block.ctaUrl || (block.ctaPage && typeof block.ctaPage === "object" && "slug" in block.ctaPage ? `/${block.ctaPage.slug}` : "#");
  const styleMap = {
    navy: { bg: "bg-navy", text: "text-white", btn: "bg-teal text-white hover:bg-teal/80" },
    teal: { bg: "bg-teal", text: "text-white", btn: "bg-white text-navy hover:bg-white/90" },
    "teal-tint": { bg: "bg-teal-tint", text: "text-navy", btn: "bg-teal text-white hover:bg-teal/80" }
  };
  const s = styleMap[block.style ?? "teal"] ?? styleMap.teal;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`${s.bg} py-12 lg:py-16`, "class")}> <div class="max-w-[1440px] mx-auto px-5 md:px-10 text-center"> <h2${addAttribute(`text-[28px] lg:text-[36px] font-bold ${s.text}`, "class")}>${block.heading}</h2> ${block.description && renderTemplate`<p${addAttribute(`${s.text} opacity-80 text-[16px] lg:text-[18px] mt-3 max-w-[600px] mx-auto`, "class")}>${block.description}</p>`} <a${addAttribute(href, "href")}${addAttribute(`inline-flex items-center font-bold text-[16px] lg:text-[18px] px-8 py-3.5 rounded-xl mt-6 transition-colors ${s.btn}`, "class")}> ${block.ctaLabel} <svg class="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg> </a> </div> </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/CTABanner.astro", void 0);

const $$Astro$4 = createAstro();
const $$EventList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$EventList;
  const { block } = Astro2.props;
  const events = await getEvents(block.filter ?? "upcoming", block.limit ?? 10).catch(() => []);
  function formatDate(dateStr) {
    const d = /* @__PURE__ */ new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }
  return renderTemplate`${maybeRenderHead()}<section class="px-5 md:px-10 py-8 lg:py-12"> <div class="max-w-[1440px] mx-auto"> ${events.length === 0 ? renderTemplate`<p class="text-muted text-center py-12">No upcoming events at this time.</p>` : renderTemplate`<div class="space-y-3"> ${events.map((event) => renderTemplate`<div class="bg-teal-tint rounded-xl lg:rounded-2xl px-6 lg:px-8 py-5 lg:py-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"> <div class="shrink-0 sm:w-[180px]"> <div class="text-teal font-bold text-[15px] lg:text-[17px]">${formatDate(event.eventDate)}</div> <div class="text-muted text-[14px] lg:text-[15px]">${event.startTime}${event.endTime ? ` \u2013 ${event.endTime}` : ""}</div> </div> <div class="flex-1 min-w-0"> <h3 class="text-[18px] lg:text-[22px] font-bold text-navy">${event.title}</h3> ${event.location && renderTemplate`<p class="text-muted text-[14px] lg:text-[15px] mt-0.5">${event.location}</p>`} </div> </div>`)} </div>`} </div> </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/EventList.astro", void 0);

const $$Astro$3 = createAstro();
const $$FaqAccordion = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FaqAccordion;
  const { block } = Astro2.props;
  const items = block.items ?? [];
  return renderTemplate`${maybeRenderHead()}<section class="px-5 md:px-10 py-8 lg:py-12"> <div class="max-w-[860px] mx-auto space-y-3"> ${items.map((item, i) => {
    const answerHtml = lexicalToHtml(item.answer);
    return renderTemplate`<details class="group bg-teal-tint rounded-xl lg:rounded-2xl overflow-hidden"> <summary class="flex items-center justify-between cursor-pointer px-6 lg:px-8 py-5 lg:py-6 text-[17px] lg:text-[20px] font-bold text-navy list-none"> ${item.question} <svg class="w-5 h-5 shrink-0 text-teal transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 9l6 6 6-6"></path></svg> </summary> <div class="px-6 lg:px-8 pb-5 lg:pb-6 text-[15px] lg:text-[16px] text-navy/80 leading-relaxed prose">${unescapeHTML(answerHtml)}</div> </details>`;
  })} </div> </section>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/FaqAccordion.astro", void 0);

const $$Astro$2 = createAstro();
const $$Spacer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Spacer;
  const { block } = Astro2.props;
  const sizeMap = { sm: "h-4", md: "h-8", lg: "h-12", xl: "h-16" };
  const cls = sizeMap[block.size ?? "md"] ?? "h-8";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cls, "class")}></div>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/blocks/Spacer.astro", void 0);

const $$Astro$1 = createAstro();
const $$BlockRenderer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlockRenderer;
  const { blocks } = Astro2.props;
  return renderTemplate`${blocks.map((block) => {
    switch (block.blockType) {
      case "hero-slider":
        return renderTemplate`${renderComponent($$result, "HeroSlider", $$HeroSlider, { "slides": block.slides ?? [], "autoAdvance": block.autoAdvance })}`;
      case "hero-simple":
        return renderTemplate`${renderComponent($$result, "HeroSimple", $$HeroSimple, { "block": block })}`;
      case "rich-text":
        return renderTemplate`${renderComponent($$result, "RichTextBlock", $$RichTextBlock, { "block": block })}`;
      case "section-heading":
        return renderTemplate`${renderComponent($$result, "SectionHeading", $$SectionHeading, { "block": block })}`;
      case "card-grid":
        return renderTemplate`${renderComponent($$result, "CardGrid", $$CardGrid, { "block": block })}`;
      case "icon-card-grid":
        return renderTemplate`${renderComponent($$result, "QuickLinks", $$QuickLinks, { "cards": block.cards ?? [], "columns": block.columns })}`;
      case "news-feature":
        return renderTemplate`${renderComponent($$result, "NewsFeature", $$NewsFeature, { "block": block })}`;
      case "team-grid":
        return renderTemplate`${renderComponent($$result, "TeamGrid", $$TeamGrid, { "block": block })}`;
      case "contact-split":
        return renderTemplate`${renderComponent($$result, "ContactSplit", $$ContactSplit, { "block": block })}`;
      case "map-embed":
        return renderTemplate`${renderComponent($$result, "MapEmbed", $$MapEmbed, { "block": block })}`;
      case "form-block":
        return renderTemplate`${renderComponent($$result, "FormBlock", $$FormBlock, { "block": block })}`;
      case "cta-banner":
        return renderTemplate`${renderComponent($$result, "CTABanner", $$CTABanner, { "block": block })}`;
      case "event-list":
        return renderTemplate`${renderComponent($$result, "EventList", $$EventList, { "block": block })}`;
      case "faq-accordion":
        return renderTemplate`${renderComponent($$result, "FaqAccordion", $$FaqAccordion, { "block": block })}`;
      case "spacer":
        return renderTemplate`${renderComponent($$result, "Spacer", $$Spacer, { "block": block })}`;
      case "donation-form":
        return renderTemplate`${renderComponent($$result, "DonationForm", $$DonationForm, { "block": block })}`;
      default:
        return null;
    }
  })}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/components/BlockRenderer.astro", void 0);

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  const pageSlug = slug || "home";
  if (pageSlug === "home") {
    return Astro2.redirect("/");
  }
  const isPreview = Astro2.url.searchParams.has("preview");
  const page = (isPreview ? getPreviewData(pageSlug) : null) ?? await getPageBySlug(pageSlug).catch(() => null);
  if (!page) {
    return new Response(null, { status: 404, statusText: "Not Found" });
  }
  const [donateSettings, prayerData] = await Promise.all([
    page.showDonateBar ? getDonateSettings().catch(() => null) : null,
    getTodayPrayerTimes().catch(() => null)
  ]);
  const layout = page.layout ?? [];
  const showDonate = page.showDonateBar && donateSettings;
  const donatePosition = page.donateBarPosition ?? "below-hero";
  const heroIdx = layout.findIndex((b) => b.blockType === "hero-slider" || b.blockType === "hero-simple");
  const afterHeroIdx = heroIdx >= 0 ? heroIdx + 1 : 0;
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
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": page.title, "prayerData": prayerData }, { "default": async ($$result2) => renderTemplate`${showDonate && donatePosition === "below-hero" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`  ${renderComponent($$result3, "BlockRenderer", $$BlockRenderer, { "blocks": layout.slice(0, afterHeroIdx) })}  ${maybeRenderHead()}<div class="max-w-[1440px] mx-auto"> ${renderComponent($$result3, "DonateBar", $$DonateBar, { "donate": donate })} </div>  ${renderComponent($$result3, "BlockRenderer", $$BlockRenderer, { "blocks": layout.slice(afterHeroIdx) })} ` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "BlockRenderer", $$BlockRenderer, { "blocks": layout })} ${showDonate && donatePosition === "above-footer" && renderTemplate`<div class="max-w-[1440px] mx-auto"> ${renderComponent($$result3, "DonateBar", $$DonateBar, { "donate": donate })} </div>`}` })}`}` })}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/[...slug].astro", void 0);

const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/[...slug].astro";
const $$url = "/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
