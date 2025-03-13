export type ProfileProps = {
    lat?: string
    lng?: string
    address?: string
    city?: string
    country?: string
    lang?: string
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
    constructor() {
        //
    }

    static profile = {
        set: (value: ProfileProps) => {
            if (typeof chrome !== "undefined" && chrome.storage) {
                chrome.storage.sync.get('profile').then(item => {
                    chrome.storage.sync.set({ profile: { ...item.profile, ...value } });
                })
            } else {
                console.error("Chrome Storage API is not available.");
            }
        },
        get: async (key?: string): Promise<ProfileProps | undefined> => {
            if (typeof chrome !== "undefined" && chrome.storage) {
                return new Promise((resolve) => {
                    chrome.storage.sync.get('profile', result => {
                        resolve(key ? result['profile'][key] : result['profile'])
                    })
                })
            } else {
                console.error("Chrome Storage API is not available.");
                return undefined;
            }
        },
        listen: (callback: (item: ProfileProps) => void) => {
            chrome.storage.onChanged.addListener(item => callback(item?.profile?.newValue))
        }
    }
}

export default Storage