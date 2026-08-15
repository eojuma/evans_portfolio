import { useCallback, useEffect, useState } from "react";

type Page = "home" | "about" | "skills" | "projects" | "contact";
type Project = { slug: string; title: string; tag: string; description: string; role: string; stack: string[]; outcome: string; status: string };
type Portfolio = { name: string; role: string; location: string; summary: string; projects: Project[]; skills: Record<string, string[]>; contact: Record<string, string> };

const fallback: Portfolio = {
  name: "Evans Juma", role: "Backend Software Engineer", location: "Kisumu, Kenya",
  summary: "I build maintainable backend systems, integrate AI services, and debug unfamiliar codebases down to their root causes.",
  projects: [
    { slug: "skillmatch", title: "SkillMatch", tag: "AI job matching", description: "Agentic-memory job-matching platform built for the CockroachDB AI Hackathon.", role: "Infrastructure and AWS integration on a 5-engineer team", stack: ["Go", "CockroachDB", "AWS Bedrock", "AWS S3", "React"], outcome: "Built presigned resume storage and LLM matching, fixed data-model bugs, and refactored route registration.", status: "Shipped" },
    { slug: "business-os", title: "Business OS", tag: "AI for SMEs", description: "Chat-first operating system for inventory, sales, and business records.", role: "Backend engineer", stack: ["Go", "Gin", "PostgreSQL", "Docker", "Next.js"], outcome: "Implemented authentication and authorization in a modular, containerized backend.", status: "In progress" },
    { slug: "african-vault", title: "African Vault", tag: "Fintech", description: "Banking and payments platform with account management and transfers.", role: "Solo engineer", stack: ["Go", "SQLite", "JavaScript", "REST"], outcome: "Built phone-number payments, PDF and CSV statements, and ACID-compliant transaction flows.", status: "Completed" },
    { slug: "guidely", title: "Guidely", tag: "Production RAG", description: "RAG application independently audited for reliability and security.", role: "Solo auditor", stack: ["FastAPI", "FAISS", "React", "Gemini"], outcome: "Resolved 8 production issues and migrated embeddings from OpenAI to Gemini.", status: "Completed" },
    { slug: "civicvote", title: "CivicVote", tag: "Civic technology", description: "Civic engagement platform for participation and accountability.", role: "Backend engineer on a team", stack: ["Go", "JWT", "RBAC", "CRUD"], outcome: "Shipped authentication, role-based access, and core resource workflows.", status: "Completed" },
    { slug: "social-network", title: "Social Network Platform", tag: "Real-time systems", description: "Zone01 team project with real-time conversations.", role: "Backend engineer on a 4-person team", stack: ["Go", "WebSockets", "SQLite"], outcome: "Implemented real-time chat and the supporting social graph.", status: "Completed" },
    { slug: "groupie-tracker", title: "Groupie Tracker", tag: "API integration", description: "REST client that turns third-party APIs into a usable experience.", role: "Solo engineer", stack: ["Go", "REST", "HTTP"], outcome: "Integrated external endpoints with resilient client-side handling.", status: "Completed" },
  ],
  skills: { Languages: ["Go", "Python", "JavaScript", "SQL"], Backend: ["REST APIs", "net/http", "Gin", "JWT", "RBAC", "Middleware", "WebSockets"], Databases: ["PostgreSQL", "SQLite", "Database design", "Migrations"], "Cloud & DevOps": ["Docker", "Git", "GitHub", "Linux", "AWS Bedrock", "AWS S3"], "CS Fundamentals": ["Data structures and algorithms", "HTTP", "TCP/IP", "DNS", "TLS", "Concurrency"] },
  contact: { email: "evansjuma1e@gmail.com", phone: "+254 768 502 197", github: "https://github.com/eojuma", linkedin: "https://www.linkedin.com/in/Evans-Juma", devto: "https://dev.to/juma_evans_34e389ef539266" },
};

const order: Page[] = ["home", "about", "skills", "projects", "contact"];

