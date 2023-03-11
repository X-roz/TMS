package office

import (
	"truck-management-service/internals/model"
	"truck-management-service/internals/repository"
)

type Service interface {
	AddNewOfficeDetails(*model.Office) error
	OfficeDetails(string) (*[]model.Office, error)
}

type service struct {
	officeRepository repository.OfficeDetails
}

func NewService() *service {
	return &service{repository.NewOfficeDetails()}
}

func (s *service) AddNewOfficeDetails(od *model.Office) error {
	return s.officeRepository.AddOfficeDetails(od)
}

func (s *service) OfficeDetails(userid string) (*[]model.Office, error) {
	query := map[string]string{"user_id": userid}
	return s.officeRepository.GetAllOfficeDetails(query)
}
