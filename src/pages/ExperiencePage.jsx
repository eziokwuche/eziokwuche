import InteractiveHero from "@/components/InteractiveHero";
import EducationSection from "@/components/EducationSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsMarquee from "@/components/SkillsMarquee";
import { skillsMarqueeRow1, skillsMarqueeRow2 } from "@/data/skills";

export default function ExperiencePage() {
  return (
    <>
      <InteractiveHero />
      <section id="content" className="page-section experience-page">
        <div className="container">
          <div className="section-content-column section-content-column--experience">
            <h1 className="section-title experience-page__section-heading">
              Relevant Experience
            </h1>
            <ExperienceTimeline />
          </div>
        </div>
      </section>
      <section className="page-section education-section">
        <div className="container">
          <div className="section-content-column">
            <h2 className="section-title experience-page__section-heading">
              Education
            </h2>
            <EducationSection />
          </div>
        </div>
      </section>
      <section className="page-section skills-section">
        <div className="container skills-page__inner">
          <div className="section-content-column section-content-column--skills">
            <h2 className="section-title skills-marquee-stack__heading">
              Skills
            </h2>
            <div className="skills-marquee-stack__content">
              <SkillsMarquee skills={skillsMarqueeRow1} durationSec={25} />
              <SkillsMarquee skills={skillsMarqueeRow2} reverse durationSec={28} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
