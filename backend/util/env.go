package util

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
)

func Load(filename string) {
	err := godotenv.Load(filename)
	if err != nil {
		fmt.Println("Load", err.Error())
		log.Panic("Error while loading env file")
	}
}
