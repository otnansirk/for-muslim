export type WeatherType = {
    enable?: boolean
    unit?: string
    geolocation?: string
    address?: string

    text?: string
    temp?: number
    feels?: number
    last_update?: number
}

export type FetchDataWeatherQueryParamType = {
    lat?: string
    lon?: string
    query?: string
    provider?: string
    geo?: string
    lang?: string
    data?: string
    unit?: "C" | "F"
}

export type FetchDataLocationQueryParamType = {
    search?: string
    lang?: string
}