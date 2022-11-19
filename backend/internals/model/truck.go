package model

import "gorm.io/gorm"

type Truckdetails struct {
	gorm.Model
	User_id        string
	TruckNo        string `json:"truck_no"`
	EngineNo       string `json:"engine_no"`
	TrDeliveryDate string `json:"truck_delivery_date"`
	FcDate         string `json:"fc_date"`
	InsuranceDate  string `json:"insurance_date"`
	EmiDate        string `json:"emi_date"`
	EmiAmount      string `json:"emi_amount"`
	EmiDuration    string `json:"emi_duration"`
	TruckRc        string
	Insurance      string
	TruckImg       string
	NpTax          string
	QuaterTax      string
}
