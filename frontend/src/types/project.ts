export interface Project {
  id?: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  featured: boolean;
}

// Dummy export so Vite/esbuild sees a real JavaScript object in the compiled output
export const Project = {};