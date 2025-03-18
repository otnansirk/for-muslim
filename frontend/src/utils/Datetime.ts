
const date = (tz?: string) => {
    const dateNow = Date.now();
    const date = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(dateNow)

    return {
        weekday: date.split(', ')[0],
        month: date.split(', ')[1].split(' ')[0],
        day: date.split(', ')[1].split(' ')[1],
        year: date.split(', ')[2]
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