package model

import "gorm.io/gorm"

type Invoice struct {
	gorm.Model
	UserId          string
	TruckNo         string
	Load            string
	LoadingLocation string
	DestLocation    string
	OfficeId        int
	Office          Office `gorm:"foreignKey:OfficeId; references:ID"`
	Tons            float64
	AmountPerTons   float64
	TotalAmount     float64
	ReceivedAmount  float64
	DriverId        int
	Driver          Driver `gorm:"foreignKey:DriverId; references:ID"`
}
