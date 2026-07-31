import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { ProjectSection } from "./sections/ProjectSection";
import { ContactSection } from "./sections/ContactSection";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <ProjectSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;