import { BACKGROUND_COLLECTION_ISLAMIC } from "./background";

export const DEFAULT = [
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
            "enable": true
        }
    },
    {
        "time": {
            "enable": true,
            "hour12": true,
            "show_ampm": true,
            "show_seconds": false
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
            "type": "unsplash",
            "collection_type": "islamic",
            "collection_value": BACKGROUND_COLLECTION_ISLAMIC
        }
    },
    {
        "notes": `# Notes Here !!!
### Shorcuts
[ ] Ctrl + Shift + 1 - To big heading
[ ] Ctrl + Shift + 2 - To medium heading
[ ] Ctrl + Shift + 3 - To small heading
[ ] Ctrl + Shift + 4 - To bullet list
[ ] Ctrl + Shift + 5 - To todo list
[ ] Ctrl + Shift + 6 - To normal line`
    }
]