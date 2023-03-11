package user

import (
	"truck-management-service/internals/model"
	"truck-management-service/util/auth"
	"truck-management-service/util/response"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	logger "github.com/sirupsen/logrus"
)

type handler struct {
	service Service
}

func NewHandler() *handler {
	return &handler{NewService()}
}

func (h *handler) NewUser(e echo.Context) error {

	logger.Info("[NewUser]", "started adding new user")
	u := new(model.User)
	e.Bind(u)

	u.UserId = uuid.NewString()

	token := auth.GenerateAuth(u.UserId)
	logger.Info("[LoginUser]", "Access Token :", token)
	err := h.service.NewUser(u)
	if err != nil {
		logger.Error("[NewUser]", "Error in adding new user :", err)
		return response.RespErr(e, "Error in adding new user", err)
	}
	logger.Info("[NewUser]", "added new user successfully")
	return response.RespSuccessInfo(e, "New User added Successfully", map[string]string{"access_token": token, "user_id": u.UserId})
}

func (h *handler) LoginUser(e echo.Context) error {
	var u map[string]string
	e.Bind(&u)
	user, err := h.service.LoginUser(u)
	if err != nil {
		logger.Error("[LoginUser]", "login error :", err)
		return response.RespErr(e, "login error", err)
	}

	logger.Info("[LoginUser]", "user logged in successfully :", user.UserId)
	token := auth.GenerateAuth(user.UserId)
	logger.Info("[LoginUser]", "Access Token :", token)
	return response.RespSuccessInfo(e, "logged in successfully", map[string]string{"access_token": token, "user_id": user.UserId})
}

func (h *handler) GetUserDetails(e echo.Context) error {

	userId := e.Request().Context().Value("UserId").(string)
	logger.Info("[GetUserDetails]", "user id :", userId)

	ud, err := h.service.GetUD(userId)
	if err != nil {
		logger.Error("[GetUserDetails]", "fetching user details error :", err)
		return response.RespErr(e, "fetching user details error", err)
	}
	return response.RespSuccessInfo(e, "user details fetched successfully", ud)
}
