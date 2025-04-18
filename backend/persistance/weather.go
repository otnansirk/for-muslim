package persistance

import (
	"github.com/otnansirk/for-muslim/lib/weather"
	"github.com/otnansirk/for-muslim/helper"
	"github.com/labstack/echo/v4"
	"net/http"
	"fmt"
)

type (

	GetWeatherAccLocationRequest struct {
		Search  string `query:"search"`
		Lang    string `query:"lang"`
	}

	WeatherResponse struct {
		Location Location      `json:"location,omitempty"`
		Now      weather.Now   `json:"now"`
		IsDay    int           `json:"is_day,omitempty"`
		Text     string        `json:"text"`
	}

	WeatherAccLocationResponse struct {
		Name 	 string   `json:"name,omitempty"`
		Address  string   `json:"address"`
	}

	Location struct {
		Lat    string `json:"lat"`
		Lng    string `json:"lng"`
		City   string `json:"city"`
		Region string `json:"region"`
	}

)


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
	var req weather.WeatherRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	weatherRes, err := weather.GetWeather(c, req)
	if err != nil {
		fmt.Println("persistance.GetWeather", err)
		return c.JSON(http.StatusBadRequest, helper.Response{
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Failed get weather",
			},
		})
	}

	weathersData := WeatherResponse{
		Location: Location{
			Lat: fmt.Sprintf("%f", weatherRes.Geo.Lat),
			Lng: fmt.Sprintf("%f", weatherRes.Geo.Lon),
			City: weatherRes.Geo.City,
			Region: weatherRes.Geo.Country,
		},
		Now: weather.Now{
			Icon        : weatherRes.Now.Icon,
			Description : weatherRes.Now.Description,
			Temp        : weatherRes.Now.Temp,
			Feels       : weatherRes.Now.Feels,
		},
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