package driver

import (
	"truck-management-service/internals/model"
	"truck-management-service/internals/repository"
)

type Service interface {
	NewDriver(*model.Driver) error
	GetDrivers(string) (*[]model.Driver, error)
}

type service struct {
	driverRepository repository.DriverDetails
}

func NewService() *service {
	return &service{repository.NewDriverDetails()}
}

func (s *service) NewDriver(dd *model.Driver) error {
	return s.driverRepository.NewDriver(dd)
}

func (s *service) GetDrivers(userid string) (*[]model.Driver, error) {
	query := map[string]string{"user_id": userid}
	return s.driverRepository.GetAllDriverByUserID(query)
}
