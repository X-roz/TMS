package truck

import (
	"truck-management-service/internals/model"
	"truck-management-service/internals/repository"
)

type Service interface {
	AddTD(*model.Truckdetails) error
	GetTD(string) (*model.Truckdetails, error)
}

type service struct {
	truckrepository repository.TruckDetails
}

func NewService() *service {
	return &service{repository.NewTruckdetails()}
}

func (s *service) AddTD(td *model.Truckdetails) error {
	return s.truckrepository.AddTruckDetails(td)
}

func (s *service) GetTD(truckno string) (*model.Truckdetails, error) {
	var query = map[string]interface{}{"truck_no": truckno}
	return s.truckrepository.GetTruckDetailsByTruckNo(query)
}
