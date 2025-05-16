export interface GreetingsStoreType {
    textShadow: number
    setTextShadow: (value: number) => void
    fontSize: number
    setFontSize: (value: number) => void
    removeAll: () => void
}