package repository

import (
	"time"
	"truck-management-service/db"
	"truck-management-service/internals/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type InvoiceDetails interface {
	CreateRecord(*model.Invoice) error
	RetrieveRecords(string, time.Time, time.Time) (*[]model.Invoice, error)
}

type invoicedetails struct {
	db *gorm.DB
}

func NewInvoiceDetails() *invoicedetails {
	return &invoicedetails{db.DbManager()}
}

func (conn *invoicedetails) CreateRecord(data *model.Invoice) error {
	return conn.db.Model(&model.Invoice{}).Create(data).Error
}

func (conn *invoicedetails) RetrieveRecords(userId string, sd time.Time, e time.Time) (*[]model.Invoice, error) {
	data := new([]model.Invoice)
	err := conn.db.Model(&model.Invoice{}).Where("user_id = ?", userId).Where("created_at between ? and ?", sd, e).Preload(clause.Associations).Find(data).Error
	return data, err
}
