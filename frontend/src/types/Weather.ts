export type WeatherType = {
    enable?: boolean
    unit?: string
    geolocation?: string

    text?: string
    temp_c?: number
    temp_f?: number
    feels_c?: number
    feels_f?: number
    last_update?: number
}