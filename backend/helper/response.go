package helper

type Meta struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

// Struct untuk response utama
type Response struct {
	Data interface{} `json:"data"`
	Meta Meta        `json:"meta"`
}