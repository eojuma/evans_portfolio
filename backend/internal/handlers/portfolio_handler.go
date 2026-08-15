package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type PortfolioProject struct {
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Tag         string   `json:"tag"`
	Description string   `json:"description"`
	Role        string   `json:"role"`
	Stack       []string `json:"stack"`
	Outcome     string   `json:"outcome"`
	Status      string   `json:"status"`
}

type PortfolioResponse struct {
	Name     string              `json:"name"`
	Role     string              `json:"role"`
	Location string              `json:"location"`
	Summary  string              `json:"summary"`
	Projects []PortfolioProject  `json:"projects"`
	Skills   map[string][]string `json:"skills"`
	Contact  map[string]string   `json:"contact"`
}

func GetPortfolio(c *gin.Context) {
	c.JSON(http.StatusOK, PortfolioResponse{
		Name: "Evans Juma", Role: "Backend Software Engineer", Location: "Kisumu, Kenya",
		Summary: "I build maintainable backend systems, integrate AI services, and debug unfamiliar codebases down to their root causes.",
		Projects: []PortfolioProject{
			{Slug: "skillmatch", Title: "SkillMatch", Tag: "AI job matching", Description: "Agentic-memory job-matching platform built for the CockroachDB AI Hackathon.", Role: "Infrastructure and AWS integration on a 5-engineer team", Stack: []string{"Go", "CockroachDB", "AWS Bedrock", "AWS S3", "React"}, Outcome: "Built presigned resume storage and LLM matching, fixed data-model bugs, and refactored route registration.", Status: "Shipped"},
			{Slug: "business-os", Title: "Business OS", Tag: "AI for SMEs", Description: "Chat-first operating system for inventory, sales, and business records.", Role: "Backend engineer", Stack: []string{"Go", "Gin", "PostgreSQL", "Docker", "Next.js"}, Outcome: "Implemented authentication and authorization in a modular, containerized backend.", Status: "In progress"},
			{Slug: "african-vault", Title: "African Vault", Tag: "Fintech", Description: "Banking and payments platform with account management and transfers.", Role: "Solo engineer", Stack: []string{"Go", "SQLite", "JavaScript", "REST"}, Outcome: "Built phone-number payments, PDF and CSV statements, and ACID-compliant transaction flows.", Status: "Completed"},
			{Slug: "guidely", Title: "Guidely", Tag: "Production RAG", Description: "RAG application independently audited for reliability and security.", Role: "Solo auditor", Stack: []string{"FastAPI", "FAISS", "React", "Gemini"}, Outcome: "Resolved 8 production issues and migrated embeddings from OpenAI to Gemini.", Status: "Completed"},
			{Slug: "civicvote", Title: "CivicVote", Tag: "Civic technology", Description: "Civic engagement platform for participation and accountability.", Role: "Backend engineer on a team", Stack: []string{"Go", "JWT", "RBAC", "CRUD"}, Outcome: "Shipped authentication, role-based access, and core resource workflows.", Status: "Completed"},
			{Slug: "social-network", Title: "Social Network Platform", Tag: "Real-time systems", Description: "Zone01 team project with real-time conversations.", Role: "Backend engineer on a 4-person team", Stack: []string{"Go", "WebSockets", "SQLite"}, Outcome: "Implemented real-time chat and the supporting social graph.", Status: "Completed"},
			{Slug: "groupie-tracker", Title: "Groupie Tracker", Tag: "API integration", Description: "REST client that turns third-party APIs into a usable experience.", Role: "Solo engineer", Stack: []string{"Go", "REST", "HTTP"}, Outcome: "Integrated external endpoints with resilient client-side handling.", Status: "Completed"},
		},
		Skills: map[string][]string{
			"Languages":       {"Go", "Python", "JavaScript", "SQL"},
			"Backend":         {"REST APIs", "net/http", "Gin", "JWT", "RBAC", "Middleware", "WebSockets"},
			"Databases":       {"PostgreSQL", "SQLite", "Database design", "Migrations"},
			"Cloud & DevOps":  {"Docker", "Git", "GitHub", "Linux", "AWS Bedrock", "AWS S3"},
			"CS Fundamentals": {"Data structures and algorithms", "HTTP", "TCP/IP", "DNS", "TLS", "Concurrency"},
		},
		Contact: map[string]string{"email": "evansjuma1e@gmail.com", "phone": "+254 768 502 197", "github": "https://github.com/eojuma", "linkedin": "https://www.linkedin.com/in/Evans-Juma", "devto": "https://dev.to/juma_evans_34e389ef539266"},
	})
}
