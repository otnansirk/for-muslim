import { DEFAULT } from "../constant/settings"
import { DefaultSettingType } from "../types/Settings"


export const getDefaultSetting = <K extends keyof DefaultSettingType>(key: K): DefaultSettingType[K] | null => {
    const setting = DEFAULT.find(item => {
        const defaultSetting: DefaultSettingType = item
        return defaultSetting[key]
    })

    if (setting) {
        return setting[key];
    }
    return null
}