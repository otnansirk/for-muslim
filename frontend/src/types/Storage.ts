import { WeatherType } from "./Weather"

export type StorageType = {
    name?: string
    lang?: string
    location?: LocationType
    weather?: WeatherType
    prayer?: PrayerType
    notes?: string
    greating?: GreatingType
}

// ======== 

export type LocationType = {
    lat?: string
    lng?: string
    address?: string
    city?: string
    country?: string
    region?: string
    timezone?: string
    timezone_offset?: number
}

export type PrayerTimeType = {
    id?: string
    icon?: string
    title?: string
    time?: string
    datetime?: string
    meridiem?: string
    ringing?: boolean
    hours_in_seconds?: number
}

export type TimesType = {
    imsak: string;
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}

export type PrayerType = {
    imsak?: PrayerTimeType
    fajr?: PrayerTimeType
    dhuhr?: PrayerTimeType
    asr?: PrayerTimeType
    maghrib?: PrayerTimeType
    isha?: PrayerTimeType
    hijri?: string
    method?: string,
    upcoming?: PrayerTimeType
    last_update?: number
}

export type GreatingType = {
    name?: string
}