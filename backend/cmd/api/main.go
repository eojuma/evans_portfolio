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

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(24)
			return
		}

		c.Next()
	}
}

func main() {
	// 1. Load config
	cfg := config.LoadConfig()

	// 2. Connect to MongoDB
	db, err := database.ConnectDB(cfg.MongoURI, cfg.DBName)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// 3. Initialize layers (Dependency Injection)
	projectRepo := repositories.NewProjectRepository(db.Database)
	projectService := services.NewProjectService(projectRepo)
	projectHandler := handlers.NewProjectHandler(projectService)

	// 4. Setup Gin Server
	r := gin.Default()

	// Attach CORS middleware
	r.Use(middleware.CORSMiddleware())

	// 5. Basic Health Endpoint
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "message": "API running smoothly"})
	})

	// 6. Project Routes
	api := r.Group("/api")
	{
		api.GET("/projects", projectHandler.GetProjects)
		api.POST("/projects", projectHandler.CreateProject)
	}

	// 7. Start Server
	log.Printf("Server starting on port :%s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
