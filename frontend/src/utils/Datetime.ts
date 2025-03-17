
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
    time
}