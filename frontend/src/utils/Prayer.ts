type TimesType = {
    imsak: string;
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}

export const nextPrayer = (times: TimesType) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = Object.entries(times)
        .filter(([key]) => ["imsak", "fajr", "dhuhr", "asr", "maghrib", "isha"].includes(key))
        .map(([name, time]) => {
            const [hours, minutes] = time.split(":").map(Number);
            return { name, time, minutes: hours * 60 + minutes };
        })
        .sort((a, b) => a.minutes - b.minutes);

    for (const prayer of prayers) {
        if (prayer.minutes > currentTime) {
            return prayer.name;
        }
    }

    return prayers[0].name;
}