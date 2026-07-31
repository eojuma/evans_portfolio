import { ProjectSection } from "./sections/ProjectSection";
import { ContactSection } from "./sections/ContactSection";

function App() {
  return (
    <div className="app-container">
      {/* Left Sidebar (Fixed) */}
      <aside className="left-sidebar">
        <div className="hero-bio">
          <h1>Evans</h1>
          <h2>Full-Stack Software Engineer</h2>
          <p>
            I build accessible, high-performance web applications with Go, 
            Gin, MongoDB, and React.
          </p>
        </div>

        <div className="social-links">
          {/* Add social links or icon svgs here */}
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