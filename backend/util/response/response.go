package response

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type SuccessResponse struct {
	Success bool
	Message string
}

type SuccessInfoResponse struct {
	Success bool
	Message string
	Data    interface{}
}

type ErrorResponse struct {
	Success bool
	Message string
	ErrData string
}

func RespSuccess(c echo.Context, message string) error {
	var response = &SuccessResponse{
		Success: true,
		Message: message,
	}
	return c.JSON(http.StatusOK, response)
}

func RespSuccessInfo(c echo.Context, message string, data interface{}) error {
	var response = &SuccessInfoResponse{
		Success: true,
		Message: message,
		Data:    data,
	}
	return c.JSON(http.StatusOK, response)
}

func RespErr(c echo.Context, message string, errData error) error {
	var response = &ErrorResponse{
		Success: false,
		Message: message,
		ErrData: errData.Error(),
	}
	return c.JSON(http.StatusOK, response)
}
