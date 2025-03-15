package prayer

import (
	"github.com/labstack/echo/v4"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"fmt"
	"os"
)

type GetTimingsRequest struct {
	Date   string `json:"date" validate:"required"`
	Lat    string `json:"lat" validate:"required"`
	Lng    string `json:"lng" validate:"required"`
	Method string `json:"method"`
}

func GetTimings(c echo.Context, req GetTimingsRequest) (TimingsResponse, error) {
	var prayerTimes TimingsResponse

	baseUrl := os.Getenv("PRAYER_BASEURL") + "/timings/" + req.Date
	u, err := url.Parse(baseUrl)

	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return prayerTimes, err
	}

	query := u.Query()
	query.Set("latitude", req.Lat)
	query.Set("longitude", req.Lng)
	query.Set("method", req.Method)

	u.RawQuery = query.Encode() 
	resp, err := http.Get(u.String())

	if err != nil {
		return prayerTimes, err
	}

	defer resp.Body.Close() 

	body, _ := ioutil.ReadAll(resp.Body)
	err = json.Unmarshal(body, &prayerTimes)
	if err != nil {
		return prayerTimes, err
	}

	return prayerTimes, nil
}