package truck

import (
	"truck-management-service/util/auth"

	"github.com/labstack/echo/v4"
)

func (h *handler) Route(g *echo.Group) {

	g.POST("/add-truck-details", h.AddTruckDetails, auth.VerifyToken)
	g.GET("/get-truck-details", h.GetTruckDetails, auth.VerifyToken)
	g.GET("/get-file-view-link", h.GetFileLink, auth.VerifyToken)

}
