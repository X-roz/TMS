package invoice

type handler struct {
	service Service
}

func NewHandler() *handler {
	return &handler{NewService()}
}
