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

type WeatherAccLocationResponse struct {
    Name        string   `json:"name"`
    LongName    string   `json:"longName"`
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

