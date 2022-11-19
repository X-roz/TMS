package user

import (
	"errors"
	"truck-management-service/internals/model"
	"truck-management-service/internals/repository"

	"golang.org/x/crypto/bcrypt"
)

type Service interface {
	NewUser(*model.User) error
	LoginUser(map[string]string) (*model.User, error)
	GetUD(string) (*model.User, error)
}

type service struct {
	userRepository repository.UserDetails
}

func NewService() *service {
	return &service{repository.NewUserDetails()}
}

func (s *service) NewUser(user *model.User) error {
	query := map[string]string{"email": user.Email}

	_, err := s.userRepository.FetchUser(query)
	if err == nil {
		return errors.New("already existing email")
	}

	pass, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(pass)

	err = s.userRepository.AddUser(user)
	return err
}

func (s *service) LoginUser(user map[string]string) (*model.User, error) {

	query := map[string]string{"email": user["email"]}
	u, err := s.userRepository.FetchUser(query)
	if err != nil {
		return u, errors.New("user not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(user["password"])); err != nil {
		return u, errors.New("invalid password")
	}
	return u, nil
}

func (s *service) GetUD(userId string) (*model.User, error) {
	query := map[string]string{"user_id": userId}
	u, err := s.userRepository.FetchUser(query)
	if err != nil {
		return u, errors.New("user id not found")
	}
	return u, nil
}
