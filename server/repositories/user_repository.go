package repositories

import (
	"errors"

	"github.com/ximon-x/agence/models"
	"gorm.io/gorm"
)

type UserRepository interface {
	SaveUser(user *models.User) (*models.User, error)
	FindUserById(id string) (*models.User, error)
	FindUserByEmail(email string) (*models.User, error)
	FindAllUsers() (*[]models.User, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db}
}

func (r *userRepository) SaveUser(user *models.User) (*models.User, error) {
	err := r.db.Create(&user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userRepository) FindUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email_address = ?", email).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("user not found")
	}

	return &user, nil
}

func (r *userRepository) FindAllUsers() (*[]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error

	if err != nil {
		return nil, err
	}

	return &users, nil
}

func (r *userRepository) FindUserById(id string) (*models.User, error) {
	var user models.User
	err := r.db.Where("id = ?", id).First(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}
