package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ximon-x/agence/database"
	"github.com/ximon-x/agence/interfaces"
	"github.com/ximon-x/agence/models"
	"github.com/ximon-x/agence/repositories"
)

func GetUsersHandler(c *fiber.Ctx) error {
	userRepo := repositories.NewUserRepository(database.DB)

	users, err := userRepo.FindAllUsers()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
			"data":    nil,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Users retrieved successfully",
		"data":    users,
	})
}

func GetUserHandler(c *fiber.Ctx) error {
	id := c.Params("id")

	userRepo := repositories.NewUserRepository(database.DB)
	user, err := userRepo.FindUserById(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
			"data":    nil,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "User retrieved successfully",
		"data":    user,
	})
}

func PostUserHandler(c *fiber.Ctx) error {
	body := new(interfaces.CreateUserDTO)

	if err := c.BodyParser(body); err != nil {

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
			"data":    nil,
		})
	}

	if body.Role != "Ace" && body.Role != "Agency" && body.Role != "admin" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid role",
			"data":    nil,
		})
	}

	newUser := models.User{
		FirstName:           body.FirstName,
		LastName:            body.LastName,
		PhoneNumber:         body.PhoneNumber,
		EmailAddress:        body.EmailAddress,
		Role:                body.Role,
		Id:                  body.Id,
		MinHourlyRate:       body.MinHourlyRate,
		MaxHourlyRate:       body.MaxHourlyRate,
		PreferredBlockchain: body.PreferredBlockchain,
	}

	userRepo := repositories.NewUserRepository(database.DB)
	user, err := userRepo.SaveUser(&newUser)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
			"data":    nil,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":  "success",
		"message": "User created successfully",
		"data":    user,
	})
}
