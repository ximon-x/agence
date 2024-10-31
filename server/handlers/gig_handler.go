package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ximon-x/agence/database"
	"github.com/ximon-x/agence/interfaces"
	"github.com/ximon-x/agence/models"
	"github.com/ximon-x/agence/repositories"
)

func GetGigsHandler(c *fiber.Ctx) error {
	gigRepo := repositories.NewGigRepository(database.DB)

	gigs, err := gigRepo.FindAllGigs()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
			"data":    nil,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{

		"status":  "success",
		"message": "Gigs retrieved successfully",
		"data":    gigs,
	})
}

func GetGigHandler(c *fiber.Ctx) error {
	gigRepo := repositories.NewGigRepository(database.DB)

	gig, err := gigRepo.FindGigById(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
			"data":    nil,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Gig retrieved successfully",
		"data":    gig,
	})
}

func PostGigHandler(c *fiber.Ctx) error {
	body := new(interfaces.CreateGigDTO)

	if err := c.BodyParser(body); err != nil {

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
			"data":    nil,
		})
	}

	newGig := models.Gig{
		Title:         body.Title,
		Description:   body.Description,
		MinHourlyRate: body.MinHourlyRate,
		MaxHourlyRate: body.MaxHourlyRate,
		Agency:        body.Agency,
		Ace:           body.Ace,
		Status:        "Pending",
		Kind:          body.Kind,
		BindingAmount: body.BindingAmount,
	}

	gigRepo := repositories.NewGigRepository(database.DB)
	gig, err := gigRepo.SaveGig(&newGig)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
			"data":    nil,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":  "success",
		"message": "Gig created successfully",
		"data":    gig,
	})
}
