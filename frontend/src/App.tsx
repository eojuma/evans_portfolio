import { ProjectSection } from "./sections/ProjectSection";
import { ContactSection } from "./sections/ContactSection";

function App() {
  return (
    <div className="app-container">
      {/* Left Sidebar (Fixed) */}
      <aside className="left-sidebar">
        <div className="hero-bio">
          <h1>Evans</h1>
          <h2>Backend Software Engineer</h2>
          <p>
            I design and build scalable REST APIs, microservices, and database systems using Go (Golang), Gin, and MongoDB.
          </p>
        </div>

        <div className="social-links">
          {/* Add GitHub / LinkedIn links here */}
        </div>
      </aside>

      {/* Right Column (Scrollable Content) */}
      <main className="right-content">
        <ProjectSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;