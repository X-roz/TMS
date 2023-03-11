package truck

import (
	"log"
	"mime/multipart"
	"truck-management-service/util/gdrive"

	"github.com/labstack/echo/v4"
	logger "github.com/sirupsen/logrus"
	"google.golang.org/api/drive/v3"
)

func FileUpload(c echo.Context, truckno string) (map[string]string, error) {

	logger.Info("[FileUpload]", "File upload started")
	client := gdrive.ServiceAccount("../secrets/client_secret.json")

	srv, err := drive.New(client)
	if err != nil {
		logger.Error("[FileUpload]", "Unable to retrieve drive Client :", err)
		log.Fatal()
	}

	folderId, er := CreateFolder(srv, truckno)
	if er != nil {
		logger.Error("[FileUpload]", "Error in creating folder :", er)
		return nil, er
	}

	var FileDetails = map[string]string{"TruckRc": "", "Insurance": "", "TruckImg": "", "NpTax": "", "QuaterTax": ""}

	for filename, filepath := range FileDetails {
		f, er := c.FormFile(filename)
		if er != nil {
			logger.Error("[FileUpload]", "Error in reading the file "+filename+" :", er)
			return nil, er
		}
		fileSrv, _ := f.Open()

		fileId, err := CreateFile(srv, filename, fileSrv, folderId)
		if err != nil {
			logger.Error("[FileUpload]", "Error in uploading file "+filename+" :", err)
			return nil, err
		}
		FileDetails[filename] = filepath + fileId
	}

	logger.Info("[FileUpload]", "Successfully Truck files are uploaded")

	return FileDetails, nil
}

func CreateFolder(srv *drive.Service, truckno string) (string, error) {
	dir, err := gdrive.CreateFolder(srv, truckno, "1CuGOkLQSlSRU3iJHXXgnCXYND-h9e6gF")
	if err != nil {
		return "", err
	}
	return dir.Id, nil
}

func CreateFile(srv *drive.Service, filename string, fileSrv multipart.File, folderId string) (string, error) {

	file, err := gdrive.CreateFile(srv, filename, "application/octet-stream", fileSrv, folderId)
	if err != nil {
		return "", err
	}

	return file.Id, nil
}

func GetFileViewLink(fileId string) (string, error) {

	client := gdrive.ServiceAccount("../secrets/client_secret.json")

	srv, err := drive.New(client)
	if err != nil {
		return "", err
	}

	link, err := gdrive.GetFileViewLink(srv, fileId)
	if err != nil {
		return "", err
	}
	return link, nil
}
