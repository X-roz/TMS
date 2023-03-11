package driver

import (
	"encoding/json"
	"io/ioutil"
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

func (h *handler) NewDriver(e echo.Context) error {

	userId := e.Request().Context().Value("UserId").(string)
	logger.Info("[NewDriver]", "user id :", userId)

	dd := new(model.Driver)

	f, err := e.FormFile("driverdetailsdoc")
	if err != nil {
		logger.Error("[NewDriver]", "Error in reading details :", err)
		return response.RespErr(e, "Error in reading details", err)
	}
	fileSorce, _ := f.Open()
	docbyte, _ := ioutil.ReadAll(fileSorce)
	json.Unmarshal(docbyte, dd)
	dd.UserId = userId

	fileId, err := FileUpload(e, dd.Name)
	if err != nil {
		logger.Error("[NewDriver]", "Error in adding new driver :", err)
		return response.RespErr(e, "Driver creation error", err)
	}

	dd.License = fileId
	err = h.service.NewDriver(dd)
	if err != nil {
		logger.Error("[NewDriver]", "Error in adding new driver :", err)
		return response.RespErr(e, "Driver creation error", err)
	}
	logger.Info("[NewDriver]", "Driver details added successfully")
	return response.RespSuccess(e, "Driver Created Successfully")
}

func (h *handler) Drivers(e echo.Context) error {

	userId := e.Request().Context().Value("UserId").(string)
	logger.Info("[Drivers]", "user id :", userId)
	dd, err := h.service.GetDrivers(userId)
	if err != nil {
		logger.Error("[Drivers]", "Error in fetching Driver details :", err)
		return response.RespErr(e, "Driver retrive error", err)
	}
	logger.Info("[Drivers]", "Driver details fetched successfully")
	return response.RespSuccessInfo(e, "Driver  Successfully", dd)
}
