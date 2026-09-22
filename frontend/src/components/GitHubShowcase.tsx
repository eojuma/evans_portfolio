import { useEffect, useState } from "react";
import {
  formatRelativeTime,
  getGitHubData,
  languageColor,
  selectFeaturedRepos,
  type GitHubData,
} from "../api/github";

interface GitHubShowcaseProps {
  username: string;
}

export const GitHubShowcase = ({ username }: GitHubShowcaseProps) => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    getGitHubData(username)
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const profileUrl = `https://github.com/${username}`;
  const repos = data ? selectFeaturedRepos(data.repos) : [];
  const totalStars = data
    ? data.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    : 0;
  const languageCount = data
    ? new Set(data.repos.map((repo) => repo.language).filter(Boolean)).size
    : 0;

  return (
    <section className="gh-section">
      <div className="gh-head">
        <div>
          <p className="eyebrow">
            <span /> Open source
          </p>
          <h2>Code in the open.</h2>
          <p>
            Live from GitHub — repositories, languages, and activity pulled
            straight from <strong>@{username}</strong>.
          </p>
        </div>
        <a className="gh-profile" href={profileUrl} target="_blank" rel="noreferrer">
          @{username} ↗
        </a>
      </div>

      <div className="gh-stats">
        <div>
          <b>{status === "ready" ? data?.profile.public_repos ?? "—" : "—"}</b>
          <span>Public repos</span>
        </div>
        <div>
          <b>{status === "ready" ? data?.profile.followers ?? "—" : "—"}</b>
          <span>Followers</span>
        </div>
        <div>
          <b>{status === "ready" ? totalStars : "—"}</b>
          <span>Total stars</span>
        </div>
        <div>
          <b>{status === "ready" ? languageCount : "—"}</b>
          <span>Languages</span>
        </div>
      </div>

      {status === "loading" && (
        <div className="gh-repos" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="gh-repo skeleton" key={index} />
          ))}
        </div>
      )}

      {status === "ready" && repos.length > 0 && (
        <div className="gh-repos">
          {repos.map((repo) => (
            <article className="gh-repo" key={repo.id}>
              <div className="gh-repo-head">
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
                <span className="gh-stars">★ {repo.stargazers_count}</span>
              </div>
              <p>{repo.description ?? "No description yet."}</p>
              <div className="gh-meta">
                {repo.language && (
                  <span className="gh-lang">
                    <i style={{ background: languageColor(repo.language) }} />
                    {repo.language}
                  </span>
                )}
                <span>Updated {formatRelativeTime(repo.pushed_at)}</span>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noreferrer">
                    Live ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="gh-error">
          <p>Live GitHub data is unavailable right now.</p>
          <a href={profileUrl} target="_blank" rel="noreferrer">
            Browse repositories on GitHub ↗
          </a>
        </div>
      )}
    </section>
  );
};
