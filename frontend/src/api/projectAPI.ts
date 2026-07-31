import type { Project } from "../types/project";

const API_BASE_URL = "http://localhost:8080/api";

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects from backend");
  }
  return response.json();
};