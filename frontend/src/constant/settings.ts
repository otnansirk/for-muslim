import { DefaultSettingType } from "../types/Settings";
import { BACKGROUND_COLLECTION_ISLAMIC } from "./background";

export const GREETING_FONT_SIZE = 45
export const GREETING_TEXT_SHADOW = 20
export const TIME_FONT_SIZE = 65
export const BACKGROUND_BLUR_INTENSITY = 0
export const BACKGROUND_BRIGHTNESS = 100

export const DEFAULT: DefaultSettingType[] = [
    {
        "date": {
            "enable": true,
            "format": {
                "config": {
                    "day": "2-digit",
                    "month": "long"
                },
                "label": "Sunday, February 30",
                "value": "weekday, month day"
            }
        }
    },
    {
        "greeting": {
            "enable": true,
            "font_size": GREETING_FONT_SIZE,
            "text_shadow": GREETING_TEXT_SHADOW
        }
    },
    {
        "time": {
            "enable": true,
            "hour12": true,
            "show_ampm": true,
            "show_seconds": false,
            font_size: TIME_FONT_SIZE
        }
    },
    {
        "weather": {
            "enable": true,
            "geolocation": "approximate",
            "unit": "C"
        }
    },
    {
        "prayer": {
            "enable": true,
            "geolocation": "approximate",
            "tz": "auto",
            "method": "3",
        }
    },
    {
        "background": {
            "frequency": "tab",
            "source": "unsplash",
            "collection_type": "islamic",
            "collection_value": BACKGROUND_COLLECTION_ISLAMIC,
            "blur_intensity": BACKGROUND_BLUR_INTENSITY,
            "brightness": BACKGROUND_BRIGHTNESS
        }
    },
    {
        "notes": {
            "enable": true,
            "content": `# Notes Here !!!
### Shorcuts
[ ] Ctrl + Shift + 1 - To big heading
[ ] Ctrl + Shift + 2 - To medium heading
[ ] Ctrl + Shift + 3 - To small heading
[ ] Ctrl + Shift + 4 - To bullet list
[ ] Ctrl + Shift + 5 - To todo list
[ ] Ctrl + Shift + 6 - To normal line`
        }
    }
]