package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/eojuma/evans_portfolio/backend/internal/models"
	"github.com/eojuma/evans_portfolio/backend/internal/services"
)

type ProjectHandler struct {
	service services.ProjectService
}

func NewProjectHandler(service services.ProjectService) *ProjectHandler {
	return &ProjectHandler{service: service}
}

func (h *ProjectHandler) GetProjects(c *gin.Context) {
	projects, err := h.service.GetProjects(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	c.JSON(http.StatusOK, projects)
}

func (h *ProjectHandler) CreateProject(c *gin.Context) {
	var project models.Project
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.CreateProject(c.Request.Context(), &project); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create project"})
		return
	}

	c.JSON(http.StatusCreated, project)
}
