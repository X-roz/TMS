package repository

import (
	"truck-management-service/db"
	"truck-management-service/internals/model"

	"gorm.io/gorm"
)

type OfficeDetails interface {
	AddOfficeDetails(*model.Office) error
	GetAllOfficeDetails(interface{}) (*[]model.Office, error)
}

type officedetails struct {
	db *gorm.DB
}

func NewOfficeDetails() *officedetails {
	return &officedetails{db.DbManager()}
}

func (conn *officedetails) AddOfficeDetails(od *model.Office) error {
	err := conn.db.Model(&model.Office{}).Create(od).Error
	return err
}

func (conn *officedetails) GetAllOfficeDetails(query interface{}) (*[]model.Office, error) {
	var od []model.Office
	err := conn.db.Model(&model.Office{}).Where(query).Find(&od).Error
	return &od, err
}
