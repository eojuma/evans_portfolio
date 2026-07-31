package services

import (
	"context"

	"github.com/eojuma/evans_portfolio/backend/internal/models"
	"github.com/eojuma/evans_portfolio/backend/internal/repositories"
)

type ProjectService interface {
	GetProjects(ctx context.Context) ([]models.Project, error)
	CreateProject(ctx context.Context, project *models.Project) error
}

type projectService struct {
	repo repositories.ProjectRepository
}

func NewProjectService(repo repositories.ProjectRepository) ProjectService {
	return &projectService{repo: repo}
}

func (s *projectService) GetProjects(ctx context.Context) ([]models.Project, error) {
	return s.repo.GetAll(ctx)
}

func (s *projectService) CreateProject(ctx context.Context, project *models.Project) error {
	// You can add logic here (e.g., domain checks, formatting)
	return s.repo.Create(ctx, project)
}