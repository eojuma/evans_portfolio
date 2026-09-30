import { useEffect, useState } from "react";
import { formatDevToDate, getDevToArticles, type DevToArticle } from "../api/devto";

export const Articles = () => {
  const [articles, setArticles] = useState<DevToArticle[] | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    getDevToArticles()
      .then((data) => {
        if (cancelled) return;
        setArticles(data);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const profileUrl = "https://dev.to/juma_evans_34e389ef539266";

  return (
    <div className="articles-showcase">
      {status === "loading" && (
        <div className="article-grid" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <article className="article-card skeleton" key={i} />
          ))}
        </div>
      )}

      {status === "ready" && articles && articles.length > 0 && (
        <div className="article-grid">
          {articles.map((article) => (
            <article className="article-card" key={article.id}>
              <h3>{article.title}</h3>
              <p className="article-desc">{article.description}</p>
              <div className="article-meta">
                <time dateTime={article.published_at}>{formatDevToDate(article.published_at)}</time>
                <div className="article-tags">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="article-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <a href={article.url} target="_blank" rel="noreferrer" className="article-link">
                Read on Dev.to ↗
              </a>
            </article>
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="articles-error">
          <p>Unable to load articles at the moment.</p>
          <a href={profileUrl} target="_blank" rel="noreferrer">
            Read on Dev.to ↗
          </a>
        </div>
      )}

      <p className="data-note">
        <span>+</span> View all articles on{" "}
        <a href={profileUrl} target="_blank" rel="noreferrer">
          Dev.to
        </a>
      </p>
    </div>
  );
};