package invoice

import (
	"time"
	"truck-management-service/internals/model"
	"truck-management-service/internals/repository"
)

type Service interface {
	AddInvoice(*model.Invoice) error
	Invoice(string, time.Time, time.Time) (*[]model.Invoice, error)
}

type service struct {
	invoiceRepository repository.InvoiceDetails
}

func NewService() *service {
	return &service{repository.NewInvoiceDetails()}
}

func (s *service) AddInvoice(data *model.Invoice) error {
	return s.invoiceRepository.CreateRecord(data)
}

func (s *service) Invoice(userId string, sd time.Time, e time.Time) (*[]model.Invoice, error) {
	return s.invoiceRepository.RetrieveRecords(userId, sd, e)
}
