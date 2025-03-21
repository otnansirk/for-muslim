import { PrayerTimeType, PrayerType, TimesType } from "../types/Storage";
import { PRAYER_NAMES } from "../constant/prayer";
import { NextPrayerType } from "../types/Prayer";
import { time } from "./Datetime";

/**
 * Get next prayer time
 * @param times 
 * @returns 
 */
export const next = (times: TimesType): NextPrayerType => {
    const now = time();
    const currentTime = parseInt(now.hours) * 60 + parseInt(now.minutes);

    const prayers = Object.entries(times)
        .filter(([key]) => ["imsak", "fajr", "dhuhr", "asr", "maghrib", "isha"].includes(key))
        .map(([name, time]) => {
            const [hours, minutes] = time.split(":").map(Number);
            return { name, time, minutes: hours * 60 + minutes, minutes_current: currentTime };
        })
        .sort((a, b) => a.minutes - b.minutes)

    return prayers.find(i => i.minutes > currentTime) ?? prayers[0];
}

/**
 * Format data prayer from storage with 2 format
 * @param fromSyncStorage 
 * @returns 2 format
 * 1. times = TimesType
 * 2. prayers = Record<string, PrayerTimeType>
 */
export const prayer = (fromSyncStorage: PrayerType) => {

    const byASC = (a: [string, PrayerTimeType], b: [string, PrayerTimeType]) => {
        const timeA: number[] = (a[1] as PrayerTimeType)?.time?.split(":").map(Number) ?? [0, 0]
        const timeB: number[] = (b[1] as PrayerTimeType)?.time?.split(":").map(Number) ?? [0, 0]

        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]); // Ascending
    }

    const prayers = Object.entries(fromSyncStorage ?? {})
        .filter((entry): entry is [string, PrayerTimeType] => PRAYER_NAMES.includes(entry[0]))
        .sort(byASC)
        .reduce((acc, [key, value]) => {
            acc[key] = { ...(value as PrayerTimeType), };
            return acc;
        }, {} as Record<string, PrayerTimeType>);

    const times = Object.fromEntries(
        Object.keys(prayers).map((key) => [key, prayers[key]?.time ?? ""])
    ) as TimesType;

    return {
        times,
        prayers
    }
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