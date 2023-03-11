package office

import (
	"truck-management-service/util/auth"

	"github.com/labstack/echo/v4"
)

func (h *handler) Route(g *echo.Group) {

	g.POST("/add-office", h.NewOffice, auth.VerifyToken)

	g.GET("/", h.GetAllOffice, auth.VerifyToken)
}
