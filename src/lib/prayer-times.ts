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

    return {
      prayers,
      nextPrayer,
      date: formatDate(today.d_date),
      hijriDate: today.hijri_date ?? '',
      isRamadan: today.is_ramadan === 1,
    };
  } catch {
    return null;
  }
}
