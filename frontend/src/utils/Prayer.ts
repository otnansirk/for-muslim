import { NextPrayerType, TimesType } from "../types/Prayer";
import { PrayerTimeType } from "../types/Storage";

export const nextPrayer = (times: TimesType): NextPrayerType => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = Object.entries(times)
        .filter(([key]) => ["imsak", "fajr", "dhuhr", "asr", "maghrib", "isha"].includes(key))
        .map(([name, time]) => {
            const [hours, minutes] = time.split(":").map(Number);
            return { name, time, minutes: hours * 60 + minutes };
        })
        .sort((a, b) => a.minutes - b.minutes)

    return prayers.find(i => i.minutes > currentTime) ?? prayers[0];
}

export const ASC = (a: [string, PrayerTimeType], b: [string, PrayerTimeType]) => {
    const timeA: number[] = (a[1] as PrayerTimeType)?.time?.split(":").map(Number) ?? [0, 0]
    const timeB: number[] = (b[1] as PrayerTimeType)?.time?.split(":").map(Number) ?? [0, 0]

    return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]); // Ascending
}