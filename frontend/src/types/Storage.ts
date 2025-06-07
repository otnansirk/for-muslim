import { ConfigDateTypes } from "./datetime"
import { WeatherType } from "./Weather"

export type StorageType = {
    name?: string
    lang?: string
    location?: LocationType
    weather?: WeatherType
    prayer?: PrayerType
    notes?: NotesType
    greeting?: GreetingType
    date?: DateType
    time?: TimeType
    background?: BackgroundType
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
    chrome_notify?: boolean
    adhan_notify?: boolean
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
    enable?: boolean
    tz?: string
    geolocation?: string
    last_update?: number
}

export type NotesType = {
    enable?: boolean
    content?: string
}

export type GreetingType = {
    enable?: boolean
    name?: string
    greeting?: string
    text_shadow?: number
    font_size?: number
}

export type DateType = {
    enable?: boolean
    format?: {
        label?: string,
        value?: string,
        config?: ConfigDateTypes
    }
}

export type TimeType = {
    enable?: boolean
    hour12?: boolean
    show_ampm?: boolean
    show_seconds?: boolean
    tz?: string
    font_size?: number
}

export type BackgroundType = {
    source?: string | "local" | "unsplash"
    frequency?: string | "off" | "5_seconds" | "10_seconds" | "15_seconds" | "30_seconds" | "3600_seconds" | "86400_seconds" | "tab"
    collection_type?: string
    collection_value?: string
    brightness?: number
    blur_intensity?: number
}

export type UnsplashCollectionsType = {
    islamic?: UnsplashType[]
    wallpaper?: UnsplashType[]
    illustration?: UnsplashType[]
    custom?: UnsplashType[]
}

export type LocalBackgroundCollectionsType = {
    background: File
    thumbnail: Blob
}

export type UnsplashType = {
    id: string;
    slug: string;
    url: string;
    download: string;
    exif: Exif;
    location: Location;
    user: User;
}

export type LocalBackgroundType = {
    url: string;
}

export type LocalImagesType = {
    ids: string[]
    selected: string
    time: number
}

type Exif = {
    make: string;
    model: string;
    name: string;
    exposureTime: string;
    aperture: string;
    focalLength: string;
    iso: number;
}

type Location = {
    name: string;
    city: string;
    country: string;
}

type User = {
    username: string;
    name: string;
    url: string;
    location: string;
    image: string;
}
