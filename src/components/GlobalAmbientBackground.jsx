import { useState, useEffect, useRef, useMemo } from "react";
import { useMusicPlayback } from "@/context/MusicPlaybackContext";
import { resolvedMediaUrl } from "@/utils/resolvedMediaUrl";

/**
 * When true, ambient ignores hero visibility (debug only).
 */
const BYPASS_HERO_INTERSECTION = false;

/** Pause / swipe: fade art to black (must stay in sync with deferred cover resync timeout). */
const AMBIENT_OPACITY_MS = 800;

/** Scrolling up into hero: hide ambient quickly so it doesn’t bleed into the hero. */
const HERO_HIDE_MS = 200;

/** Scrolling down into portfolio: bring ambient back slowly. */
const HERO_SHOW_MS = 1000;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

export default function GlobalAmbientBackground() {
  const { currentAlbum, isPlaying, heroSectionElement } = useMusicPlayback();
  const [isHeroIntersecting, setIsHeroIntersecting] = useState(false);
  const [displayedCoverUrl, setDisplayedCoverUrl] = useState("");
  const ioRafRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!heroSectionElement) {
      setIsHeroIntersecting(false);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting;
        if (ioRafRef.current != null) {
          cancelAnimationFrame(ioRafRef.current);
        }
        ioRafRef.current = requestAnimationFrame(() => {
          ioRafRef.current = null;
          setIsHeroIntersecting(next);
        });
      },
      {
        root: null,
        rootMargin: "100px 0px 0px 0px",
        threshold: [0],
      }
    );
    io.observe(heroSectionElement);
    return () => {
      if (ioRafRef.current != null) {
        cancelAnimationFrame(ioRafRef.current);
        ioRafRef.current = null;
      }
      io.disconnect();
    };
  }, [heroSectionElement]);

  /**
   * While playing: ambient art always tracks the current album (carousel + MusicCarousel
   * now pause in the same tick as index change, so no stale isPlaying).
   */
  useEffect(() => {
    if (!isPlaying) return;
    const url = currentAlbum?.cover
      ? resolvedMediaUrl(currentAlbum.cover)
      : "";
    setDisplayedCoverUrl(url);
  }, [isPlaying, currentAlbum]);

  /**
   * After pause: keep the frozen frame (last `displayedCoverUrl` from when we were playing),
   * then resync to the carousel once opacity has finished fading — never swap `src` mid-fade.
   */
  useEffect(() => {
    if (isPlaying) return;
    const id = window.setTimeout(() => {
      setDisplayedCoverUrl(
        currentAlbum?.cover ? resolvedMediaUrl(currentAlbum.cover) : ""
      );
    }, AMBIENT_OPACITY_MS);
    return () => clearTimeout(id);
  }, [isPlaying, currentAlbum]);

  const heroBlocksAmbient =
    !BYPASS_HERO_INTERSECTION && isHeroIntersecting;

  const layerOpacity =
    displayedCoverUrl &&
    isPlaying &&
    !heroBlocksAmbient
      ? 1
      : 0;

  const { transitionMs, easing } = useMemo(() => {
    if (prefersReducedMotion) {
      return { transitionMs: 0, easing: "linear" };
    }
    if (!isPlaying) {
      return {
        transitionMs: AMBIENT_OPACITY_MS,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      };
    }
    if (heroBlocksAmbient) {
      return {
        transitionMs: HERO_HIDE_MS,
        easing: "cubic-bezier(0.4, 0, 1, 1)",
      };
    }
    return {
      transitionMs: HERO_SHOW_MS,
      easing: "cubic-bezier(0, 0, 0.2, 1)",
    };
  }, [prefersReducedMotion, isPlaying, heroBlocksAmbient]);

  return (
    <div
      className="global-ambient"
      aria-hidden
      style={{
        opacity: layerOpacity,
        transition:
          transitionMs === 0
            ? "none"
            : `opacity ${transitionMs}ms ${easing}`,
      }}
    >
      {displayedCoverUrl ? (
        <>
          <img
            src={displayedCoverUrl}
            alt=""
            className="global-ambient__img"
            draggable={false}
            decoding="async"
          />
          <div className="global-ambient__scrim" />
        </>
      ) : null}
    </div>
  );
}
