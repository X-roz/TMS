package invoice

import (
	"truck-management-service/util/auth"

	"github.com/labstack/echo/v4"
)

func (h *handler) Route(g *echo.Group) {
	g.POST("/add-invoice", h.NewInvoice, auth.VerifyToken)
	g.GET("/get-invoice", h.GetInvoice, auth.VerifyToken)
}
