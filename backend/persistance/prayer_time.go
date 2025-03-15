package persistance

import (
	"github.com/otnansirk/for-muslim/helper"
	"github.com/otnansirk/for-muslim/lib/prayer"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"regexp"
)

type (
	PrayerTimeRequest struct {
		Date   string `query:"date"`
		Lat    string `query:"lat"`
		Lng    string `query:"lng"`
		Method string `query:"method"`
	}

	PrayerTimeResponse struct {
		Fajr       string    `json:"fajr"`
		Sunrise    string    `json:"sunrise"`
		Dhuhr      string    `json:"dhuhr"`
		Asr        string    `json:"asr"`
		Sunset     string    `json:"sunset"`
		Maghrib    string    `json:"maghrib"`
		Isha       string    `json:"isha"`
		Imsak      string    `json:"imsak"`
		Midnight   string    `json:"midnight"`
		Firstthird string    `json:"firstthird"`
		Lastthird  string    `json:"lastthird"`
		Hijri      Hijri     `json:"hijri"`
		Gregorian  Gregorian `json:"gregorian"`
		Meta  	   Meta      `json:"meta"`
	}

	Hijri struct {
		Readable string  `json:"readable"`
		Day      string  `json:"day"`
		Weekday  Weekday `json:"weekday"`
		Month    Month   `json:"month"`
		Year     string  `json:"year"`
		Method   string  `json:"method"`
	}

	Weekday struct {
		En string `json:"en"`
		Ar string `json:"ar,omitempty"`
	}

	Month struct {
		Date string `json:"date"`
		En   string `json:"en"`
		Ar   string `json:"ar,omitempty"`
		Days string `json:"days,omitempty"`
	}

	Gregorian struct {
		Readable string  `json:"readable"`
		Day      string  `json:"day"`
		Weekday  Weekday `json:"weekday"`
		Month    Month   `json:"month"`
		Year     string  `json:"year"`
	}

	Meta struct {
		Method Method `json: "method"`
	}
	
	Method struct {
		Id   string `json:"id"`
		Name string `json:"name"`
	}
)

func validateGetPrayerTime(req PrayerTimeRequest) map[string]string {
	errors := make(map[string]string)
	dateRegex := `^\d{2}-\d{2}-\d{4}$`
	if match, _ := regexp.MatchString(dateRegex, req.Date); !match {
		errors["date"] = "Date must be in format dd-mm-yy"
	}

	if req.Date == "" {
		errors["date"] = "Date is required"
	}

	if req.Lat == "" {
		errors["lat"] = "Lat is required"
	}

	if req.Lng == "" {
		errors["lng"] = "lng is required"
	}

	if req.Method == "" {
		errors["method"] = "method is required"
	}

	return errors

}

func GetPrayerTime(c echo.Context) error {
	var req PrayerTimeRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	// Validasi manual
	errors := validateGetPrayerTime(req)
	if len(errors) > 0 {
		return c.JSON(http.StatusBadRequest, helper.Response{
			Errors: errors,
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Bad Request",
			},
		})
	}

	date := c.QueryParam("date")
	lat  := c.QueryParam("lat")
	lng  := c.QueryParam("lng")
	method  := c.QueryParam("method")

	prayerReq := prayer.GetTimingsRequest{
		Date: date,
		Lat: lat,
		Lng: lng,
		Method: method,
	}

	timings, err := prayer.GetTimings(c, prayerReq)
	if err != nil {
		return c.JSON(http.StatusBadRequest, helper.Response{
			Errors: errors,
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Failed get prayer time",
			},
		})
	}

	hijriReadable := timings.Data.Date.Hijri.Day + " " + timings.Data.Date.Hijri.Month.En + " " + timings.Data.Date.Hijri.Year
	gregorianReadable := timings.Data.Date.Gregorian.Day + " " + timings.Data.Date.Gregorian.Month.En + " " + timings.Data.Date.Gregorian.Year
	prayerTimes := PrayerTimeResponse{
		Fajr       : timings.Data.Timings.Fajr,
		Sunrise    : timings.Data.Timings.Sunrise,
		Dhuhr      : timings.Data.Timings.Dhuhr,
		Asr        : timings.Data.Timings.Asr,
		Sunset     : timings.Data.Timings.Sunset,
		Maghrib    : timings.Data.Timings.Maghrib,
		Isha       : timings.Data.Timings.Isha,
		Imsak      : timings.Data.Timings.Imsak,
		Midnight   : timings.Data.Timings.Midnight,
		Firstthird : timings.Data.Timings.Firstthird,
		Lastthird  : timings.Data.Timings.Lastthird,
		Hijri: Hijri{
			Readable: hijriReadable,
			Day: timings.Data.Date.Hijri.Day,
			Weekday: Weekday{
				En: timings.Data.Date.Hijri.Weekday.En,
			},
			Month: Month{
				Date: strconv.Itoa(timings.Data.Date.Hijri.Month.Number), 
				En: timings.Data.Date.Hijri.Month.En,
			},
			Year: timings.Data.Date.Hijri.Year,
			Method: timings.Data.Date.Hijri.Method,
		},
		Gregorian: Gregorian{
			Readable: gregorianReadable,
			Day: timings.Data.Date.Gregorian.Day,
			Weekday: Weekday{
				En: timings.Data.Date.Gregorian.Weekday.En,
			},
			Month: Month{
				Date: strconv.Itoa(timings.Data.Date.Gregorian.Month.Number), 
				En: timings.Data.Date.Gregorian.Month.En,
			},
			Year: timings.Data.Date.Gregorian.Year,
		},
		Meta: Meta{
			Method: Method{
				Id: strconv.Itoa(timings.Data.Meta.Method.Id),
				Name: timings.Data.Meta.Method.Name,
			},
		},
	}

	res := helper.Response{
		Data: prayerTimes,
		Meta: helper.Meta{
			Status: "oks",
			Message: "OK",
		},
	}
	return c.JSON(http.StatusOK, res)
}