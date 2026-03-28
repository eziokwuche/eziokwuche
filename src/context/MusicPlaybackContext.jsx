import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import albums from "@/data/albums";

const MusicPlaybackContext = createContext(null);

export function MusicPlaybackProvider({ children }) {
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [heroSectionElement, setHeroSectionElement] = useState(null);

  const registerHeroSection = useCallback((el) => {
    setHeroSectionElement(el);
  }, []);

  const value = useMemo(
    () => ({
      currentAlbumIndex,
      setCurrentAlbumIndex,
      currentAlbum: albums[currentAlbumIndex] ?? null,
      isPlaying,
      setIsPlaying,
      registerHeroSection,
      heroSectionElement,
    }),
    [currentAlbumIndex, isPlaying, registerHeroSection, heroSectionElement]
  );

  return (
    <MusicPlaybackContext.Provider value={value}>
      {children}
    </MusicPlaybackContext.Provider>
  );
}

export function useMusicPlayback() {
  const ctx = useContext(MusicPlaybackContext);
  if (!ctx) {
    throw new Error("useMusicPlayback must be used within MusicPlaybackProvider");
  }
  return ctx;
}
