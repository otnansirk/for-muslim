package main

import (
	"github.com/otnansirk/for-muslim/persistance"
	"github.com/otnansirk/for-muslim/helper"
	"github.com/labstack/echo/v4"
	b64 "encoding/base64"
	"net/http"
	"os"
)

func Middleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		req := c.Request()
		headers := req.Header

		xid := headers.Get("xid")
		if xid != "" {
			exid, err := b64.StdEncoding.DecodeString(xid)
			if string(exid) == os.Getenv("API_KEY") && err == nil{
				return next(c)
			}
		}

		res := helper.Response{
			Data: nil,
			Meta: helper.Meta{
				Status: "ok",
				Message: "OK",
			},
		}

		return c.JSON(http.StatusOK, res)

	}
}

func main() {
	e := echo.New()
	v1 := e.Group("/api/v1")
	v1.Use(Middleware)
	v1.GET("/methods", persistance.GetCalculateMethodList)
	v1.GET("/locations", persistance.GetLocationList)

	e.Logger.Fatal(e.Start(":1323"))
}