import {
    NOTIF_IMSAK_DESC,
    NOTIF_IMSAK_TITLE,
    NOTIF_SHOLAT_DESC,
    NOTIF_SHOLAT_TITLE
} from "./constant/prayer";
import { PrayerTimeType, PrayerType, StorageType, TimesType } from "./types/Storage";
import { next, playAdhan } from "./utils/Prayer";
import { DEFAULT } from "./constant/settings";
import { firstUpper } from "./utils/Strings";
import { sendNotify } from "./utils/Helpers";
import Storage from "./utils/Storage";


chrome.alarms.onAlarm.addListener(alarm => {

    const title = alarm.name !== 'imsak' ? NOTIF_SHOLAT_TITLE : NOTIF_IMSAK_TITLE + firstUpper(alarm.name)
    const message = alarm.name !== 'imsak' ? NOTIF_SHOLAT_DESC : NOTIF_IMSAK_DESC

    Storage.sync.get('prayer', item => {
        const data = item as PrayerType
        const upcoming = next(data)
        const prayer = data[alarm.name as keyof TimesType] as PrayerTimeType
        const isChromeNotifyON = prayer.chrome_notify
        const isAdhanNotifyON = prayer.adhan_notify

        if (isChromeNotifyON) {
            sendNotify(title, message)
        }

        if (isAdhanNotifyON) {
            playAdhan(alarm.name)
        }

        Storage.sync.set("prayer", { upcoming });
    })

})

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        DEFAULT.forEach((setting) => {
            const [key, value] = Object.entries(setting)[0] as [keyof StorageType, StorageType[keyof StorageType]];
            Storage.sync.set(key, value);
        });

        newTab()
    }
})

const newTab = () => {
    const url = chrome.runtime.getURL('index.html')
    chrome.tabs.create({ url })
}