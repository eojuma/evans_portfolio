package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port           string
	MongoURI       string
	DBName         string
	FrontendOrigin string
}

func LoadConfig() *Config {
	// Render and other hosts inject environment variables directly; .env is optional.
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	dbName := os.Getenv("DB_NAME")
	if dbName == "" {
		dbName = "evans_portfolio"
	}
	frontendOrigin := os.Getenv("FRONTEND_ORIGIN")

	return &Config{
		Port:           port,
		MongoURI:       mongoURI,
		DBName:         dbName,
		FrontendOrigin: frontendOrigin,
	}
}
