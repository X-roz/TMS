package invoice

type Service interface{}

type service struct {
}

func NewService() *service {
	return &service{}
}
