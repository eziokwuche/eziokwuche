import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ExperiencePage from "@/pages/ExperiencePage";
import ProjectsPage from "@/pages/ProjectsPage";
import Footer from "@/components/Footer";
import GlobalAmbientBackground from "@/components/GlobalAmbientBackground";
import { useMusicPlayback } from "@/context/MusicPlaybackContext";
import { MUSIC_CAROUSEL_AUDIO_ENGINE } from "@/audio/musicCarouselAudio";

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
  const { setIsPlaying } = useMusicPlayback();

  /** Leaving any page (e.g. About with music) should stop audio + fade global ambient to black. */
  useEffect(() => {
    MUSIC_CAROUSEL_AUDIO_ENGINE.pause();
    setIsPlaying(false);
  }, [view, setIsPlaying]);

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
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    function syncFromHash() {
      const raw = window.location.hash.slice(1);
      if (VIEWS[raw]) setView(raw);
    }

    // Full reload / refresh: always land on home (do not restore #about etc.)
    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}#home`);
    setView("home");

    // Beat browser scroll restoration + ensure Smoother is at top after reload
    requestAnimationFrame(() => {
      window.__scrollSmoother?.scrollTo(0, false);
    });

    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function navigate(target) {
    window.location.hash = target;
    setView(target);
  }

  const Page = VIEWS[view];

  return (
    <>
      <GlobalAmbientBackground />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Page navigate={navigate} />
          </main>
          {view !== "home" && <Footer currentView={view} navigate={navigate} />}
        </div>
      </div>
    </>
  );
}
