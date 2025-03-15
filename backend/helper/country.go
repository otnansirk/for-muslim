package helper

import (
	"errors"
)

func GetCountryByCode(code string) (string, error) {
	var data, err = ReadJSON[map[string]string]("data/country.json")
	if err != nil {
		return "", err
	}
	country, exists := data[code]
	if !exists {
		return "", errors.New("country code not found")
	}

	return country, nil
}