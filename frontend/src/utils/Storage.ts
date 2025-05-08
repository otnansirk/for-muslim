import { StorageType } from "../types/Storage";
import * as idb from 'idb-keyval';


const StorageLocal = class Storage {
    static set = <K>(key: string, value: K) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            chrome.storage.local.set({ [key]: value });
        } else {
            console.error("Chrome Local Storage API is not available.");
        }
    }

    static get = async <T>(key: string, callback?: (item: T) => Promise<T | void> | void) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            if (callback) {
                chrome.storage.local.get(key, result => callback(result[key]))
            }
            return new Promise<T>((resolve, reject) => {
                chrome.storage.local.get(key, result => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError)
                    } else {
                        resolve(result[key])
                    }
                })
            })
        } else {
            console.error("Chrome Local Storage API is not available.");
        }
    }

    static listen = <T>(key: string, callback: (item: T) => void) => {
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

    static watch = <T>(key: string, callback: (item: T) => void) => {
        this.listen<T>(key, callback)
        this.get<T>(key, callback)
    }
}
const StorageDB = class Storage {
    static set = async <K>(key: string, value: K) => await idb.set(key, value)

    static get = async <T>(key: string, callback?: <T>(item: T) => Promise<T | void> | void) => {
        if (callback) {
            idb.get(key).then(result => callback(result))
        }

        return new Promise<T>((resolve, reject) => {
            idb.get(key).then(result => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                } else {
                    resolve(result)
                }
            })
        })
    }

    static delete = async (key: string) => await idb.del(key)
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

    private static get = async <K extends keyof StorageType, T = StorageType[K]>(key: K, callback?: <T>(item: T) => Promise<T | void> | void) => {
        if (typeof chrome !== "undefined" && chrome.storage) {
            if (callback) {
                chrome.storage.sync.get(key, result => callback(result[key]))
            }

            return new Promise<T>((resolve, reject) => {
                chrome.storage.sync.get(key, result => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError)
                    } else {
                        resolve(result[key])
                    }
                })
            })
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

    static db = {
        set: StorageDB.set,
        get: StorageDB.get,
        delete: StorageDB.delete,
    }

}

export default Storage