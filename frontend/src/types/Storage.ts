
export type StorageType = {
    name?: string
    lang?: string
    location?: LocationType
    weather?: WeatherType
    prayer?: PrayerType
}

// ======== 

export type LocationType = {
    lat?: string
    lng?: string
    address?: string
    city?: string
    country?: string
    region?: string
}

export type WeatherType = {
    text?: string
    temp_c?: number
    temp_f?: number
    feels_c?: number
    feels_f?: number
    last_update?: number
}

export type PrayerTimeType = {
    notify?: string
    time?: string
    ringing?: boolean
}

export type PrayerType = {
    imsak?: PrayerTimeType
    fajr?: PrayerTimeType
    dhuhr?: PrayerTimeType
    asr?: PrayerTimeType
    maghrib?: PrayerTimeType
    isha?: PrayerTimeType
    hijri?: string
    last_update?: number
}