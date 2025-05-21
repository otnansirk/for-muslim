export interface GreetingsStoreType {
    textShadow: number
    setTextShadow: (value: number) => void
    fontSize: number
    setFontSize: (value: number) => void
    removeAll: () => void
}

export interface BackgroundStoreType {
    blurIntensity: number
    setBlurIntensity: (value: number) => void
    brightness: number
    setBrightness: (value: number) => void
    removeAll: () => void
}

export interface TimeStoreType {
    fontSize: number
    setFontSize: (value: number) => void
    removeAll: () => void
}