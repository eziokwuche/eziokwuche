import projects from "@/data/projects";

export default function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map((project, i) => (
        <article key={i} className="project-card">
          {project.thumbnail ? (
            <div className="project-thumb">
              <img src={project.thumbnail} alt={project.title} />
            </div>
          ) : null}
          <div className="project-info">
            <h3 className="project-name">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span className="project-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
