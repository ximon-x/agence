package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id                  string `json:"id"`
	FirstName           string `json:"firstName"`
	LastName            string `json:"lastName"`
	PhoneNumber         string `json:"phoneNumber"`
	EmailAddress        string `json:"emailAddress"`
	Role                string `json:"role"`
	MinHourlyRate       int    `json:"minHourlyRate"`
	MaxHourlyRate       int    `json:"maxHourlyRate"`
	PreferredBlockchain string `json:"preferredBlockchain"`
}
