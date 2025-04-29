import { StorageType } from "../types/Storage";

const StorageLocal = class Storage {
    static set = <K>(key: string, value: K) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.set({ [key]: value });
        } else {
            console.error("Chrome Local Storage API is not available.");
        }
    }

    static get = (key: string, callback: <T>(item: T) => void) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.get(key, result => callback(result[key]))
        } else {
            console.error("Chrome Local Storage API is not available.");
        }
    }

    static listen = (key: string, callback: <T>(item: T) => void) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.onChanged.addListener(item => {
                if (item?.[key]) {
                    callback(item?.[key]?.newValue)
                }
            })
        } else {
            console.error("Chrome Storage API is not available.");
        }
    }

    static watch = (key: string, callback: <T>(item: T) => void) => {
        this.listen(key, callback)
        this.get(key, callback)
    }
}
class Storage {

    private static deepMerge = <T extends StorageType>(target: T, source: Partial<T>): T => {
        let result: T = { ...target };

        if (source !== null && typeof source === "object") {
            for (const key in source) {
                if (
                    source[key] !== null &&
                    typeof source[key] === "object" &&
                    !Array.isArray(source[key])
                ) {
                    result[key] = this.deepMerge(target[key] ?? {}, source[key] as StorageType) as T[typeof key];
                } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
                    result[key] = [...(target[key] as T[typeof key] & unknown[]), ...source[key]] as T[typeof key]
                } else {
                    result[key] = source[key] as T[typeof key];
                }
            }
        } else {
            result = source;
        }

        return result;
    };

    private static set = <K extends keyof StorageType>(key: K, value: StorageType[K]) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.sync.get(key).then(item => {

                const oldData = (item[key] ?? {}) as Partial<StorageType[K]>;
                const updatedData = this.deepMerge(oldData, value);
                chrome.storage.sync.set({ [key]: updatedData });

            })
        } else {
            console.error("Chrome Storage API is not available.");
        }
    }

    private static get = async <K extends keyof StorageType>(key: K, callback: <T>(item: T) => void) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.sync.get(key, result => callback(result[key]))
        } else {
            console.error("Chrome Storage API is not available.");
        }
    }

    private static listen = <K extends keyof StorageType>(key: K, callback: <T>(item: T) => void) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.onChanged.addListener(item => {
                if (item?.[key]) {
                    callback(item?.[key]?.newValue)
                }
            })
        } else {
            console.error("Chrome Storage API is not available.");
        }
    }

    private static watch = <K extends keyof StorageType>(key: K, callback: <T>(item: T) => void) => {
        this.listen(key, callback)
        this.get(key, callback)
    }

    static sync = {
        set: this.set,
        get: this.get,
        listen: this.listen,
        watch: this.watch
    }

    static local = {
        set: StorageLocal.set,
        get: StorageLocal.get,
        listen: StorageLocal.listen,
        watch: StorageLocal.watch
    }

}

export default Storage