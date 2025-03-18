package weather

type WeatherAccResponse struct {
    Lat    string   `json:"lat"`
    Lon    string   `json:"lon"`
    City   string   `json:"city"`
    Region string   `json:"region"`
    Link   string   `json:"link"`
    Now    Now      `json:"now"`
    Sun    Sun      `json:"sun"`
    Today  Today    `json:"today"`
    Hourly []Hourly `json:"hourly"`
    Daily  []Daily  `json:"daily"`
}

type Now struct {
    Icon        int     `json:"icon"`
    Temp        float64 `json:"temp"`
    Feels       float64 `json:"feels"`
    Description string  `json:"description"`
}

type Sun struct {
    Duration string `json:"duration"`
    Rise     int    `json:"rise"`
    Set      int    `json:"set"`
}

type Today struct {
    Day   string `json:"day"`
    Night string `json:"night"`
    High  int    `json:"high"`
    Low   int    `json:"low"`
}

type Hourly struct {
    Timestamp int    `json:"timestamp"`
    Temp      int    `json:"temp"`
    Rain      string `json:"rain"`
}

type Daily struct {
    Timestamp int    `json:"timestamp"`
    High      int    `json:"high"`
    Low       int    `json:"low"`
    Day       string `json:"day"`
    Night     string `json:"night"`
    Rain      string `json:"rain"`
}
