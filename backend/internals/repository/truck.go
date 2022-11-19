package repository

import (
	"truck-management-service/db"
	"truck-management-service/internals/model"

	"gorm.io/gorm"
)

type TruckDetails interface {
	AddTruckDetails(*model.Truckdetails) error
	GetTruckDetailsByTruckNo(interface{}) (*model.Truckdetails, error)
}

type truckdetails struct {
	db *gorm.DB
}

func NewTruckdetails() *truckdetails {
	return &truckdetails{db.DbManager()}
}

func (conn *truckdetails) AddTruckDetails(td *model.Truckdetails) error {
	err := conn.db.Model(&model.Truckdetails{}).Create(td).Error
	return err
}

func (conn *truckdetails) GetTruckDetailsByTruckNo(query interface{}) (*model.Truckdetails, error) {
	var td model.Truckdetails
	err := conn.db.Model(&model.Truckdetails{}).Where(query).First(&td).Error
	return &td, err
}
