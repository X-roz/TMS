package db

import (
	"flag"
	"fmt"
	"log"
	"os"
	"truck-management-service/internals/model"

	logger "github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB
var err error

func ConnectToDb() {
	var (
		DB_TZ      string = os.Getenv("DB_TZ")
		DB_HOST    string = os.Getenv("DB_HOST")
		DB_USER    string = os.Getenv("DB_USER")
		DB_PASS    string = os.Getenv("DB_PASS")
		DB_NAME    string = os.Getenv("DB_NAME")
		DB_PORT    string = os.Getenv("DB_PORT")
		DB_SSLMODE string = os.Getenv("DB_SSLMODE")
	)

	Db_Uri := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s", DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_SSLMODE, DB_TZ)
	Db, err = gorm.Open(postgres.Open(Db_Uri), &gorm.Config{})
	if err != nil {
		logger.Error("failed to connect DB :", err)
		log.Fatal()
	}
	logger.Info("[ConnectToDb]", "Connected successfully")

	migrateflag := flag.Bool("migrate", true, "Select the migrateDb is need to happen or not")
	flag.Parse()
	if *migrateflag {
		Db.AutoMigrate(&model.Truckdetails{})
		Db.AutoMigrate(&model.User{})
		Db.AutoMigrate(&model.Office{})
		Db.AutoMigrate(&model.Driver{})
	}
}

func DbManager() *gorm.DB {
	return Db
}
