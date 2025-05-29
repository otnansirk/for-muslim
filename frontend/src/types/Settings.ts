import { BackgroundType, DateType, GreetingType, NotesType, PrayerType, TimeType } from "../types/Storage";
import { WeatherType } from "./Weather";

export type DefaultSettingType = Partial<{
    date: DateType,
    greeting: GreetingType
    time: TimeType
    weather: WeatherType
    prayer: PrayerType
    background: BackgroundType
    notes: NotesType
}>