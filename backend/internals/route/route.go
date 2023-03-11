package route

import (
	"truck-management-service/internals/app/driver"
	"truck-management-service/internals/app/office"
	"truck-management-service/internals/app/truck"
	"truck-management-service/internals/app/user"

	"github.com/labstack/echo/v4"
)

func Init(g *echo.Group) {
	user.NewHandler().Route(g.Group("/user"))
	truck.NewHandler().Route(g.Group("/truck"))
	office.NewHandler().Route(g.Group("/office"))
	driver.NewHandler().Route(g.Group("/driver"))
}
