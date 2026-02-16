import { e as createComponent, p as renderHead, k as renderComponent, l as Fragment, r as renderTemplate, g as addAttribute, o as renderScript } from '../chunks/astro/server_DUCctX1J.mjs';
import 'piccolore';
/* empty css                                  */
import { g as getTodayPrayerTimes } from '../chunks/prayer-times_B5FbJ4dH.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Mobile = createComponent(async ($$result, $$props, $$slots) => {
  const prayerData = await getTodayPrayerTimes();
  let timeUntilNext = "";
  if (prayerData?.nextPrayer) {
    const now = /* @__PURE__ */ new Date();
    const ukNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
    const [hours, minutes] = prayerData.nextPrayer.jamaah.split(":").map(Number);
    const nextPrayerTime = new Date(ukNow);
    nextPrayerTime.setHours(hours, minutes, 0, 0);
    if (nextPrayerTime < ukNow) {
      nextPrayerTime.setDate(nextPrayerTime.getDate() + 1);
    }
    const diffMs = nextPrayerTime.getTime() - ukNow.getTime();
    const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
    const diffMinutes = Math.floor(diffMs % (1e3 * 60 * 60) / (1e3 * 60));
    timeUntilNext = `${diffHours} hour${diffHours !== 1 ? "s" : ""} ${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
  }
  const jummahTimes = "1st: 12:45 | 2nd: 1:30";
  return renderTemplate`<html lang="en" data-astro-cid-tzi6dhhv> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet"><title>Prayer Times - Masjid Al-Hikmah</title>${renderHead()}</head> <body data-astro-cid-tzi6dhhv> <!-- Header --> <header style="background: #0A1C30; padding: 40px 20px 30px; text-align: center;" data-astro-cid-tzi6dhhv> <img src="/images/logo-white.png" alt="Masjid Al-Hikmah" style="width: 150px; height: auto; margin: 0 auto;" data-astro-cid-tzi6dhhv> </header> <!-- Navigation Tabs --> <nav style="display: flex; background: #0A1C30; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" data-astro-cid-tzi6dhhv> <a href="/mobile" style="flex: 1; padding: 18px; text-align: center; color: white; font-weight: 700; font-size: 18px; text-decoration: none; background: rgba(255,255,255,0.15); border-bottom: 3px solid white;" data-astro-cid-tzi6dhhv>
Salah
</a> <a href="/mobile-donate" style="flex: 1; padding: 18px; text-align: center; color: rgba(255,255,255,0.85); font-weight: 700; font-size: 18px; text-decoration: none; border-bottom: 3px solid transparent;" data-astro-cid-tzi6dhhv>
Donate
</a> <a href="/news-mobile" style="flex: 1; padding: 18px; text-align: center; color: rgba(255,255,255,0.85); font-weight: 700; font-size: 18px; text-decoration: none; border-bottom: 3px solid transparent;" data-astro-cid-tzi6dhhv>
News
</a> </nav> <!-- Content --> <main style="padding: 20px;" data-astro-cid-tzi6dhhv> ${prayerData && renderTemplate`<div style="background: white; border-radius: 20px; padding: 30px 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); max-width: 600px; margin: 0 auto;" data-astro-cid-tzi6dhhv> <!-- Date --> <div style="text-align: center; color: #666; font-size: 18px; font-weight: 500; margin-bottom: 8px;" data-astro-cid-tzi6dhhv> ${prayerData.date} </div> <!-- Next Prayer Name --> ${prayerData.nextPrayer && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-tzi6dhhv": true }, { "default": async ($$result2) => renderTemplate` <div style="text-align: center; color: #ccc; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;" data-astro-cid-tzi6dhhv> ${prayerData.nextPrayer.name} JAMAAT
</div>  <div style="text-align: center; color: #0A1C30; font-size: 56px; font-weight: 700; line-height: 1; margin-bottom: 8px;" data-astro-cid-tzi6dhhv> ${prayerData.nextPrayer.jamaah} </div>  <div style="text-align: center; color: #3e7e59; font-size: 20px; font-weight: 700; margin-bottom: 30px;" data-astro-cid-tzi6dhhv> ${timeUntilNext} </div> ` })}`} <!-- Prayer Times Table --> <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 20px; overflow: hidden; border-radius: 12px;" data-astro-cid-tzi6dhhv> <thead data-astro-cid-tzi6dhhv> <tr style="background: #0A1C30; color: white;" data-astro-cid-tzi6dhhv> <th style="padding: 16px 12px; text-align: left; font-weight: 700; font-size: 16px;" data-astro-cid-tzi6dhhv>Prayer</th> <th style="padding: 16px 12px; text-align: center; font-weight: 700; font-size: 16px;" data-astro-cid-tzi6dhhv>Begins</th> <th style="padding: 16px 12px; text-align: center; font-weight: 700; font-size: 16px;" data-astro-cid-tzi6dhhv>Jamaat</th> </tr> </thead> <tbody data-astro-cid-tzi6dhhv> ${prayerData.prayers.map((prayer, index) => {
    const isNextPrayer = prayer.name === prayerData.nextPrayer?.name;
    const isSunrise = prayer.name === "Sunrise";
    const bgColor = index % 2 === 0 ? "#f9f9f9" : "white";
    return renderTemplate`<tr${addAttribute(`background: ${isNextPrayer ? "#e8f4f0" : bgColor};`, "style")} data-astro-cid-tzi6dhhv> <td style="padding: 16px 12px; color: #666; font-weight: 600; font-size: 16px;" data-astro-cid-tzi6dhhv> ${prayer.name} </td> ${isSunrise ? renderTemplate`<td colspan="2" style="padding: 16px 12px; text-align: center; color: #0A1C30; font-weight: 600; font-size: 16px;" data-astro-cid-tzi6dhhv> ${prayer.begins} </td>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-tzi6dhhv": true }, { "default": async ($$result2) => renderTemplate` <td${addAttribute(`padding: 16px 12px; text-align: center; color: ${isNextPrayer ? "#0A1C30" : "#888"}; font-weight: ${isNextPrayer ? "600" : "500"}; font-size: 16px;`, "style")} data-astro-cid-tzi6dhhv> ${prayer.begins} </td> <td${addAttribute(`padding: 16px 12px; text-align: center; color: ${isNextPrayer ? "#3e7e59" : "#0A1C30"}; font-weight: 700; font-size: 16px;`, "style")} data-astro-cid-tzi6dhhv> ${prayer.jamaah} </td> ` })}`} </tr>`;
  })} </tbody> </table> <!-- Jummah Times --> ${renderTemplate`<div style="margin-top: 24px; padding-top: 24px; border-top: 2px solid #f0f0f0; text-align: center; color: #666; font-size: 16px;" data-astro-cid-tzi6dhhv> <strong style="color: #0A1C30; font-weight: 700;" data-astro-cid-tzi6dhhv>Jummah:</strong> ${jummahTimes} </div>`} <!-- Refresh Button --> <button onclick="window.location.reload()" style="width: 100%; margin-top: 24px; padding: 16px; background: white; border: 2px solid #e0e0e0; border-radius: 50px; color: #666; font-weight: 700; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='#0A1C30'; this.style.color='#0A1C30'" onmouseout="this.style.borderColor='#e0e0e0'; this.style.color='#666'" data-astro-cid-tzi6dhhv> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-tzi6dhhv> <path d="M1 4v6h6M23 20v-6h-6" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-tzi6dhhv></path> <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-tzi6dhhv></path> </svg>
REFRESH
</button> </div>`} ${!prayerData && renderTemplate`<div style="text-align: center; padding: 40px 20px; color: #666;" data-astro-cid-tzi6dhhv> <p style="font-size: 18px;" data-astro-cid-tzi6dhhv>Prayer times are currently unavailable. Please check back later.</p> </div>`} </main> <!-- Auto-refresh every 60 seconds --> ${renderScript($$result, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/mobile.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/mobile.astro", void 0);

const $$file = "/Users/ameen/Development/masjidco-web/tenants/mah/src/pages/mobile.astro";
const $$url = "/mobile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mobile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
