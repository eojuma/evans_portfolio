export const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="section-heading">
        <h2>Contact</h2>
        <span className="section-path">/api/contact</span>
      </div>
      <p>
        Open to backend and Dev Rel opportunities. Feel free to reach out for
        collaborations or project inquiries.
      </p>
      {/* Replace with your real email */}
      <a href="mailto:you@example.com" className="btn-link">
        Say hello ↗
      </a>
    </section>
  );
};