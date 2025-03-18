package weather

import (
	"github.com/labstack/echo/v4"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"fmt"
	"os"
)

type GetWeatherRequest struct {
	Lat string `json:"lat" validate:"required"`
	Lng string `json:"lng" validate:"required"`
}

func GetWeather(c echo.Context, req GetWeatherRequest) (WeatherResponse, error) {
	var weatherResponse WeatherResponse

	baseUrl := os.Getenv("WEATHER_BASEURL") + "/current.json"
	u, err := url.Parse(baseUrl)

	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return weatherResponse, err
	}

	query := u.Query()
	query.Set("key", os.Getenv("WEATHER_API_KEY"))
	query.Set("q", req.Lat + "," + req.Lng)
	query.Set("aqi", "yes")

	u.RawQuery = query.Encode() 
	resp, err := http.Get(u.String())

	if err != nil {
		return weatherResponse, err
	}

	defer resp.Body.Close() 

	body, _ := ioutil.ReadAll(resp.Body)
	
	err = json.Unmarshal(body, &weatherResponse)
	if err != nil {
		return weatherResponse, err
	}

	return weatherResponse, nil
}

func GetWeatherAccu(c echo.Context) (WeatherAccResponse, error) {
	var weatherResponse WeatherAccResponse

	baseUrl := os.Getenv("WEATHER_ACCU_BASEURL")
	u, err := url.Parse(baseUrl)

	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return weatherResponse, err
	}

	resp, err := http.Get(u.String())

	if err != nil {
		return weatherResponse, err
	}

	defer resp.Body.Close() 

	body, _ := ioutil.ReadAll(resp.Body)
	
	err = json.Unmarshal(body, &weatherResponse)
	if err != nil {
		return weatherResponse, err
	}

	return weatherResponse, nil
}