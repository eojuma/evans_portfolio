package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetRoot(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"service": "evans-portfolio-api",
		"status":  "online",
		"endpoints": []string{
			"/api/health",
			"/api/portfolio",
			"/api/status",
		},
	})
}
