export type StorageType = {
    name?: string
    lat?: string
    lng?: string
    address?: string
    city?: string
    country?: string
    lang?: string
    weather?: {
        text?: string
        temp?: number
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
    prayer_time?: string
}


class Storage {
    static sync = {
        set: <K extends keyof StorageType>(key: K, value: StorageType[K]) => {
            if (typeof chrome !== "undefined" && chrome.storage) {
                chrome.storage.sync.get(key).then(item => {
                    if (typeof value === 'object' && value != null) {
                        const safeValue = JSON.parse(JSON.stringify(value));
                        chrome.storage.sync.set({ [key]: { ...(item || {}), ...safeValue } });
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
                        resolve(result)
                    })
                })
            } else {
                console.error("Chrome Storage API is not available.");
                return undefined;
            }
        },
        listen: (callback: (item: StorageType) => void) => {
            chrome.storage.onChanged.addListener(item => callback(item?.profile?.newValue))
        }
    }
}

export default Storage