package persistance

import (
	"github.com/otnansirk/for-muslim/helper"
	"github.com/otnansirk/for-muslim/lib/weather"
	"github.com/labstack/echo/v4"
	"net/http"
	"fmt"
)

type (
	WeatherRequest struct {
		Lat    string `query:"lat"`
		Lng    string `query:"lng"`
	}
	GetWeatherAccLocationRequest struct {
		Search  string `query:"search"`
		Lang    string `query:"lang"`
	}

	WeatherResponse struct {
		Location Location `json:"location,omitempty"`
		Temp  Temp   `json:"temp"`
		IsDay int    `json:"is_day,omitempty"`
		Text  string `json:"text"`
	}

	WeatherAccLocationResponse struct {
		Name 	 string   `json:"name,omitempty"`
		Address  string   `json:"address"`
	}

	Temp struct {
		C float64 `json:"c"`
		F float64 `json:"f"`
		Feels_c float64 `json:"feels_c,omitempty"`
		Feels_f float64 `json:"feels_f,omitempty"`
	}

	Location struct {
		Lat    string `json:"lat"`
		Lng    string `json:"lng"`
		City   string `json:"city"`
		Region string `json:"region"`
	}

)


func validateGetWeather(req WeatherRequest) map[string]string {
	errors := make(map[string]string)
	
	if req.Lat == "" {
		errors["lat"] = "lat is required"
	}

	if req.Lng == "" {
		errors["lng"] = "lng is required"
	}

	return errors
}

func validateGetWeatherAccLocation(req GetWeatherAccLocationRequest) map[string]string {
	errors := make(map[string]string)
	
	if req.Search == "" {
		errors["search"] = "search is required"
	}

	if req.Lang == "" {
		errors["lang"] = "lang is required"
	}

	return errors
}


func GetWeather(c echo.Context) error {
	var req WeatherRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	// Validasi manual
	errors := validateGetWeather(req)
	if len(errors) > 0 {
		return c.JSON(http.StatusBadRequest, helper.Response{
			Errors: errors,
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Bad Request",
			},
		})
	}

	lat  := c.QueryParam("lat")
	lng  := c.QueryParam("lng")

	weatherReq := weather.GetWeatherRequest{
		Lat: lat,
		Lng: lng,
	}

	weatherRes, err := weather.GetWeather(c, weatherReq)
	if err != nil {
		return c.JSON(http.StatusBadRequest, helper.Response{
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Failed get weather",
			},
		})
	}

	weathersData := WeatherResponse{
		Location: Location{
			Lat: fmt.Sprintf("%f", weatherRes.Location.Lat),
			Lng: fmt.Sprintf("%f", weatherRes.Location.Lon),
			City: weatherRes.Location.Name,
			Region: weatherRes.Location.Region,
		},
		Temp: Temp{
			C: weatherRes.Current.TempC,
			F: weatherRes.Current.TempF,
			Feels_c: weatherRes.Current.FeelslikeC,
			Feels_f: weatherRes.Current.FeelslikeF,
		},
		IsDay: weatherRes.Current.IsDay,
		Text: weatherRes.Current.Condition.Text,
	}

	res := helper.Response{
		Data: weathersData,
		Meta: helper.Meta{
			Status: "ok",
			Message: "OK",
		},
	}
	return c.JSON(http.StatusOK, res)
}


func GetWeatherAccu(c echo.Context) error {

	weatherRes, err := weather.GetWeatherAccu(c)
	if err != nil {
		return c.JSON(http.StatusBadRequest, helper.Response{
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Failed get weather",
			},
		})
	}

	weathersData := WeatherResponse{
		Location: Location{
			Lat: weatherRes.Lat,
			Lng: weatherRes.Lon,
			City: weatherRes.City,
			Region: weatherRes.Region,
		},
		Temp: Temp{
			C: weatherRes.Now.Temp,
			F: (9/5 * weatherRes.Now.Temp) + 32,
			Feels_c: weatherRes.Now.Feels,
			Feels_f: (9/5 * weatherRes.Now.Temp) + 32,
		},
		Text: weatherRes.Now.Description,
	}

	res := helper.Response{
		Data: weathersData,
		Meta: helper.Meta{
			Status: "ok",
			Message: "OK",
		},
	}
	return c.JSON(http.StatusOK, res)
}

func GetWeatherAccuAutocompleteLocation(c echo.Context) error {
	var req GetWeatherAccLocationRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	// Validasi manual
	errors := validateGetWeatherAccLocation(req)
	if len(errors) > 0 {
		return c.JSON(http.StatusBadRequest, helper.Response{
			Errors: errors,
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Bad Request",
			},
		})
	}

	search  := c.QueryParam("search")
	lang  := c.QueryParam("lang")

	weatherReq := weather.GetWeatherAccLocationRequest{
		Search: search,
		Lang: lang,
	}

	weatherRes, err := weather.GetWeatherAccuLocation(c, weatherReq)
	if err != nil {
		return c.JSON(http.StatusBadRequest, helper.Response{
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Failed get weather",
			},
		})
	}

	res := helper.Response{
		Data: weatherRes,
		Meta: helper.Meta{
			Status: "ok",
			Message: "OK",
		},
	}
	return c.JSON(http.StatusOK, res)
}