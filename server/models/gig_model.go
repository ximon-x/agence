package models

import (
	"gorm.io/gorm"
)

type Gig struct {
	gorm.Model
	Title         string  `json:"title"`
	Description   string  `json:"description"`
	MinHourlyRate int     `json:"minHourlyRate"`
	MaxHourlyRate int     `json:"maxHourlyRate"`
	Agency        string  `json:"agency"`
	Ace           *string `json:"ace"`
	Status        string  `json:"status"`
	Kind          string  `json:"kind"`
	BindingAmount int64   `json:"bindingAmount"`
}
