package repository

import (
	"truck-management-service/db"
	"truck-management-service/internals/model"

	"gorm.io/gorm"
)

type DriverDetails interface {
	NewDriver(*model.Driver) error
	GetAllDriverByUserID(interface{}) (*[]model.Driver, error)
}

type driverdetails struct {
	db *gorm.DB
}

func NewDriverDetails() *driverdetails {
	return &driverdetails{db.DbManager()}
}

func (conn *driverdetails) NewDriver(dd *model.Driver) error {
	return conn.db.Model(&model.Driver{}).Create(dd).Error
}

func (conn *driverdetails) GetAllDriverByUserID(query interface{}) (*[]model.Driver, error) {
	var dd []model.Driver
	err := conn.db.Model(&model.Driver{}).Where(query).Find(&dd).Error
	return &dd, err
}
