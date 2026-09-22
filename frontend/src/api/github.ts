export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  company: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

export interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
}

const API = "https://api.github.com";
const CACHE_PREFIX = "ej-github:";
const CACHE_TTL = 1000 * 60 * 30;

const readCache = (username: string): GitHubData | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + username);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; data: GitHubData };
    if (Date.now() - parsed.at > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const writeCache = (username: string, data: GitHubData) => {
  try {
    sessionStorage.setItem(
      CACHE_PREFIX + username,
      JSON.stringify({ at: Date.now(), data }),
    );
  } catch {
    // Storage may be unavailable (private mode); caching is best-effort.
  }
};

export const getGitHubData = async (username: string): Promise<GitHubData> => {
  const cached = readCache(username);
  if (cached) return cached;

  const headers = { Accept: "application/vnd.github+json" };
  const [profileResponse, reposResponse] = await Promise.all([
    fetch(`${API}/users/${username}`, { headers }),
    fetch(`${API}/users/${username}/repos?per_page=100&sort=pushed`, { headers }),
  ]);

  if (!profileResponse.ok || !reposResponse.ok) {
    throw new Error("GitHub API request failed");
  }

  const profile = (await profileResponse.json()) as GitHubProfile;
  const repos = (await reposResponse.json()) as GitHubRepo[];
  const data = { profile, repos };
  writeCache(username, data);
  return data;
};

export const LANGUAGE_COLORS: Record<string, string> = {
  Go: "#00ADD8",
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Vue: "#41b883",
  Java: "#b07219",
  Ruby: "#701516",
  "C#": "#178600",
};

export const languageColor = (language: string | null): string =>
  (language && LANGUAGE_COLORS[language]) || "#7be5a6";

export const selectFeaturedRepos = (repos: GitHubRepo[], limit = 6): GitHubRepo[] =>
  repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => {
      const described = Number(Boolean(b.description)) - Number(Boolean(a.description));
      if (described !== 0) return described;
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    })
    .slice(0, limit);

export const formatRelativeTime = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const day = 1000 * 60 * 60 * 24;
  if (diff < day) return "today";
  const days = Math.floor(diff / day);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};
