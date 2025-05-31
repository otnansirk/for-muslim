import { PrayerTimeType, PrayerType, TimesType } from "../types/Storage";
import { PRAYER_NAMES } from "../constant/prayer";
import Datetime from "./Datetime";
import Alarms from "./Alarms";

/**
 * Get next prayer time
 * @param times 
 * @returns 
 */
export const next = (prayerTimes: PrayerType): PrayerTimeType => {
    const prayers: PrayerTimeType[] = PRAYER_NAMES.map(name => prayerTimes[name as keyof TimesType] as PrayerTimeType)
    const now = Datetime.get({ hour12: false, tz: prayerTimes?.tz });

    const currentTime = parseInt(now.hours) * 60 + parseInt(now.minutes);
    return prayers.find(i => (i?.hours_in_seconds ?? 0) > currentTime) ?? prayers[0];
}

/**
 * 
 * @param dateString 
 * @returns 
 */
export const getRemainingTime = (dateString: string, timeZone: string): { hours: string; minutes: string, seconds: string } => {
    const now = new Date();
    const d = Datetime.get({ timestring: dateString, tz: timeZone }).full
    const targetTime = new Date(d);

    // const targetTime = new Date(dateString);

    // Synchronize the year, months and date of the target with the present (only the time used)
    targetTime.setFullYear(now.getFullYear());
    targetTime.setMonth(now.getMonth());
    targetTime.setDate(now.getDate());

    // If the target time is past, slide the next day
    if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const diffMs = targetTime.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return {
        hours: String(hours),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };
}

/**
 * Check is expired by last update
 * @param lastUpdate 
 * @returns 
 */
export const isExpired = (lastUpdate: number) => {
    const fiveHours = 5 * 60 * 60 * 1000; // 5hr
    const expiredAt = lastUpdate + fiveHours
    return expiredAt < Date.now()
}

export const initOffscreen = async () => {
    const exists = await chrome.offscreen.hasDocument();
    if (exists) return;

    await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'Play adhan audio during prayer time',
    });

    await waitUntilOffscreenReady()
}

export const waitUntilOffscreenReady = async () => {
    for (let i = 0; i < 10; i++) {
        try {
            const res = await chrome.runtime.sendMessage({
                to: 'HANDSHAKE',
                data: 'ping'
            });

            if (res?.ready) return;
        } catch (_) {
            console.log(_, "waitUntilOffscreenReady");
        }
        await new Promise(r => setTimeout(r, 100)); // retry every 100ms
    }
    throw new Error("Offscreen document did not respond in time");
};

/**
 * Play adhan audio
 * @param type
 */
export const playAdhan = async (type: string) => {
    await initOffscreen()

    chrome.runtime.sendMessage({
        to: 'ADHAN',
        data: {
            control: 'play',
            type
        }
    })
}

/**
 * Stop adhan audio
 */
export const stopAdhan = async () => {
    await initOffscreen()
    chrome.runtime.sendMessage({
        to: 'ADHAN',
        data: {
            control: 'stop'
        }
    })
}

/**
 * Listen what happen in adhan audio
 */
export const listenAdhan = async (status: "playing" | "stoped", type: typeof PRAYER_NAMES[number]) => {
    chrome.runtime.sendMessage({
        to: 'ADHAN',
        data: {
            status,
            type
        }
    })
}

/**
 * Status adhan audio
 * @param callback
 * @param delay
 */
export const getStatusAdhan = async (callback?: (i: { status: "playing" | "stoped", type: string }) => void, delay?: number): Promise<{ status: "playing" | "stoped", type: string }> => {
    await initOffscreen()

    if (delay) {
        await new Promise(res => setTimeout(res, delay));
    }

    const data = await chrome.runtime.sendMessage({
        to: 'ADHAN',
        data: {
            control: 'status'
        }
    })
    if (callback) {
        callback(data)
    }

    return data
}

/**
 * Init alarms
 */
export const initAlarms = (prayers: PrayerType) => {
    PRAYER_NAMES.map(name => {
        const prayer = prayers[name as keyof TimesType] as PrayerTimeType
        Alarms.set(name, prayer.time)
    })
}