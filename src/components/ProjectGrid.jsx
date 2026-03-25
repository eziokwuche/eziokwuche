import projects from "@/data/projects";

export default function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map((project, i) => (
        <a
          key={i}
          className="project-card"
          href={project.link}
          target={project.link !== "#" ? "_blank" : undefined}
          rel={project.link !== "#" ? "noopener noreferrer" : undefined}
        >
          <div className="project-thumb">
            {project.thumbnail ? (
              <img src={project.thumbnail} alt={project.title} />
            ) : (
              <div className="project-thumb-placeholder" />
            )}
          </div>
          <div className="project-info">
            <h3 className="project-name">
              {project.title}
              <span className="project-arrow">&#8599;</span>
            </h3>
            <p className="project-desc">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span className="project-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
