import ProjectGrid from "@/components/ProjectGrid";

export default function ProjectsPage() {
  return (
    <>
      <section className="page-section">
        <div className="container">
          <h1 className="section-title">Projects</h1>
          <ProjectGrid />
        </div>
      </section>
      <section className="page-section github-cta-section">
        <div className="github-cta">
          <h2 className="github-cta-heading">Want to see more?</h2>
          <p className="github-cta-sub">Check out my work on GitHub.</p>
          <a
            href="https://github.com/eziokwuche"
            target="_blank"
            rel="noopener noreferrer"
            className="home-btn"
          >
            GitHub &#8599;
          </a>
        </div>
      </section>
    </>
  );
}
