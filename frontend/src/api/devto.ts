export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  slug: string;
  url: string;
  tags: string[];
  cover_image: string | null;
  social_image: string | null;
  readable_publish_date: string;
}

const API_URL = "https://dev.to/api/articles?username=juma_evans_34e389ef539266&per_page=6";
const CACHE_KEY = "ej-devto-articles";
const CACHE_TTL = 1000 * 60 * 30;

const readCache = (): DevToArticle[] | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; data: DevToArticle[] };
    if (Date.now() - parsed.at > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const writeCache = (data: DevToArticle[]) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // best effort
  }
};

const normalizeTags = (tags: string | string[] | undefined): string[] => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return tags.split(",").map((t) => t.trim()).filter(Boolean);
};

export const getDevToArticles = async (): Promise<DevToArticle[]> => {
  const cached = readCache();
  if (cached) return cached;

  const response = await fetch(API_URL, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Dev.to API request failed");
  }

  const data = (await response.json()) as DevToArticle[];
  const normalized = data.map((article) => ({
    ...article,
    tags: normalizeTags(article.tags),
  }));
  writeCache(normalized);
  return normalized;
};

export const formatDevToDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};