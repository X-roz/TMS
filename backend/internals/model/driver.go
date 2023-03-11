package model

import "gorm.io/gorm"

type Driver struct {
	gorm.Model
	UserId        string
	Name          string
	PhoneNumber   string
	License       string
	Address       string
	AccountNumber string
	IfscCode      string
}
