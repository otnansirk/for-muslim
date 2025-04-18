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

type (

	WeatherRequest struct {
		Lat      string `query:"lat"`
		Lon      string `query:"lon"`
		Provider string `query:"provider"`
		Geo      string `query:"geo"`
		Query    string `query:"query"`
		Lang     string `query:"lang"`
		Unit     string `query:"unit"`
		Data     string `query:"data"`
	}

	GetWeatherAccLocationRequest struct {
		Search string `json:"search" validate:"required"`
		Lang string `json:"lang" validate:"required"`
	}
)

func setQuery(q url.Values, key string, val string) {
	if val != "" {
		q.Set(key, val)
	}
}

func GetWeather(c echo.Context, req WeatherRequest) (WeatherResponse, error) {
	var weatherResponse WeatherResponse

	baseUrl := os.Getenv("WEATHER_ACCU_BASEURL")
	u, err := url.Parse(baseUrl)

	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return weatherResponse, err
	}

	query := u.Query()
	
	setQuery(query, "provider", req.Provider)
	setQuery(query, "query", req.Query)
	setQuery(query, "lat", req.Lat)
	setQuery(query, "lon", req.Lon)
	setQuery(query, "lang", req.Lang)
	setQuery(query, "unit", req.Unit )
	setQuery(query, "data", "simple")

	u.RawQuery = query.Encode() 
	resp, err := http.Get(u.String())

	if err != nil {
		fmt.Println("weather.GetWeather", err)
		return weatherResponse, err
	}

	defer resp.Body.Close() 

	body, _ := ioutil.ReadAll(resp.Body)
	
	err = json.Unmarshal(body, &weatherResponse)
	if err != nil {
		fmt.Println("weather.GetWeather.Unmarshal", err)
		return weatherResponse, err
	}

	return weatherResponse, nil
}

func GetWeatherAccuLocation(c echo.Context, req GetWeatherAccLocationRequest) ([]WeatherAccLocationResponse, error) {
	var weatherResponse []WeatherAccLocationResponse

	baseUrl := os.Getenv("WEATHER_ACCU_WEBAPI_URL") + "/autocomplete"
	u, err := url.Parse(baseUrl)

	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return weatherResponse, err
	}

	query := u.Query()
	query.Set("query", req.Search)
	query.Set("lang", req.Lang)

	u.RawQuery = query.Encode()

	client := &http.Client{}
	request, err := http.NewRequest("GET", u.String(), nil)
	if err != nil {
		return weatherResponse, err
	}
	request.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
	request.Header.Set("Accept", "application/json")
	request.Header.Set("Accept-Language", "en-US,en;q=0.9")

	resp, err := client.Do(request)

	if err != nil {
		return weatherResponse, err
	}
	
	defer resp.Body.Close() 
	
	body, _ := ioutil.ReadAll(resp.Body)
	err = json.Unmarshal(body, &weatherResponse)
	fmt.Println(weatherResponse, "KRISS")
	if err != nil {
		return weatherResponse, err
	}

	return filterUniqueLocations(weatherResponse), nil
}

func filterUniqueLocations(locations []WeatherAccLocationResponse) []WeatherAccLocationResponse {
	seen := make(map[string]bool)
	var unique []WeatherAccLocationResponse

	for _, loc := range locations {
		if !seen[loc.LongName] {
			seen[loc.LongName] = true
			unique = append(unique, loc)
		}
	}

	return unique
}