globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as Fragment, g as addAttribute } from '../chunks/astro/server_M2etQWHN.mjs';
import { $ as $$Base } from '../chunks/Base_mOsn7FPa.mjs';
import { g as getTodayPrayerTimes, a as getMonthPrayerTimes } from '../chunks/prayer-times_CieQLz7Y.mjs';
export { renderers } from '../renderers.mjs';

const $$SalahTimes = createComponent(async ($$result, $$props, $$slots) => {
  const prayerData = await getTodayPrayerTimes();
  const monthData = await getMonthPrayerTimes();
  const nextPrayerName = prayerData?.nextPrayer?.name ?? null;
  const now = /* @__PURE__ */ new Date();
  const monthYear = now.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "Europe/London" });
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Salah Times", "prayerData": prayerData }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-[1440px] mx-auto px-5 md:px-10 py-8 md:py-12 lg:py-16"> <!-- Page Header --> <div class="text-center mb-8 lg:mb-12"> <h1 class="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-navy leading-tight mb-2">
Salah Times
</h1> <p class="text-[16px] md:text-[18px] text-muted max-w-2xl mx-auto">
Complete prayer schedule with daily and monthly timetables
</p> </div> ${prayerData && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`  <div class="bg-light-bg rounded-[24px] lg:rounded-[40px] p-4 md:p-5 lg:p-6 mb-6 lg:mb-8"> <!-- Date Header --> <div class="flex items-center justify-between text-muted text-[13px] md:text-[14px] mb-3 md:mb-4"> <span class="font-semibold">${prayerData.date}</span> ${prayerData.hijriDate && prayerData.hijriDate !== "0" && renderTemplate`<span class="font-medium">${prayerData.hijriDate}</span>`} </div> <div class="flex items-center gap-4 md:gap-6"> <!-- Prayer Times Grid --> <div class="grid grid-cols-5 gap-2 md:gap-3 flex-1"> ${prayerData.prayers.filter((p) => p.name !== "Sunrise").map((p) => {
    const isNext = p.name === nextPrayerName;
    return renderTemplate`<div${addAttribute(`rounded-lg md:rounded-xl py-2.5 md:py-3 px-1 md:px-2 text-center transition-all ${isNext ? "bg-teal/15 border-2 border-teal/30" : "bg-white border-2 border-navy/5 hover:border-navy/10"}`, "class")}> <div${addAttribute(`text-[10px] md:text-[11px] uppercase tracking-wide mb-2 font-semibold ${isNext ? "text-teal" : "text-navy/50"}`, "class")}> ${p.name === "Maghrib" ? "Magh" : p.name} </div> <div class="space-y-1"> <div> <div${addAttribute(`text-[13px] md:text-[15px] font-bold ${isNext ? "text-green" : "text-navy"}`, "class")}> ${p.jamaah} </div> <div${addAttribute(`text-[9px] md:text-[10px] font-medium ${isNext ? "text-teal/70" : "text-navy/40"}`, "class")}>
Jama'ah
</div> </div> <div> <div${addAttribute(`text-[13px] md:text-[15px] font-semibold ${isNext ? "text-green/80" : "text-navy/70"}`, "class")}> ${p.begins} </div> <div${addAttribute(`text-[9px] md:text-[10px] font-medium ${isNext ? "text-teal/60" : "text-navy/40"}`, "class")}>
Begins
</div> </div> </div> </div>`;
  })} </div>  ${prayerData.nextPrayer && renderTemplate`<div class="border-l-2 border-navy/10 pl-4 md:pl-6 pr-2 shrink-0"> <div class="text-muted text-[10px] md:text-[11px] uppercase tracking-wide font-semibold mb-1">Next Prayer</div> <div class="text-green text-[16px] md:text-[20px] lg:text-[22px] font-bold whitespace-nowrap"> ${prayerData.nextPrayer.name} </div> <div class="text-navy text-[13px] md:text-[15px] font-semibold"> ${prayerData.nextPrayer.jamaah} </div> </div>`} </div> </div>  ${monthData && monthData.length > 0 && renderTemplate`<div class="bg-white rounded-[24px] lg:rounded-[40px] border-2 border-navy/5 overflow-hidden shadow-sm"> <!-- Section Header --> <div class="bg-light-bg px-6 md:px-8 lg:px-10 py-6 lg:py-8 border-b-2 border-navy/5"> <h2 class="text-[28px] lg:text-[34px] font-bold text-navy leading-tight mb-1">
Monthly Timetable
</h2> <p class="text-[15px] lg:text-[16px] text-muted font-medium">${monthYear}</p> </div> <!-- Table Container (Scrollable on mobile) --> <div class="overflow-x-auto"> <table class="w-full min-w-[800px]"> <!-- Table Header --> <thead> <tr class="bg-navy text-white"> <th rowspan="2" class="text-left py-4 lg:py-5 px-4 lg:px-6 font-bold text-[14px] lg:text-[16px] border-r border-white/10">
Date
</th> <th colspan="2" class="text-center py-2 lg:py-3 px-2 font-bold text-[14px] lg:text-[16px] border-r border-white/10">
Fajr
</th> <th colspan="2" class="text-center py-2 lg:py-3 px-2 font-bold text-[14px] lg:text-[16px] border-r border-white/10">
Zuhr
</th> <th colspan="2" class="text-center py-2 lg:py-3 px-2 font-bold text-[14px] lg:text-[16px] border-r border-white/10">
'Asr
</th> <th colspan="2" class="text-center py-2 lg:py-3 px-2 font-bold text-[14px] lg:text-[16px] border-r border-white/10">
Maghrib
</th> <th colspan="2" class="text-center py-2 lg:py-3 px-2 font-bold text-[14px] lg:text-[16px]">
'Isha
</th> </tr> <tr class="bg-teal text-white"> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px] border-r border-white/20">Begins</th> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px] border-r border-white/10">Jama'ah</th> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px] border-r border-white/20">Begins</th> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px] border-r border-white/10">Jama'ah</th> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px] border-r border-white/20">Begins</th> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px] border-r border-white/10">Jama'ah</th> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px] border-r border-white/20">Begins</th> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px] border-r border-white/10">Jama'ah</th> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px] border-r border-white/20">Begins</th> <th class="text-center py-2 lg:py-2.5 px-2 font-medium text-[12px] lg:text-[13px]">Jama'ah</th> </tr> </thead> <!-- Table Body --> <tbody class="divide-y divide-navy/5"> ${monthData.map((day, index) => renderTemplate`<tr${addAttribute(`transition-colors ${day.isToday ? "bg-green/15 border-l-[6px] border-green" : index % 2 === 1 ? "bg-navy/[0.02]" : "hover:bg-navy/[0.03]"}`, "class")}> <!-- Date Column --> <td class="py-3 lg:py-3.5 px-4 lg:px-6 border-r border-navy/5"> <div${addAttribute(`font-bold text-[14px] lg:text-[15px] ${day.isToday ? "text-green" : "text-navy"}`, "class")}> ${day.date} </div> ${day.hijriDate && day.hijriDate !== "0" && renderTemplate`<div${addAttribute(`text-[11px] lg:text-[12px] mt-0.5 ${day.isToday ? "text-green/70" : "text-muted"}`, "class")}> ${day.hijriDate} </div>`} </td> <!-- Fajr --> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] border-r border-navy/5 ${day.isToday ? "text-green/70" : "text-muted"}`, "class")}>${day.fajr.begins}</td> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] font-bold border-r border-navy/5 ${day.isToday ? "text-green" : "text-navy"}`, "class")}>${day.fajr.jamaah}</td> <!-- Zuhr --> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] border-r border-navy/5 ${day.isToday ? "text-green/70" : "text-muted"}`, "class")}>${day.zuhr.begins}</td> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] font-bold border-r border-navy/5 ${day.isToday ? "text-green" : "text-navy"}`, "class")}>${day.zuhr.jamaah}</td> <!-- Asr --> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] border-r border-navy/5 ${day.isToday ? "text-green/70" : "text-muted"}`, "class")}>${day.asr.begins}</td> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] font-bold border-r border-navy/5 ${day.isToday ? "text-green" : "text-navy"}`, "class")}>${day.asr.jamaah}</td> <!-- Maghrib --> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] border-r border-navy/5 ${day.isToday ? "text-green/70" : "text-muted"}`, "class")}>${day.maghrib.begins}</td> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] font-bold border-r border-navy/5 ${day.isToday ? "text-green" : "text-navy"}`, "class")}>${day.maghrib.jamaah}</td> <!-- Isha --> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] border-r border-navy/5 ${day.isToday ? "text-green/70" : "text-muted"}`, "class")}>${day.isha.begins}</td> <td${addAttribute(`text-center py-3 lg:py-3.5 px-2 text-[13px] lg:text-[14px] font-bold ${day.isToday ? "text-green" : "text-navy"}`, "class")}>${day.isha.jamaah}</td> </tr>`)} </tbody> </table> </div> <!-- Footer Note --> <div class="bg-light-bg px-6 md:px-8 lg:px-10 py-5 border-t-2 border-navy/5"> <p class="text-[13px] lg:text-[14px] text-muted text-center"> <strong class="font-bold text-navy">Jama'ah times</strong> are when the congregation begins.
<span class="ml-1">Please arrive early to ensure you don't miss the prayer.</span> </p> </div> </div>`}` })}`} ${!prayerData && renderTemplate`<div class="text-center py-16"> <p class="text-muted text-[18px]">Prayer times are currently unavailable. Please check back later.</p> </div>`} </main> ` })}`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/salah-times.astro", void 0);

const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/salah-times.astro";
const $$url = "/salah-times";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SalahTimes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
