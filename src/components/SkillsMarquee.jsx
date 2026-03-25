import skills from "@/data/skills";

export default function SkillsCarousel() {
  const doubled = [...skills, ...skills];

  return (
    <div className="skills-ribbon-wrapper">
      <div className="skills-ribbon">
        {doubled.map((skill, i) => (
          <div className="skill-item" key={i}>
            <i className={skill.icon} />
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
