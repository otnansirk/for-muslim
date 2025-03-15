package helper

import (
	"encoding/json"
	"io/ioutil"
	"fmt"
	"os"
)

func ReadJSON[T any](path string) (T, error) {
	var data T
	jsonFile, err := os.Open(path)
	
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened users.json")
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return data, err
	}

	err = json.Unmarshal(byteValue, &data)
	if err != nil {
		return data, err
	}

	return data, nil
}