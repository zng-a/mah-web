const PRAYER_API_URL = "https://masjidco.vercel.app/api/mosque/e796fe6e-14e5-41ef-88af-f8250ddb4ed1/prayer-times";
function formatTime(raw) {
  const parts = raw.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  return `${hours}:${minutes}`;
}
function toMinutes(raw) {
  const parts = raw.split(":");
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}
function formatDate(dateStr) {
  const d = /* @__PURE__ */ new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
async function getTodayPrayerTimes() {
  try {
    const res = await fetch(PRAYER_API_URL);
    if (!res.ok) return null;
    const json = await res.json();
    const allDays = json?.data?.prayer_times ?? json?.prayer_times ?? [];
    const now = /* @__PURE__ */ new Date();
    const ukDate = now.toLocaleDateString("en-CA", { timeZone: "Europe/London" });
    const today = allDays.find((d) => d.d_date === ukDate);
    if (!today) return null;
    const prayers = [
      { name: "Fajr", begins: formatTime(today.fajr_begins), jamaah: formatTime(today.fajr_jamah) },
      { name: "Sunrise", begins: formatTime(today.sunrise), jamaah: "" },
      { name: "Zuhr", begins: formatTime(today.zuhr_begins), jamaah: formatTime(today.zuhr_jamah) },
      { name: "Asr", begins: formatTime(today.asr_mithl_1), jamaah: formatTime(today.asr_jamah) },
      { name: "Maghrib", begins: formatTime(today.maghrib_begins), jamaah: formatTime(today.maghrib_jamah) },
      { name: "Isha", begins: formatTime(today.isha_begins), jamaah: formatTime(today.isha_jamah) }
    ];
    const ukNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
    const currentMinutes = ukNow.getHours() * 60 + ukNow.getMinutes();
    const jamaahPrayers = [
      { name: "Fajr", raw: today.fajr_jamah },
      { name: "Zuhr", raw: today.zuhr_jamah },
      { name: "Asr", raw: today.asr_jamah },
      { name: "Maghrib", raw: today.maghrib_jamah },
      { name: "Isha", raw: today.isha_jamah }
    ];
    let nextPrayer = null;
    for (const p of jamaahPrayers) {
      if (toMinutes(p.raw) > currentMinutes) {
        nextPrayer = { name: p.name, jamaah: formatTime(p.raw) };
        break;
      }
    }
    return {
      prayers,
      nextPrayer,
      date: formatDate(today.d_date),
      hijriDate: today.hijri_date ?? "",
      isRamadan: today.is_ramadan === 1
    };
  } catch {
    return null;
  }
}
async function getMonthPrayerTimes() {
  try {
    const res = await fetch(PRAYER_API_URL);
    if (!res.ok) return null;
    const json = await res.json();
    const allDays = json?.data?.prayer_times ?? json?.prayer_times ?? [];
    const now = /* @__PURE__ */ new Date();
    const ukDate = now.toLocaleDateString("en-CA", { timeZone: "Europe/London" });
    const currentMonth = ukDate.substring(0, 7);
    const currentMonthDays = allDays.filter((day) => day.d_date.startsWith(currentMonth));
    return currentMonthDays.map((day) => {
      const d = /* @__PURE__ */ new Date(day.d_date + "T12:00:00");
      const formattedDate = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      return {
        date: formattedDate,
        gregorianDate: day.d_date,
        hijriDate: day.hijri_date ?? "",
        fajr: { begins: formatTime(day.fajr_begins), jamaah: formatTime(day.fajr_jamah) },
        zuhr: { begins: formatTime(day.zuhr_begins), jamaah: formatTime(day.zuhr_jamah) },
        asr: { begins: formatTime(day.asr_mithl_1), jamaah: formatTime(day.asr_jamah) },
        maghrib: { begins: formatTime(day.maghrib_begins), jamaah: formatTime(day.maghrib_jamah) },
        isha: { begins: formatTime(day.isha_begins), jamaah: formatTime(day.isha_jamah) },
        isToday: day.d_date === ukDate
      };
    });
  } catch {
    return null;
  }
}

export { getMonthPrayerTimes as a, getTodayPrayerTimes as g };
