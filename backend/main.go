package main

import (
	"flag"
	"truck-management-service/db"
	"truck-management-service/internals/route"
	"truck-management-service/util"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	logger "github.com/sirupsen/logrus"
)

func init() {
	Env := flag.String("env", ".env", "select the environment file variables")
	util.Load(*Env)
}
func main() {
	e := echo.New()
	// Enable Cross Origin request
	e.Use(middleware.CORS())
	logger.SetFormatter(&logger.TextFormatter{
		ForceColors:   true,
		FullTimestamp: true,
	})
	logger.Info("Application Starts ... ")
	db.ConnectToDb()

	route.Init(e.Group("/tms"))
	e.Start(":9000")
}
