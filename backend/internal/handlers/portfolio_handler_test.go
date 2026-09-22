package handlers

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestGetPortfolio(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	router.GET("/api/portfolio", GetPortfolio)

	request := httptest.NewRequest(http.MethodGet, "/api/portfolio", nil)
	response := httptest.NewRecorder()
	router.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Fatalf("expected status %d, got %d", http.StatusOK, response.Code)
	}

	var portfolio PortfolioResponse
	if err := json.Unmarshal(response.Body.Bytes(), &portfolio); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if portfolio.Name != "Evans Juma" {
		t.Fatalf("expected Evans Juma, got %q", portfolio.Name)
	}
	if len(portfolio.Projects) != 6 {
		t.Fatalf("expected 6 projects, got %d", len(portfolio.Projects))
	}
	if portfolio.Contact["email"] != "evansjuma1e@gmail.com" {
		t.Fatalf("unexpected contact email %q", portfolio.Contact["email"])
	}
}
