export const UNSPLASH_UTM = "?utm_source=sembahyang&utm_medium=referral"
export const BACKGROUND_TYPES = [
    {
        label: "Unsplash",
        value: "unsplash"
    },
    // {
    //     label: "Local",
    //     value: "local"
    // }
]
export const BACKGROUND_MAX_FEATURED_INDEX = 10

export const BACKGROUND_COLLECTION_ISLAMIC = "SWYjUoOuc44"
export const BACKGROUND_COLLECTION_WALLPAPER = "TC8LguLGFy4"
export const BACKGROUND_COLLECTION_ILLUSTRATION = "dUWMO3DKotM"

export const BACKGROUND_COLLECTION: { [key: string]: string } = {
    "islamic": BACKGROUND_COLLECTION_ISLAMIC,
    "wallpaper": BACKGROUND_COLLECTION_WALLPAPER,
    "illustration": BACKGROUND_COLLECTION_ILLUSTRATION
}

export const BACKGROUND_COLLECTIONS = [
    {
        label: "Wallpaper",
        value: "wallpaper"
    },
    {
        label: "Islamic",
        value: "islamic"
    },
    {
        label: "Illustration",
        value: "illustration"
    },
    {
        label: "Custom",
        value: "custom"
    }
]

export const BACKGROUND_REFRESH_FREQUENCY = [
    {
        label: "Every Tab",
        value: "tab"
    },
    // {
    //     label: "Every 5 Seconds",
    //     value: "5_seconds"
    // },
    // {
    //     label: "Every 10 Seconds",
    //     value: "10_seconds"
    // },
    // {
    //     label: "Every 15 Seconds",
    //     value: "15_seconds"
    // },
    // {
    //     label: "Every 30 Seconds",
    //     value: "30_seconds"
    // },
    // {
    //     label: "Every Hour",
    //     value: "3600_seconds"
    // },
    // {
    //     label: "Every Day",
    //     value: "86400_seconds"
    // },
    // {
    //     label: "Off",
    //     value: "off"
    // },
]