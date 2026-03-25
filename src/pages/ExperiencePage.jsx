import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsMarquee from "@/components/SkillsMarquee";

export default function ExperiencePage() {
  return (
    <>
      <section className="page-section">
        <div className="container">
          <h1 className="section-title">Relevant Experience</h1>
          <ExperienceTimeline />
        </div>
      </section>
      <section className="page-section skills-section">
        <div className="container">
          <h2 className="section-title">Skills</h2>
        </div>
        <SkillsMarquee />
      </section>
    </>
  );
}
