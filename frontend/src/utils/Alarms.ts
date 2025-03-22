class Alarms {
    static set = (name: string, timeString: string | undefined, timeZone?: string) => {
        if (!timeString) return

        const now = new Date();
        const [hours, minutes] = timeString.split(":").map(Number);

        const alarmTime = new Date(now.toLocaleString("en-US", { timeZone }));
        alarmTime.setHours(hours, minutes, 0, 0);

        // add one day if time is missed
        if (alarmTime.getTime() < now.getTime()) {
            alarmTime.setDate(alarmTime.getDate() + 1);
        }

        chrome.alarms.create(name, { when: alarmTime.getTime() });
    }

    static delete = (name: string) => chrome.alarms.clear(name)
}

export default Alarms