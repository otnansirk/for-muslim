import { PrayerTimeType, PrayerType, TimesType } from "../types/Storage";
import { PRAYER_NAMES } from "../constant/prayer";
import Datetime from "./Datetime";

/**
 * Get next prayer time
 * @param times 
 * @returns 
 */
export const next = (prayerTimes: PrayerType): PrayerTimeType => {
    const prayers: PrayerTimeType[] = PRAYER_NAMES.map(name => prayerTimes[name as keyof TimesType] as PrayerTimeType)
    const now = Datetime.get({ hour12: false });
    const currentTime = parseInt(now.hours) * 60 + parseInt(now.minutes);
    return prayers.find(i => (i.hours_in_seconds ?? 0) > currentTime) ?? prayers[0];
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