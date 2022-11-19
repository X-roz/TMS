package repository

import (
	"truck-management-service/db"
	"truck-management-service/internals/model"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type UserDetails interface {
	AddUser(*model.User) error
	FetchUser(interface{}) (*model.User, error)
}

type userdetails struct {
	db *gorm.DB
}

func NewUserDetails() *userdetails {
	return &userdetails{db.DbManager()}
}

func (conn *userdetails) AddUser(user *model.User) error {
	err := conn.db.Model(&model.User{}).Create(user).Error
	return err
}

func (conn *userdetails) FetchUser(query interface{}) (*model.User, error) {
	var user model.User
	err := conn.db.Model(&model.User{}).Preload(clause.Associations).Where(query).First(&user).Error
	return &user, err
}