function App() {
  const [active, setActive] = useState<Page>("home");
  const [direction, setDirection] = useState("next");
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(fallback);
  const [apiOnline, setApiOnline] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio").then((response) => {
      if (!response.ok) throw new Error("Portfolio API unavailable");
      return response.json() as Promise<Portfolio>;
    }).then((portfolio) => { setData(portfolio); setApiOnline(true); }).catch(() => setApiOnline(false));
  }, []);

  const navigate = useCallback((page: Page) => {
    if (page === active) return;
    setDirection(order.indexOf(page) > order.indexOf(active) ? "next" : "prev");
    setActive(page); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);

  return <div className="site-shell">
    <div className="ambient" aria-hidden="true" />
    <header className="nav-shell"><button className="logo" onClick={() => navigate("home")}>EJ<span>.DEV</span></button><nav className={menuOpen ? "open" : ""}>{order.map((page) => <button key={page} className={active === page ? "active" : ""} onClick={() => navigate(page)}>{page[0].toUpperCase() + page.slice(1)}</button>)}</nav><a className="nav-cta" href={`mailto:${data.contact.email}`}>Get in touch</a><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button></header>
    <main key={active} className={`view slide-${direction}`}>
      {active === "home" && <><section className="hero-new"><div className="hero-text"><p className="eyebrow"><span /> Available for backend opportunities</p><h1>Building reliable <em>backend systems</em> for real-world products.</h1><p>Hi, I’m <strong>{data.name}</strong>, a {data.role.toLowerCase()} from {data.location}. {data.summary}</p><div className="hero-actions"><button onClick={() => navigate("projects")}>Explore projects <span>→</span></button><a href={data.contact.github} target="_blank" rel="noreferrer">GitHub</a><a href={data.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div></div><div className="portrait"><div className="portrait-light" /><img src="/images/evajuma.JPG" alt="Evans Juma, backend software engineer" /><div className="float-card card-go"><b>Go</b><span>Anchor language</span></div><div className="float-card card-api"><b>API</b><span>{apiOnline ? "Backend connected" : "Fallback active"}</span></div></div></section><section className="stats"><div><b>7</b><span>Selected projects</span></div><div><b>8</b><span>Production issues fixed</span></div><div><b>5</b><span>Skill domains</span></div><div><b>Go</b><span>Primary language</span></div></section><section className="tech-strip"><p>Core technologies</p><div>{["Go", "PostgreSQL", "Docker", "AWS", "WebSockets", "Gemini"].map((tech) => <span key={tech}>{tech}</span>)}</div></section></>}
      {active === "about" && <section className="content-page"><PageTitle eyebrow="About me" title="An engineer who follows problems to their root cause." subtitle="Backend focus, quantitative foundations, and practical AI integration." /><div className="about-grid"><div className="prose"><p>I’m a backend software engineer with hands-on experience in Go, Python, and JavaScript. My work centers on maintainable APIs, data integrity, authentication, real-time communication, and the infrastructure that keeps products dependable.</p><p>At Zone01 Kisumu, I work through a project-based engineering curriculum covering algorithms, database architecture, networking, debugging, code review, and collaboration. I also bring quantitative coursework from Actuarial Science studies at the University of Eldoret.</p><button onClick={() => navigate("contact")}>Let’s work together →</button></div><div className="highlight-list">{[["Production debugging", "Audit unfamiliar systems, isolate root causes, and document durable fixes."], ["AI integration", "Connect LLM and embedding services without losing sight of reliability or security."], ["Backend ownership", "Carry features from schema and API contract through deployment and review."]].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div><div className="journey"><article><small>2026 — present</small><h3>Software Engineering Apprentice</h3><p>Zone01 Kisumu</p><span>Project-based software engineering across backend systems, algorithms, databases, and peer code review.</span></article><article><small>Relevant coursework</small><h3>Actuarial Science Studies</h3><p>University of Eldoret</p><span>Probability, statistics, financial mathematics, and mathematical modelling.</span></article></div></section>}
      {active === "skills" && <section className="content-page"><PageTitle eyebrow="Technical toolkit" title="Focused tools for dependable systems." subtitle="A backend-first toolkit supported by strong computer science fundamentals." /><div className="skill-grid">{Object.entries(data.skills).map(([category, values], index) => <article key={category}><span>0{index + 1}</span><h3>{category}</h3><p>{values.join(" · ")}</p></article>)}</div></section>}
      {active === "projects" && <section className="content-page"><PageTitle eyebrow="Selected work" title="Projects built, audited, and shipped." subtitle="The systems, responsibilities, and outcomes behind the repository names." /><div className="project-grid">{data.projects.map((project, index) => <article className="project-card-new" key={project.slug}><div className="project-top"><span>{project.tag}</span><small>{project.status}</small></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-role">{project.role}</div><ul>{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul><div className="outcome"><b>Outcome</b><span>{project.outcome}</span></div><span className="project-number">0{index + 1}</span></article>)}</div></section>}
      {active === "contact" && <section className="content-page contact-page"><div className="contact-panel"><p className="eyebrow">Start a conversation</p><h1>Let’s build something reliable together.</h1><p>Open to backend engineering roles, collaborations, and product teams solving meaningful technical problems.</p><div className="contact-actions"><a className="primary" href={`mailto:${data.contact.email}`}>Send an email →</a><a href={`tel:${data.contact.phone.replaceAll(" ", "")}`}>Call {data.contact.phone}</a></div><div className="social-row"><a href={data.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={data.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={data.contact.devto} target="_blank" rel="noreferrer">Dev.to ↗</a></div></div></section>}
    </main>
    <footer><p><strong>EVANS JUMA</strong> · Kisumu, Kenya</p><span>Backend Software Engineer</span><small>© {new Date().getFullYear()}</small></footer>
  </div>;
}

function PageTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <div className="page-title"><p>{eyebrow}</p><h1>{title}</h1><span>{subtitle}</span></div>;
}

export default App;
