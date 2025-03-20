type DateTypes = {
    tz?: string;
    weekday?: "long" | "short" | "narrow" | undefined;
    day?: "numeric" | "2-digit" | undefined;
    month?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
    year?: "numeric" | "2-digit" | undefined;
}

const date = (config?: DateTypes) => {
    const dateNow = Date.now();
    const weekday = new Intl.DateTimeFormat('en-US', {
        timeZone: config?.tz,
        weekday: (config?.weekday) ? config.weekday : "long"
    }).format(dateNow)

    const day = new Intl.DateTimeFormat('en-US', {
        timeZone: config?.tz,
        day: (config?.day) ? config.day : "2-digit"
    }).format(dateNow)

    const month = new Intl.DateTimeFormat('en-US', {
        timeZone: config?.tz,
        month: (config?.month) ? config.month : "long"
    }).format(dateNow)

    const year = new Intl.DateTimeFormat('en-US', {
        timeZone: config?.tz,
        year: (config?.year) ? config.year : "numeric"
    }).format(dateNow)

    return {
        weekday: weekday,
        month: month,
        day: day,
        year: year
    }
};

const time = (hour12?: boolean, tz?: string) => {
    const date = Date.now();
    const time = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: hour12
    }).format(date)

    return {
        hours: time.split(':')[0],
        minutes: time.split(':')[1],
        seconds: time.split(':')[2].split(' ')[0],
        meridiem: time.split(':')[2].split(' ')[1] ?? '',
    }
};

const greating = (tz?: string): string => {
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

export {
    time,
    date,
    greating
}