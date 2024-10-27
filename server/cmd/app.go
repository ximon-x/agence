package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	app.Post("/", func(c *fiber.Ctx) error {
		m := c.Params("message")
		r := fmt.Sprintf("Hello %s", m)

		return c.SendString(r)
	})

	app.Listen(":3001")
}
