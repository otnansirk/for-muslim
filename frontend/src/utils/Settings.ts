export const defaultSettings = [
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
        'weather': {
            "enable": true,
            'geolocation': 'approximate',
            'unit': 'c'
        }
    }
]