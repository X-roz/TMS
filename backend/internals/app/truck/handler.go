package truck

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"truck-management-service/internals/model"
	"truck-management-service/util/response"

	"github.com/labstack/echo/v4"
	logger "github.com/sirupsen/logrus"
)

type handler struct {
	service Service
}

func NewHandler() *handler {
	return &handler{NewService()}
}

func (h *handler) AddTruckDetails(c echo.Context) error {

	logger.Info("[AddTruckDetails]", "Adding truck details started")

	userId := c.Request().Context().Value("UserId").(string)
	if userId == "" {
		logger.Error("[AddTruckDetails]", "Invalid User ID")
		return response.RespErr(c, "Invalid User ID", errors.New("invalid User ID"))
	}
	td := new(model.Truckdetails)

	// get the truck details from the document file and store in td struct
	f, err := c.FormFile("truckdetailsdoc")
	//docbyte, err := ioutil.ReadFile("./testdata/truckdetails.json")
	if err != nil {
		logger.Error("[AddTruckDetails]", "Error in reading details :", err)
		return response.RespErr(c, "Error in reading details", err)
	}
	fileSorce, _ := f.Open()
	docbyte, _ := ioutil.ReadAll(fileSorce)
	json.Unmarshal(docbyte, td)
	td.User_id = userId
	// verify the truck number. if exists error
	_, err = h.service.GetTD(td.TruckNo)
	if err == nil {
		logger.Error("[AddTruckDetails]", "Truck Number already exists :", fmt.Errorf("please provide the valid truck no"))
		return response.RespErr(c, "Truck Number already exists. Please provide the valid number", fmt.Errorf("please provide the valid truck no"))
	}

	// Upload the files in the google drive and get the file location details
	FileDetails, err := FileUpload(c, td.TruckNo)
	if err != nil {
		logger.Error("[AddTruckDetails]", "Error in Uploading files :", err)
		return response.RespErr(c, "Error in Uploading files", err)
	}
	filebytes, _ := json.Marshal(FileDetails)
	json.Unmarshal(filebytes, td)

	logger.Info("[AddTruckDetails]", "Started storing values in db")
	// save the truck details in the DB
	err = h.service.AddTD(td)
	if err != nil {
		logger.Error("[AddTruckDetails]", "Error in Adding truck details :", err)
		return response.RespErr(c, "Error in Adding truck details", err)
	}
	logger.Info("[AddTruckDetails]", "Successfully truck details added")
	return response.RespSuccess(c, "Truck details Successfully added")
}

func (h *handler) GetTruckDetails(c echo.Context) error {

	truckno := c.QueryParam("truck_no")
	logger.Info("[GetTruckDetails]", "started fetching details of "+truckno)
	td, err := h.service.GetTD(truckno)
	if err != nil {
		logger.Error("[GetTruckDetails]", "Error in Fetching truck details :", err)
		return response.RespErr(c, "Error in Fetching truck details", err)
	}
	logger.Info("[GetTruckDetails]", "Successfully fetched details of "+truckno)
	return response.RespSuccessInfo(c, "Truck Details Fetched successfully", *td)
}
