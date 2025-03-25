type ConfigDateTypes = {
    tz?: string;
    timestring?: string;
    hour12?: boolean;
    weekday?: "long" | "short" | "narrow" | undefined;
    day?: "numeric" | "2-digit" | undefined;
    month?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
    year?: "numeric" | "2-digit" | undefined;
}

class Datetime {

    static get = (config?: ConfigDateTypes) => {
        const dateFrom = config?.timestring ? new Date(config.timestring) : Date.now();
        const time = new Intl.DateTimeFormat('en-US', {
            timeZone: config?.tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: !!config?.hour12
        }).format(dateFrom)

        const weekday = new Intl.DateTimeFormat('en-US', {
            timeZone: config?.tz,
            weekday: (config?.weekday) ? config.weekday : "long"
        }).format(dateFrom)

        const day = new Intl.DateTimeFormat('en-US', {
            timeZone: config?.tz,
            day: (config?.day) ? config.day : "2-digit"
        }).format(dateFrom)

        const month = new Intl.DateTimeFormat('en-US', {
            timeZone: config?.tz,
            month: (config?.month) ? config.month : "long"
        }).format(dateFrom)

        const year = new Intl.DateTimeFormat('en-US', {
            timeZone: config?.tz,
            year: (config?.year) ? config.year : "numeric"
        }).format(dateFrom)
        const data = {
            hours: time.split(':')[0],
            minutes: time.split(':')[1],
            seconds: time.split(':')[2].split(' ')[0],
            meridiem: time.split(':')[2].split(' ')[1] ?? '',
            weekday: weekday,
            month: month,
            day: day,
            year: year
        }
        return {
            ...data,
            full: `${data.day} ${data.month} ${data.year} ${data.hours}:${data.minutes}:${data.seconds}${data.meridiem}`
        }
    }

    static greating = (tz?: string): string => {
        const hour = new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: false,
            timeZone: tz
        });

        const hourNum = Number(hour);
        if (hourNum >= 5 && hourNum < 12) return "Barakallahu fi yaumik"; // Semoga Allah memberkahi harimu
        if (hourNum >= 12 && hourNum < 17) return "Jazakallahu khairan"; // Semoga Allah membalasmu dengan kebaikan
        if (hourNum >= 17 && hourNum < 21) return "Taqabbalallahu minna wa minkum"; // Semoga Allah menerima amal kita
        return "Barakallahu fikum"; // Semoga Allah memberkahimu
    }

}

export default Datetime