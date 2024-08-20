package invoice

import (
	"errors"
	"time"
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

func (h *handler) NewInvoice(e echo.Context) error {

	userId := e.Request().Context().Value("UserId").(string)
	if userId == "" {
		logger.Error("[NewInvoice]", "Invalid User ID")
		return response.RespErr(e, "Invalid User ID", errors.New("invalid User ID"))
	}

	data := new(model.Invoice)
	e.Bind(data)
	data.UserId = userId
	err := h.service.AddInvoice(data)
	if err != nil {
		logger.Error("[NewInvoice]", "Error in Adding office details :", err)
		return response.RespErr(e, "New Invoice adding error", err)
	}

	logger.Info("[NewInvoice]", "Invoice details added successfully")
	return response.RespSuccess(e, "Invoice details added successfully")
}

func (h *handler) GetInvoice(e echo.Context) error {

	userId := e.Request().Context().Value("UserId").(string)
	if userId == "" {
		logger.Error("[NewInvoice]", "Invalid User ID")
		return response.RespErr(e, "Invalid User ID", errors.New("invalid User ID"))
	}

	var startdate time.Time
	var enddate time.Time

	period := e.QueryParam("period")
	switch period {
	case "last-month":
		startdate = time.Now().AddDate(0, -1, 0)
		enddate = time.Now()
	case "last-week":
		startdate = time.Now().AddDate(0, 0, -7)
		enddate = time.Now()
	default:
		startdate = time.Now().AddDate(0, 0, -1)
		enddate = time.Now()
	}

	data, err := h.service.Invoice(userId, startdate, enddate)
	if err != nil {
		logger.Error("[NewInvoice]", "Error in retrieving office details :", err)
		return response.RespErr(e, "Invoice retrieving error", err)
	}

	logger.Info("[NewInvoice]", "Invoice details fetched successfully")
	return response.RespSuccessInfo(e, "Invoice details fetched successfully", data)

}
