package main

import (
	"log"

	"github.com/eojuma/evans_portfolio/backend/config"
	"github.com/eojuma/evans_portfolio/backend/internal/database"
	"github.com/eojuma/evans_portfolio/backend/internal/handlers"
	"github.com/eojuma/evans_portfolio/backend/internal/middleware"
	"github.com/eojuma/evans_portfolio/backend/internal/repositories"
	"github.com/eojuma/evans_portfolio/backend/internal/services"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()
	r := gin.Default()
	r.Use(middleware.CORSMiddleware(cfg.FrontendOrigin))

	r.GET("/", handlers.GetRoot)
	r.HEAD("/", handlers.GetRoot)
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "service": "evans-portfolio-api"})
	})
	r.GET("/api/portfolio", handlers.GetPortfolio)
	r.GET("/api/status", handlers.NewStatusHandler("data/status.json").GetStatus)

	if db, err := database.ConnectDB(cfg.MongoURI, cfg.DBName); err != nil {
		log.Printf("MongoDB unavailable; project administration routes disabled: %v", err)
	} else {
		projectRepo := repositories.NewProjectRepository(db.Database)
		projectService := services.NewProjectService(projectRepo)
		projectHandler := handlers.NewProjectHandler(projectService)
		r.GET("/api/projects", projectHandler.GetProjects)
		r.POST("/api/projects", projectHandler.CreateProject)
	}

	log.Printf("Server starting on port :%s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
