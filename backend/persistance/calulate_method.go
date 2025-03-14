package persistance

import (
	"github.com/otnansirk/for-muslim/helper"
	"github.com/labstack/echo/v4"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"fmt"
	"os"
)


func GetList (c echo.Context) error {
	jsonFile, err := os.Open("data/calculate-method.json")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened users.json")
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	var data interface{}

	err = json.Unmarshal(byteValue, &data)
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