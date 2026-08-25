package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware(allowedOrigin ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		configured := "http://localhost:5173"
		if len(allowedOrigin) > 0 && allowedOrigin[0] != "" {
			configured = allowedOrigin[0]
		}
		if envOrigin := os.Getenv("FRONTEND_ORIGIN"); envOrigin != "" {
			configured = envOrigin
		}
		if origin == configured || (configured == "http://localhost:5173" && strings.HasPrefix(origin, "http://localhost:")) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		}
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}
