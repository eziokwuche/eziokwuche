import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ExperiencePage from "@/pages/ExperiencePage";
import ProjectsPage from "@/pages/ProjectsPage";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const VIEWS = {
  home: HomePage,
  about: AboutPage,
  experience: ExperiencePage,
  projects: ProjectsPage,
};

export default function App() {
  const [view, setView] = useState("home");
  const smootherRef = useRef(null);

  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });
    window.__scrollSmoother = smootherRef.current;

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
        window.__scrollSmoother = null;
      }
    };
  }, []);

  useEffect(() => {
    if (smootherRef.current) {
      smootherRef.current.scrollTo(0, false);
    }
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
    return () => cancelAnimationFrame(id);
  }, [view]);

  useEffect(() => {
    window.location.hash = "home";
    function onHashChange() {
      const hash = window.location.hash.slice(1);
      if (VIEWS[hash]) setView(hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function navigate(target) {
    window.location.hash = target;
    setView(target);
  }

  const Page = VIEWS[view];

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
          <Page navigate={navigate} />
        </main>
        {view !== "home" && <Footer currentView={view} navigate={navigate} />}
      </div>
    </div>
  );
}
