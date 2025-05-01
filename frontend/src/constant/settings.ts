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
            "type": "unsplash"
        }
    }
]