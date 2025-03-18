package main

import (
	"github.com/otnansirk/for-muslim/persistance"
	"github.com/otnansirk/for-muslim/helper"
	"github.com/labstack/echo/v4"
	b64 "encoding/base64"
	// "github.com/rs/cors"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
	"strings"
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
				Status: "ok.",
				Message: "OK",
			},
		}

		return c.JSON(http.StatusOK, res)

	}
}

// func CorsMiddleware() echo.MiddlewareFunc {
	
// 	allowedOrigin := strings.Split(os.Getenv("ALLOWED_ORIGIN"), ",")
// 	corsMiddleware := cors.New(cors.Options{
// 		AllowedOrigins: allowedOrigin,
// 		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
// 		AllowedHeaders: []string{"Content-Type", "xid"},
// 	})

// 	return echo.WrapMiddleware(corsMiddleware.Handler)
// }


func main() {

	e := echo.New()
	
	allowedOrigin := strings.Split(os.Getenv("ALLOWED_ORIGIN"), ",")
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: allowedOrigin,
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "xid"},
	}))

	v1 := e.Group("/api/v1")
	v1.Use(Middleware)
	v1.GET("/methods", persistance.GetCalculateMethodList)
	v1.GET("/locations", persistance.GetLocationList)
	v1.GET("/prayer-times", persistance.GetPrayerTime)
	v1.GET("/weathers", persistance.GetWeather)
	v1.GET("/weathers-accu", persistance.GetWeatherAccu)

	e.Logger.Fatal(e.Start(":1323"))
}