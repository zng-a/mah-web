// MasjidCo Prayer Times API client

const PRAYER_API_URL =
  import.meta.env.PRAYER_API_URL ||
  'https://masjidco.vercel.app/api/mosque/e796fe6e-14e5-41ef-88af-f8250ddb4ed1/prayer-times';

interface RawPrayerDay {
  d_date: string; // "YYYY-MM-DD"
  fajr_begins: string;
  fajr_jamah: string;
  sunrise: string;
  zuhr_begins: string;
  zuhr_jamah: string;
  asr_mithl_1: string;
  asr_jamah: string;
  maghrib_begins: string;
  maghrib_jamah: string;
  isha_begins: string;
  isha_jamah: string;
  is_ramadan: number;
  hijri_date: string;
}

export interface Prayer {
  name: string;
  begins: string; // formatted "H:MM"
  jamaah: string; // formatted "H:MM"
}

export interface PrayerTimesData {
  prayers: Prayer[];
  nextPrayer: { name: string; jamaah: string } | null;
  date: string;        // e.g. "15 January 2026"
  hijriDate: string;   // as returned by the API
  isRamadan: boolean;
  isTomorrow: boolean; // true when all today's prayers have passed
}

/** Convert "HH:MM:SS" or "HH:MM" to display format "H:MM" */
function formatTime(raw: string): string {
  const parts = raw.split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  return `${hours}:${minutes}`;
}

/** Convert "HH:MM:SS" to total minutes since midnight for comparison */
function toMinutes(raw: string): number {
  const parts = raw.split(':');
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00'); // noon to avoid timezone edge issues
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export interface MonthPrayerDay {
  date: string;           // formatted "D MMM" e.g. "1 Feb"
  gregorianDate: string;  // "YYYY-MM-DD"
  hijriDate: string;
  fajr: { begins: string; jamaah: string };
  zuhr: { begins: string; jamaah: string };
  asr: { begins: string; jamaah: string };
  maghrib: { begins: string; jamaah: string };
  isha: { begins: string; jamaah: string };
  isToday: boolean;
}

export async function getTodayPrayerTimes(): Promise<PrayerTimesData | null> {
  try {
    const res = await fetch(PRAYER_API_URL);
    if (!res.ok) return null;

    const json = await res.json();
    const allDays: RawPrayerDay[] = json?.data?.prayer_times ?? json?.prayer_times ?? [];

    // Find today's entry (UK timezone)
    const now = new Date();
    const ukDate = now.toLocaleDateString('en-CA', { timeZone: 'Europe/London' }); // "YYYY-MM-DD"

    const today = allDays.find((d) => d.d_date === ukDate);
    if (!today) return null;

    const prayers: Prayer[] = [
      { name: 'Fajr', begins: formatTime(today.fajr_begins), jamaah: formatTime(today.fajr_jamah) },
      { name: 'Sunrise', begins: formatTime(today.sunrise), jamaah: '' },
      { name: 'Zuhr', begins: formatTime(today.zuhr_begins), jamaah: formatTime(today.zuhr_jamah) },
      { name: 'Asr', begins: formatTime(today.asr_mithl_1), jamaah: formatTime(today.asr_jamah) },
      { name: 'Maghrib', begins: formatTime(today.maghrib_begins), jamaah: formatTime(today.maghrib_jamah) },
      { name: 'Isha', begins: formatTime(today.isha_begins), jamaah: formatTime(today.isha_jamah) },
    ];

    // Compute next prayer based on current UK time
    const ukNow = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }));
    const currentMinutes = ukNow.getHours() * 60 + ukNow.getMinutes();

    const jamaahPrayers = [
      { name: 'Fajr', raw: today.fajr_jamah },
      { name: 'Zuhr', raw: today.zuhr_jamah },
      { name: 'Asr', raw: today.asr_jamah },
      { name: 'Maghrib', raw: today.maghrib_jamah },
      { name: 'Isha', raw: today.isha_jamah },
    ];

    let nextPrayer: { name: string; jamaah: string } | null = null;
    for (const p of jamaahPrayers) {
      if (toMinutes(p.raw) > currentMinutes) {
        nextPrayer = { name: p.name, jamaah: formatTime(p.raw) };
        break;
      }
    }

    // All today's prayers have passed — show tomorrow's timetable
    if (!nextPrayer) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDate = tomorrow.toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
      const tomorrowData = allDays.find((d) => d.d_date === tomorrowDate);

      if (tomorrowData) {
        const tomorrowPrayers: Prayer[] = [
          { name: 'Fajr', begins: formatTime(tomorrowData.fajr_begins), jamaah: formatTime(tomorrowData.fajr_jamah) },
          { name: 'Sunrise', begins: formatTime(tomorrowData.sunrise), jamaah: '' },
          { name: 'Zuhr', begins: formatTime(tomorrowData.zuhr_begins), jamaah: formatTime(tomorrowData.zuhr_jamah) },
          { name: 'Asr', begins: formatTime(tomorrowData.asr_mithl_1), jamaah: formatTime(tomorrowData.asr_jamah) },
          { name: 'Maghrib', begins: formatTime(tomorrowData.maghrib_begins), jamaah: formatTime(tomorrowData.maghrib_jamah) },
          { name: 'Isha', begins: formatTime(tomorrowData.isha_begins), jamaah: formatTime(tomorrowData.isha_jamah) },
        ];
        return {
          prayers: tomorrowPrayers,
          nextPrayer: { name: 'Fajr', jamaah: formatTime(tomorrowData.fajr_jamah) },
          date: formatDate(tomorrowData.d_date),
          hijriDate: tomorrowData.hijri_date ?? '',
          isRamadan: tomorrowData.is_ramadan === 1,
          isTomorrow: true,
        };
      }
    }

    return {
      prayers,
      nextPrayer,
      date: formatDate(today.d_date),
      hijriDate: today.hijri_date ?? '',
      isRamadan: today.is_ramadan === 1,
      isTomorrow: false,
    };
  } catch {
    return null;
  }
}

export async function getMonthPrayerTimes(): Promise<MonthPrayerDay[] | null> {
  try {
    const res = await fetch(PRAYER_API_URL);
    if (!res.ok) return null;

    const json = await res.json();
    const allDays: RawPrayerDay[] = json?.data?.prayer_times ?? json?.prayer_times ?? [];

    // Get current month/year in UK timezone
    const now = new Date();
    const ukDate = now.toLocaleDateString('en-CA', { timeZone: 'Europe/London' }); // "YYYY-MM-DD"
    const currentMonth = ukDate.substring(0, 7); // "YYYY-MM"

    // Filter to current month only
    const currentMonthDays = allDays.filter((day) => day.d_date.startsWith(currentMonth));

    // Format each day for the monthly timetable
    return currentMonthDays.map((day) => {
      const d = new Date(day.d_date + 'T12:00:00');
      const formattedDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

      return {
        date: formattedDate,
        gregorianDate: day.d_date,
        hijriDate: day.hijri_date ?? '',
        fajr: { begins: formatTime(day.fajr_begins), jamaah: formatTime(day.fajr_jamah) },
        zuhr: { begins: formatTime(day.zuhr_begins), jamaah: formatTime(day.zuhr_jamah) },
        asr: { begins: formatTime(day.asr_mithl_1), jamaah: formatTime(day.asr_jamah) },
        maghrib: { begins: formatTime(day.maghrib_begins), jamaah: formatTime(day.maghrib_jamah) },
        isha: { begins: formatTime(day.isha_begins), jamaah: formatTime(day.isha_jamah) },
        isToday: day.d_date === ukDate,
      };
    });
  } catch {
    return null;
  }
}
