package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to the Evans Portfolio API",
		})
	})
	log.Println("Starting Evans Portfolio on :8080")

	if err := router.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
