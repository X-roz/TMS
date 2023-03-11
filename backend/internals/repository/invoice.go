package repository

import (
	"truck-management-service/db"

	"gorm.io/gorm"
)

type InvoiceDetails interface{}

type invoicedetails struct {
	db *gorm.DB
}

func NewInvoiceDetails() *invoicedetails {
	return &invoicedetails{db.DbManager()}
}
