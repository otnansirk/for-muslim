package persistance

import (
	"github.com/otnansirk/for-muslim/helper"
	"github.com/otnansirk/for-muslim/lib/weather"
	"github.com/labstack/echo/v4"
	"net/http"
)

type (
	WeatherRequest struct {
		Lat    string `query:"lat"`
		Lng    string `query:"lng"`
	}

	WeatherResponse struct {
		Temp  Temp   `json:"temp"`
		IsDay int   `json:"is_day"`
		Text  string `json:"text"`
	}

	Temp struct {
		C float64 `json:"c"`
		F float64 `json:"f"`
	}
)


func validateGetWeather(req WeatherRequest) map[string]string {
	errors := make(map[string]string)
	
	if req.Lat == "" {
		errors["lat"] = "Lat is required"
	}

	if req.Lng == "" {
		errors["lng"] = "lng is required"
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
			Errors: errors,
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Failed get weather",
			},
		})
	}

	weathersData := WeatherResponse{
		Temp: Temp{
			C: weatherRes.Current.TempC,
			F: weatherRes.Current.TempF,
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