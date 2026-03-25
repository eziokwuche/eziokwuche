import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/andrewnnani" },
  { label: "GitHub", href: "https://github.com/eziokwuche" },
  { label: "Instagram", href: "https://www.instagram.com/eziokwuche/" },
  { label: "Twitter", href: "https://twitter.com/eziokwuche" },
];

function LiveClock() {
  const [time, setTime] = useState(() => formatTime());

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return <>{time}</>;
}

function formatTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}

export default function Footer({ currentView, navigate }) {
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const targets = [el.querySelector(".ft-navs")].filter(Boolean);

    gsap.set(targets, { y: 40, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>
      <section className="ft-navs">
        <div className="ft-navs-self">
          <div className="ft-nav">
            <h4 className="ft-label">Explore</h4>
            <nav className="ft-nav-links">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`ft-link${currentView === item.id ? " ft-link--active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="ft-nav">
            <h4 className="ft-label">Connect</h4>
            <nav className="ft-nav-links">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-link"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="ft-mails">
          <div className="ft-mail">
            <h4 className="ft-label">Get In Touch</h4>
            <a href="mailto:nnaniandrew@gmail.com" className="ft-link ft-link--info">
              nnaniandrew@gmail.com
            </a>
          </div>
          <div className="ft-mail">
            <h4 className="ft-label">Location</h4>
            <p className="ft-link ft-link--info ft-link--static">
              Raleigh, NC &mdash; <LiveClock />
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
