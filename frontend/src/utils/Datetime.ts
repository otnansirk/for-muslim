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

export {
    time,
    date
}