import {
    ASR,
    DHUHR,
    FAJR,
    IMSAK,
    ISHA,
    MAGHRIB,
    NOTIF_IMSAK_DESC,
    NOTIF_IMSAK_TITLE,
    NOTIF_SHOLAT_DESC,
    NOTIF_SHOLAT_TITLE
} from "./constant/prayer";
import { DEFAULT } from "./constant/settings";
import { PrayerType, StorageType } from "./types/Storage";
import { firstUpper } from "./utils/Strings";
import Storage from "./utils/Storage";
import { next } from "./utils/Prayer";


chrome.alarms.onAlarm.addListener(alarm => {
    const title = alarm.name !== 'imsak' ? NOTIF_SHOLAT_TITLE : NOTIF_IMSAK_TITLE
    const desc = alarm.name !== 'imsak' ? NOTIF_SHOLAT_DESC : NOTIF_IMSAK_DESC
    function sendNotify(message: string) {
        chrome.notifications.create(
            Date.now().toString(),
            {
                title: title + firstUpper(message),
                message: desc,
                type: "basic",
                iconUrl: chrome.runtime.getURL(`assets/logo.png`)
            }
        )
    }

    switch (alarm.name) {
        case IMSAK:
            sendNotify(IMSAK)
            break;
        case FAJR:
            sendNotify(FAJR)
            break;
        case DHUHR:
            sendNotify(DHUHR)
            break;
        case ASR:
            sendNotify(ASR)
            break;
        case MAGHRIB:
            sendNotify(MAGHRIB)
            break;
        case ISHA:
            sendNotify(ISHA)
            break;

        default:
            break;
    }

    Storage.sync.get('prayer', item => {
        const data = item as PrayerType
        const upcoming = next(data)
        Storage.sync.set("prayer", { upcoming });
    })

})

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        DEFAULT.forEach((setting) => {
            const [key, value] = Object.entries(setting)[0] as [keyof StorageType, StorageType[keyof StorageType]];
            Storage.sync.set(key, value);
        });
    }
})