export type WeatherType = {
    text?: string
    temp_c?: number
    temp_f?: number
    feels_c?: number
    feels_f?: number
    last_update?: number
}

export type StorageType = {
    name?: string
    lat?: string
    lng?: string
    address?: string
    city?: string
    country?: string
    region?: string
    lang?: string
    weather?: WeatherType
    hijri?: string
    imsak?: {
        notify?: string
        time?: string
    }
    fajr?: {
        notify?: string
        time?: string
    }
    dhuhr?: {
        notify?: string
        time?: string
    }
    asr?: {
        notify?: string
        time?: string
    }
    maghrib?: {
        notify?: string
        time?: string
    }
    isha?: {
        notify?: string
        time?: string
    }
}


class Storage {
    static sync = {
        set: <K extends keyof StorageType>(key: K, value: StorageType[K]) => {
            if (typeof chrome !== "undefined" && chrome.storage) {
                chrome.storage.sync.get(key).then(item => {
                    if (typeof value === 'object' && value != null && typeof item === 'object' && item != null) {
                        const safeValue = JSON.parse(JSON.stringify(value));
                        chrome.storage.sync.set({ [key]: { ...item[key], ...safeValue } });
                    } else {
                        chrome.storage.sync.set({ [key]: value });
                    }
                })
            } else {
                console.error("Chrome Storage API is not available.");
            }
        },
        get: async (key: string): Promise<StorageType | undefined> => {
            if (typeof chrome !== "undefined" && chrome.storage) {
                return new Promise((resolve) => {
                    chrome.storage.sync.get(key, result => {
                        resolve(result[key])
                    })
                })
            } else {
                console.error("Chrome Storage API is not available.");
                return undefined;
            }
        },
        listen: (key: string, callback: (item: StorageType) => void) => {
            chrome.storage.onChanged.addListener(item => callback(item?.[key]?.newValue))
        }
    }
}

export default Storage