import { ConfigDateTypes } from "../types/datetime";

export const DATE_FORMAT = [
    {
        label: "Sunday, February 30",
        value: "weekday, month day",
        config: {
            day: "2-digit",
            month: "long",
        } as ConfigDateTypes
    },
    {
        label: "Sunday, 30 February 2025",
        value: "weekday, day month year",
        config: {
            day: "2-digit",
            month: "long",
            year: "numeric"
        } as ConfigDateTypes
    },
    {
        label: "Sunday 30",
        value: "weekday day",
        config: {
            day: "2-digit",
            month: "long",
        } as ConfigDateTypes
    },
    {
        label: "30 Frebruary 2025",
        value: "day month year",
        config: {
            day: "2-digit",
            month: "long",
        } as ConfigDateTypes
    },
    {
        label: "Sunday 30 Frebruary",
        value: "weekday day month",
        config: {
            day: "2-digit",
            month: "long",
        } as ConfigDateTypes
    },
]