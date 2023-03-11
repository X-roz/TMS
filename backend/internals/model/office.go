package model

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Office struct {
	gorm.Model
	UserId  string
	Name    string
	Details datatypes.JSON
}
