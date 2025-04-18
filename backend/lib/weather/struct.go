package weather 


type WeatherResponse struct {
    Meta  Meta    `json:"meta"`
    Geo   Geo     `json:"geo"`
    Now   Now     `json:"now"`
    Sun   Sun     `json:"sun"`
    Daily []Daily `json:"daily"`
}

type Meta struct {
    Url      string `json:"url"`
    Lang     string `json:"lang"`
    Provider string `json:"provider"`
}

type Geo struct {
    City    string `json:"city"`
    Country string `json:"country"`
    Lat     float64 `json:"lat"`
    Lon     float64 `json:"lon"`
}

type Now struct {
    Icon        string `json:"icon"`
    Description string `json:"description"`
    Temp        int    `json:"temp"`
    Feels       int    `json:"feels"`
}

type Sun struct {
    Rise []int  `json:"rise"`
    Duration string `json:"duration"`
    Set  []int  `json:"set"`
}

type Daily struct {
    Timestamp int    `json:"timestamp"`
    High      int    `json:"high"`
    Low       int    `json:"low"`
    Day       string `json:"day"`
    Night     string `json:"night"`
    Rain      string `json:"rain"`
}
