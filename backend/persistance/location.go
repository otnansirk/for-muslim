package persistance

import (
	"github.com/otnansirk/for-muslim/helper"
	"github.com/labstack/echo/v4"
	"net/http"
	"strings"
	"slices"
)

type LocationItemType struct {
    Name      	string    `json:"name"`
    City 		string    `json:"city,omitempty"`
    CountryCode string    `json:"country_code,omitempty"`
    Keyword   	[]string  `json:"keyword,omitempty"`
    Latitude  	string    `json:"latitude"`
    Longitude 	string    `json:"longitude"`
}

func filterData(data []LocationItemType, keyword string) []LocationItemType {
	return slices.DeleteFunc(data, func(item LocationItemType) bool {
		return !slices.ContainsFunc(item.Keyword, func(iKey string) bool {
			return strings.Contains(strings.ToLower(iKey), strings.ToLower(keyword))
		})
	})
}

func GetLocationList(c echo.Context) error {
	keyword := c.QueryParam("keyword")
	data, err := helper.ReadJSON[[]LocationItemType]("data/location.json")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	filtered := filterData(data, keyword)
	if len(filtered) > 6 {
		filtered = filtered[:6]
	}

	for key, item := range filtered {
		filtered[key].Keyword = nil

		parts := strings.Split(item.Name, ",")
		if len(parts) > 1 {
			filtered[key].City = strings.TrimSpace(parts[0])
			filtered[key].CountryCode = strings.TrimSpace(parts[1])
			countryName, err := helper.GetCountryByCode(filtered[key].CountryCode)
			if err == nil {
				filtered[key].Name = strings.Replace(item.Name, filtered[key].CountryCode, countryName, -1)
			}

		} else {
			filtered[key].CountryCode = "Unknown"
		}
	}


	res := helper.Response{
		Data: filtered,
		Meta: helper.Meta{
			Status: "ok",
			Message: "OK",
		},
	}
	return c.JSON(http.StatusOK, res)
}