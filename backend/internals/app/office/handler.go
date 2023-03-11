package office

import (
	"errors"
	"truck-management-service/internals/model"
	"truck-management-service/util/response"

	"github.com/labstack/echo/v4"
	logger "github.com/sirupsen/logrus"
)

type handler struct {
	service Service
}

func NewHandler() *handler {
	return &handler{NewService()}
}

func (h *handler) NewOffice(e echo.Context) error {

	userId := e.Request().Context().Value("UserId").(string)
	logger.Info("[NewOffice]", "user id :", userId)
	od := new(model.Office)
	e.Bind(od)
	if od.Name == "" {
		err := errors.New("request Body not found")
		logger.Error("[NewOffice]", "Error in adding new office :", err)
		return response.RespErr(e, "Office creation error", err)
	}
	od.UserId = userId

	err := h.service.AddNewOfficeDetails(od)
	if err != nil {
		logger.Error("[NewOffice]", "Error in adding new office :", err)
		return response.RespErr(e, "Office creation error", err)
	}

	logger.Info("[NewOffice]", "Office details added successfully")
	return response.RespSuccess(e, "Office details added successfully")

}

func (h *handler) GetAllOffice(e echo.Context) error {
	userId := e.Request().Context().Value("UserId").(string)
	logger.Info("[GetAllOffice]", "user id :", userId)
	od, err := h.service.OfficeDetails(userId)
	if err != nil {
		logger.Error("[GetAllOffice]", "Error in fetching office details :", err)
		return response.RespErr(e, "Office retrive error", err)
	}

	logger.Info("[GetAllOffice]", "Office details fetched successfully")
	return response.RespSuccessInfo(e, "Office details added successfully", od)
}
