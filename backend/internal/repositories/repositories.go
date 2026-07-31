package repositories

import (
	"context"

	"github.com/eojuma/evans_portfolio/backend/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type ProjectRepository interface {
	GetAll(ctx context.Context) ([]models.Project, error)
	Create(ctx context.Context, project *models.Project) error
}

type projectRepository struct {
	collection *mongo.Collection
}

func NewProjectRepository(db *mongo.Database) ProjectRepository {
	return &projectRepository{
		collection: db.Collection("projects"),
	}
}

func (r *projectRepository) GetAll(ctx context.Context) ([]models.Project, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var projects []models.Project
	if err := cursor.All(ctx, &projects); err != nil {
		return nil, err
	}

	return projects, nil
}

func (r *projectRepository) Create(ctx context.Context, project *models.Project) error {
	result, err := r.collection.InsertOne(ctx, project)
	if err != nil {
		return err
	}
	project.ID = result.InsertedID.(bson.ObjectID)
	return nil
}
