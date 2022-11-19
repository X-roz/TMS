package model

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserId       string `gorm:"unique"`
	Name         string
	Email        string
	PhoneNumber  string
	Password     string
	TruckDetails []Truckdetails `gorm:"foreignKey:User_id; references:UserId"`
}
