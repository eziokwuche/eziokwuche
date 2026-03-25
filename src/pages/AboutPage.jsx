import InteractiveHero from "@/components/InteractiveHero";
import MusicCarousel from "@/components/MusicCarousel";

export default function AboutPage() {
  return (
    <>
      <InteractiveHero />
      <section id="content" className="page-section">
        <div className="container">
          <h1 className="section-title">About</h1>
          <p className="section-text bio-text">
            I'm Andrew Nnani — an Information Science graduate from UNC
            Greensboro based in Raleigh, North Carolina. I work at the
            intersection of data and design, building everything from
            Python-powered data pipelines and sentiment analysis tools to
            interactive web experiences with React and Canvas. I co-founded
            InOptive Studios, a streetwear brand where I handled everything from
            market research to digital strategy. When I'm not writing code or
            crunching data, I'm probably deep in an album.
          </p>
        </div>
      </section>
      <MusicCarousel />
    </>
  );
}
