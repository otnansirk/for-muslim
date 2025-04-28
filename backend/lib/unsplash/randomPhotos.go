package unsplash

import (
	"github.com/labstack/echo/v4"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"fmt"
	"os"
)


type RandomPhotosRequest struct {
	Collections  string `json:"collections"`
	Count    	 string `json:"count"`
}

func RandomPhotos(c echo.Context, req RandomPhotosRequest) ([]RandomPhotosResponse, error) {

	baseUrl := os.Getenv("UNSPLASH_BASEURL") + "/photos/random"
	u, err := url.Parse(baseUrl)
	var RandomPhotos []RandomPhotosResponse

	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return RandomPhotos, err
	}

	query := u.Query()
	if req.Collections != "" {
		query.Set("collections", req.Collections)
	}

	query.Set("count", func() string {
		if req.Count != "" {
			return req.Count
		}
		return "2"
	}())

	u.RawQuery = query.Encode() 


	client := &http.Client{}
	request, err := http.NewRequest("GET", u.String(), nil)
	if err != nil {
		return RandomPhotos, err
	}
	request.Header.Set("Authorization", "Client-ID " + os.Getenv("UNSPLASH_API_KEY"))
	resp, err := client.Do(request)
	
	if err != nil {
		return RandomPhotos, err
	}
	
	defer resp.Body.Close() 
	
	body, _ := ioutil.ReadAll(resp.Body)
	err = json.Unmarshal(body, &RandomPhotos)
	fmt.Println("Response Status:", resp.Status)
	if err != nil {
		return RandomPhotos, err
	}

	return RandomPhotos, nil
}