package persistance

import (
	"github.com/otnansirk/for-muslim/helper"
	"github.com/labstack/echo/v4"
	"net/http"
)
type CalculateMethodType struct {
    Id   int    `json:"id"`
    Name string `json:"name"`
}


func GetCalculateMethodList (c echo.Context) error {
	var data, err = helper.ReadJSON[[]CalculateMethodType]("data/calculate-method.json")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	res := helper.Response{
		Data: data,
		Meta: helper.Meta{
			Status: "ok",
			Message: "OK",
		},
	}

	return c.JSON(http.StatusOK, res)
}