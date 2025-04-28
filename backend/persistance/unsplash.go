package persistance

import (
	"github.com/otnansirk/for-muslim/helper"
	"github.com/otnansirk/for-muslim/lib/unsplash"
	"github.com/labstack/echo/v4"
	"net/http"
	"fmt"
)


type (
	UnsplashResponseType struct {
		Id       string   		  `json:"id"`
		Slug     string   		  `json:"slug"`
		Url      string   		  `json:"url"`
		Download string   		  `json:"download"`
		Exif     UnsplashExif     `json:"exif,omitempty"`
		Location UnsplashLocation `json:"location,omitempty"`
		User     UnsplashUser     `json:"user"`
	}

	UnsplashExif struct {
		Make         string `json:"make"`
		Model        string `json:"model"`
		Name         string `json:"name"`
		ExposureTime string `json:"exposure_time"`
		Aperture     string `json:"aperture"`
		FocalLength  string `json:"focal_length"`
		Iso          int    `json:"iso"`
	}

	UnsplashLocation struct {
		Name    string       `json:"name,omitempty"`
		City    *interface{} `json:"city,omitempty"`
		Country string       `json:"country,omitempty"`
	}

	UnsplashUser struct {
		Username string `json:"username"`
		Name     string `json:"name"`
		Url      string `json:"url"`
		Location string `json:"location"`
		Image    string `json:"image"`
	}
)


func GetRandomPhotos(c echo.Context) error {
	var req unsplash.RandomPhotosRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	collections := c.QueryParam("collections")
	count  		:= c.QueryParam("count")

	RandomPhotosReq := unsplash.RandomPhotosRequest{
		Collections: collections,
		Count: count,
	}

	randomPhotos, err := unsplash.RandomPhotos(c, RandomPhotosReq)
	if err != nil {
		fmt.Println("Error fetching random photos:", err)
		return c.JSON(http.StatusBadRequest, helper.Response{
			Meta: helper.Meta{
				Status: "bad_request",
				Message: "Failed get prayer time",
			},
		})
	}

	var randomPhotosRes []UnsplashResponseType

	for _, photos := range randomPhotos {
		randomPhotosRes = append(randomPhotosRes, UnsplashResponseType{
			Id: photos.Id,
			Slug: photos.Slug,
			Url: photos.Urls.Raw,
			Download: photos.Links.Download,
			Exif: UnsplashExif{
				Make         : photos.Exif.Make,
				Model        : photos.Exif.Model,
				Name         : photos.Exif.Name,
				ExposureTime : photos.Exif.ExposureTime,
				Aperture     : photos.Exif.Aperture,
				FocalLength  : photos.Exif.FocalLength,
				Iso          : photos.Exif.Iso,
			},
			Location: UnsplashLocation{
				Name    : photos.Location.Name,
				City    : photos.Location.City,
				Country : photos.Location.Country,
			},
			User: UnsplashUser{
				Username : photos.User.Username,
				Name     : photos.User.Name,
				Url      : photos.User.Links.Html,
				Location : photos.User.Location,
				Image    : photos.User.ProfileImage.Small,
			},
		})
	}


	res := helper.Response{
		Data: randomPhotosRes,
		Meta: helper.Meta{
			Status: "ok",
			Message: "OK",
		},
	}
	return c.JSON(http.StatusOK, res)
}