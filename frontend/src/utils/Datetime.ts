import { ConfigDateTypes, TimeFormatType } from "../types/datetime";

class Datetime {

    static get = (config?: ConfigDateTypes): TimeFormatType => {
        const dateFrom = config?.timestring ? new Date(config.timestring) : Date.now();
        const timezone = (config?.tz == 'auto' || !config?.tz) ? Intl.DateTimeFormat().resolvedOptions().timeZone : config?.tz
        const time = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: !!config?.hour12
        }).format(dateFrom)

        const weekday = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: (config?.weekday) ? config.weekday : "long"
        }).format(dateFrom)

        const day = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            day: (config?.day) ? config.day : "2-digit"
        }).format(dateFrom)

        const month = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            month: (config?.month) ? config.month : "long"
        }).format(dateFrom)

        const year = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
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

    static greeting = (tz?: string): string => {
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

    static format = (format: string = "weekday, month day", config: ConfigDateTypes = {}) => {
        const datetime = this.get(config)
        return format.replace(/weekday|day|month|year/gi, (match) => {
            return datetime[match.toLowerCase() as keyof typeof datetime] || match
        })
    }

}

export default Datetime