package user

import (
	"truck-management-service/util/auth"

	"github.com/labstack/echo/v4"
)

func (h *handler) Route(g *echo.Group) {

	g.POST("/add-user", h.NewUser)

	g.POST("/login", h.LoginUser)

	g.GET("/user-details", h.GetUserDetails, auth.VerifyToken)

}
