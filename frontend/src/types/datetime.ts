export type ConfigDateTypes = {
    tz?: string;
    timestring?: string;
    hour12?: boolean;
    weekday?: "long" | "short" | "narrow" | undefined;
    day?: "numeric" | "2-digit" | undefined;
    month?: "long" | "short" | "narrow" | "numeric" | "2-digit" | undefined;
    year?: "numeric" | "2-digit" | undefined;
}

export type TimeFormatType = {
    hours: string;
    minutes: string;
    seconds: string;
    meridiem: string;
    weekday: string;
    month: string;
    day: string;
    year: string;
    full: string;
}