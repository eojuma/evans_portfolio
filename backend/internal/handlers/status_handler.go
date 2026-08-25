package handlers

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type StatusHandler struct{ path string }

func NewStatusHandler(path string) *StatusHandler { return &StatusHandler{path: path} }

func (h *StatusHandler) GetStatus(c *gin.Context) {
	data, err := os.ReadFile(h.path)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "status unavailable"})
		return
	}
	var status struct {
		Engineer          string   `json:"engineer"`
		Location          string   `json:"location"`
		Focus             []string `json:"focus"`
		Availability      bool     `json:"availability"`
		CurrentlyBuilding struct {
			Name        string `json:"name"`
			Description string `json:"description"`
		} `json:"currently_building"`
		UpdatedAt string `json:"updated_at"`
	}
	if err := json.Unmarshal(data, &status); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "invalid status"})
		return
	}
	c.JSON(http.StatusOK, status)
}
