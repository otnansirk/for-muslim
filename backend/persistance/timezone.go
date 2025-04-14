package persistance

import (
	"github.com/otnansirk/for-muslim/helper"
	"github.com/labstack/echo/v4"
	"net/http"
	"strings"
	"slices"
)

type TimezoneItemType struct {
    Label   string    `json:"label"`
    Options []Options `json:"options"`
}

type Options struct {
    Value string `json:"value"`
    Text  string `json:"text"`
}

func filterTimezone(data []TimezoneItemType, keyword string) []TimezoneItemType {
	return slices.DeleteFunc(data, func(item TimezoneItemType) bool {
		return !slices.ContainsFunc(item.Options, func(iKey Options) bool {
			return strings.Contains(strings.ToLower(iKey.Text), strings.ToLower(keyword))
		})
	})
}

func GetTimezoneList(c echo.Context) error {
	keyword := c.QueryParam("search")
	data, err := helper.ReadJSON[[]TimezoneItemType]("data/timezone.json")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	filtered := filterTimezone(data, keyword)
	if len(filtered) > 6 {
		filtered = filtered[:6]
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