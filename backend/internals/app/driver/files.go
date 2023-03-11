package driver

import (
	"mime/multipart"
	"truck-management-service/util/gdrive"

	"github.com/labstack/echo/v4"
	logger "github.com/sirupsen/logrus"
	"google.golang.org/api/drive/v3"
)

func FileUpload(e echo.Context, Name string) (string, error) {

	client := gdrive.ServiceAccount("../secrets/client_secret.json")
	srv, err := drive.New(client)
	if err != nil {
		logger.Error("[FileUpload]", "Unable to retrieve drive Client :", err)
		return "", err
	}

	folderId := "1SRDxu48bksE0l9DnuFQRbOpc8pbGJXVr"
	f, err := e.FormFile("License")
	if err != nil {
		logger.Error("[FileUpload]", "Unable to retrieve license :", err)
		return "", err
	}

	fileSrv, _ := f.Open()

	fileId, err := CreateFile(srv, Name, fileSrv, folderId)
	if err != nil {
		logger.Error("[FileUpload]", "Error in uploading file ", err)
		return "", err
	}

	return fileId, nil
}

func CreateFile(srv *drive.Service, filename string, fileSrv multipart.File, folderId string) (string, error) {

	file, err := gdrive.CreateFile(srv, filename, "application/octet-stream", fileSrv, folderId)
	if err != nil {
		return "", err
	}

	return file.Id, nil
}
