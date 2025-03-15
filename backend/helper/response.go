package helper

type Meta struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

// Struct untuk response utama
type Response struct {
	Data 	interface{} `json:"data,omitempty"`
	Errors 	interface{} `json:"errors,omitempty"`
	Meta 	Meta        `json:"meta"`
}