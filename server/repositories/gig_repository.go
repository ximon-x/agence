package repositories

import (
	"github.com/ximon-x/agence/models"
	"gorm.io/gorm"
)

type GigRepository interface {
	SaveGig(gig *models.Gig) (*models.Gig, error)
	FindGigById(id string) (*models.Gig, error)
	FindGigByStatus(status string) (*models.Gig, error)
	FindAllGigs() (*[]models.Gig, error)
}

type gigRepository struct {
	db *gorm.DB
}

func NewGigRepository(db *gorm.DB) GigRepository {
	return &gigRepository{db}
}

func (r *gigRepository) SaveGig(gig *models.Gig) (*models.Gig, error) {
	err := r.db.Create(&gig).Error
	if err != nil {
		return nil, err
	}

	return gig, nil
}

func (r *gigRepository) FindGigById(id string) (*models.Gig, error) {
	var gig models.Gig
	err := r.db.Where("id = ?", id).First(&gig).Error
	if err != nil {
		return nil, err
	}
	return &gig, nil
}

func (r *gigRepository) FindGigByStatus(status string) (*models.Gig, error) {
	var gig models.Gig
	err := r.db.Where("status = ?", status).First(&gig).Error
	if err != nil {
		return nil, err
	}
	return &gig, nil
}

func (r *gigRepository) FindAllGigs() (*[]models.Gig, error) {
	var gigs []models.Gig
	err := r.db.Find(&gigs).Error
	if err != nil {
		return nil, err
	}
	return &gigs, nil
}
