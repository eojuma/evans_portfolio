package models

import "go.mongodb.org/mongo-driver/v2/bson"

type Project struct {
	ID          bson.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string        `bson:"title" json:"title" binding:"required"`
	Description string        `bson:"description" json:"description" binding:"required"`
	TechStack   []string      `bson:"tech_stack" json:"tech_stack"`
	GithubURL   string        `bson:"github_url" json:"github_url"`
	LiveURL     string        `bson:"live_url" json:"live_url"`
	Featured    bool          `bson:"featured" json:"featured"`
}
