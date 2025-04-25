package prayer


type TimingsResponse struct {
    Code   int    `json:"code"`
    Status string `json:"status"`
    Data   Data   `json:"data"`
}

type Data struct {
    Timings Timings `json:"timings"`
    Date    Date    `json:"date"`
    Meta    Meta    `json:"meta"`
}

type Timings struct {
    Fajr       string `json:"fajr"`
    Sunrise    string `json:"sunrise"`
    Dhuhr      string `json:"dhuhr"`
    Asr        string `json:"asr"`
    Sunset     string `json:"sunset"`
    Maghrib    string `json:"maghrib"`
    Isha       string `json:"isha"`
    Imsak      string `json:"imsak"`
    Midnight   string `json:"midnight"`
    Firstthird string `json:"firstthird"`
    Lastthird  string `json:"lastthird"`
}

type Date struct {
    Readable  string    `json:"readable"`
    Timestamp string    `json:"timestamp"`
    Hijri     Hijri     `json:"hijri"`
    Gregorian Gregorian `json:"gregorian"`
}

type Hijri struct {
    Date             string           `json:"date"`
    Format           string           `json:"format"`
    Day              string           `json:"day"`
    Weekday          Weekday          `json:"weekday"`
    Month            Month            `json:"month"`
    Year             string           `json:"year"`
    Designation      Designation      `json:"designation"`
    Holidays         []string         `json:"holidays"`
    AdjustedHolidays []interface{}    `json:"adjusted_holidays"`
    Method           string           `json:"method"`
}

type Weekday struct {
    En string `json:"en"`
    Ar string `json:"ar,mitempty"`
}

type Month struct {
    Number int    `json:"number"`
    En     string `json:"en"`
    Ar     string `json:"ar,mitempty"`
    Days   int    `json:"days,mitempty"`
}

type Designation struct {
    Abbreviated string `json:"abbreviated"`
    Expanded    string `json:"expanded"`
}

type Gregorian struct {
    Date          string      `json:"date"`
    Format        string      `json:"format"`
    Day           string      `json:"day"`
    Weekday       Weekday     `json:"weekday"`
    Month         Month       `json:"month"`
    Year          string      `json:"year"`
    Designation   Designation `json:"designation"`
    LunarSighting bool        `json:"lunar_sighting"`
}

type Meta struct {
    Latitude                 float64 `json:"latitude"`
    Longitude                float64 `json:"longitude"`
    Timezone                 string  `json:"timezone"`
    Method                   Method  `json:"method"`
    LatitudeAdjustmentMethod string  `json:"latitude_adjustment_method"`
    MidnightMode             string  `json:"midnight_mode"`
    School                   string  `json:"school"`
    Offset                   Offset  `json:"offset"`
}

type Method struct {
    Id       int      `json:"id"`
    Name     string   `json:"name"`
    Params   Params   `json:"params"`
    Location Location `json:"location"`
}

type Params struct {
    Fajr interface{} `json:"fajr"`
    Isha interface{} `json:"isha"`
}

type Location struct {
    Latitude  float64 `json:"latitude"`
    Longitude float64 `json:"longitude"`
}

type Offset struct {
    Imsak    int `json:"imsak"`
    Fajr     int `json:"fajr"`
    Sunrise  int `json:"sunrise"`
    Dhuhr    int `json:"dhuhr"`
    Asr      int `json:"asr"`
    Sunset   int `json:"sunset"`
    Maghrib  int `json:"maghrib"`
    Isha     int `json:"isha"`
    Midnight int `json:"midnight"`
}