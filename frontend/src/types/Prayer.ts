export type NextPrayerType = {
    name: string
    time: string
    minutes: number
    minutes_current: number
}

export type PrayerQueryParamsType = {
    lat?: string
    lng?: string
    method?: string
    timezone?: string
    date?: string
}

export type PrayerAreaType = {
    lat?: string
    lng?: string
    city?: string
}