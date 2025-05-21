import { create } from "zustand";
import { GreetingsStoreType, BackgroundStoreType, TimeStoreType } from "../types/Store";
import Storage from "./Storage";


let timeoutRef: number | null = null
const saveToStorage = (callback: () => void) => {
    if (timeoutRef) {
        clearTimeout(timeoutRef);
    }

    timeoutRef = setTimeout(callback, 500);
}

export const useGreetingsStore = create<GreetingsStoreType>((set) => ({
    textShadow: 20,
    setTextShadow: (textShadow: number) => {
        saveToStorage(() => Storage.sync.set("greeting", { text_shadow: textShadow }))
        return set(() => ({ textShadow }))
    },

    fontSize: 45,
    setFontSize: (fontSize: number) => {
        saveToStorage(() => Storage.sync.set("greeting", { font_size: fontSize }))
        return set(() => ({ fontSize }))
    },

    removeAll: () => set({}),
}))

export const useBackgroundStore = create<BackgroundStoreType>((set) => ({
    blurIntensity: 0,
    setBlurIntensity: (blurIntensity: number) => {
        saveToStorage(() => Storage.sync.set("background", { blur_intensity: blurIntensity }))
        return set(() => ({ blurIntensity }))
    },

    brightness: 0,
    setBrightness: (brightness: number) => {
        saveToStorage(() => Storage.sync.set("background", { brightness }))
        return set(() => ({ brightness }))
    },

    removeAll: () => set({}),
}))

export const useTimeStore = create<TimeStoreType>((set) => ({

    fontSize: 65,
    setFontSize: (fontSize: number) => {
        saveToStorage(() => Storage.sync.set("time", { font_size: fontSize }))
        return set(() => ({ fontSize }))
    },

    removeAll: () => set({}),
}))