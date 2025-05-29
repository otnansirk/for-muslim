import { create } from "zustand";
import { GreetingsStoreType, BackgroundStoreType, TimeStoreType } from "../types/Store";
import Storage from "./Storage";
import { getDefaultSetting } from "./Settings";
import { BACKGROUND_BLUR_INTENSITY, BACKGROUND_BRIGHTNESS, GREETING_FONT_SIZE, GREETING_TEXT_SHADOW, TIME_FONT_SIZE } from "../constant/settings";


let timeoutRef: number | null = null
const saveToStorage = (callback: () => void) => {
    if (timeoutRef) {
        clearTimeout(timeoutRef);
    }

    timeoutRef = setTimeout(callback, 500);
}

export const useGreetingsStore = create<GreetingsStoreType>((set) => ({
    textShadow: GREETING_FONT_SIZE,
    setTextShadow: (textShadow: number) => {
        saveToStorage(() => Storage.sync.set("greeting", { text_shadow: textShadow }))
        return set(() => ({ textShadow }))
    },

    fontSize: GREETING_TEXT_SHADOW,
    setFontSize: (fontSize: number) => {
        saveToStorage(() => Storage.sync.set("greeting", { font_size: fontSize }))
        return set(() => ({ fontSize }))
    },

    removeAll: () => set({}),
}))

export const useBackgroundStore = create<BackgroundStoreType>((set) => ({
    blurIntensity: BACKGROUND_BLUR_INTENSITY,
    setBlurIntensity: (blurIntensity: number) => {
        saveToStorage(() => Storage.sync.set("background", { blur_intensity: blurIntensity }))
        return set(() => ({ blurIntensity }))
    },

    brightness: BACKGROUND_BRIGHTNESS,
    setBrightness: (brightness: number) => {
        saveToStorage(() => Storage.sync.set("background", { brightness }))
        return set(() => ({ brightness }))
    },

    removeAll: () => set({}),
}))

export const useTimeStore = create<TimeStoreType>((set) => ({

    fontSize: TIME_FONT_SIZE,
    setFontSize: (fontSize: number) => {
        saveToStorage(() => Storage.sync.set("time", { font_size: fontSize }))
        return set(() => ({ fontSize }))
    },

    removeAll: () => set({}),
}))