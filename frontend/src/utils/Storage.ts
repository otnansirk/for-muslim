import { StorageType } from "../types/Storage";

class Storage {

    private static deepMerge = <T extends StorageType>(target: T, source: Partial<T>): T => {
        let result: T = { ...target };

        for (const key in source) {
            if (
                source[key] !== null &&
                typeof source[key] === "object" &&
                !Array.isArray(source[key])
            ) {
                result[key] = this.deepMerge(target[key] ?? {}, source[key] as StorageType) as T[typeof key];
            } else {
                result = source as T;
            }
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

    private static listen = (key: string, callback: <T>(item: T) => void) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.onChanged.addListener(item => callback(item?.[key]?.newValue))
        } else {
            console.error("Chrome Storage API is not available.");
        }
    }

    static sync = {
        set: this.set,
        get: this.get,
        listen: this.listen
    }
}

export default Storage