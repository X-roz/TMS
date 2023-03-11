package driver

import (
	"truck-management-service/util/auth"

	"github.com/labstack/echo/v4"
)

func (h *handler) Route(g *echo.Group) {

	g.POST("/add-driver", h.NewDriver, auth.VerifyToken)

	g.GET("/", h.Drivers, auth.VerifyToken)
}
