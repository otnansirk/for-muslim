package main

import (
	"github.com/otnansirk/for-muslim/persistance"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/", persistance.GetList)

	e.Logger.Fatal(e.Start(":1323"))
}