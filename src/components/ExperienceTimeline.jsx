import experience from "@/data/experience";

export default function ExperienceTimeline() {
  return (
    <div className="timeline">
      {experience.map((item, i) => (
        <div className="timeline-entry" key={i}>
          <div className="timeline-period">{item.period}</div>
          <div className="timeline-dot" />
          <div className="timeline-content">
            <h3 className="timeline-role">{item.title}</h3>
            <p className="timeline-company">{item.company} &mdash; {item.location}</p>
            <p className="timeline-desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
