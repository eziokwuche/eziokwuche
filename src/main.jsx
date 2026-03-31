import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MusicPlaybackProvider } from "./context/MusicPlaybackContext";
import "./styles/globals.css";

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MusicPlaybackProvider>
      <App />
    </MusicPlaybackProvider>
  </StrictMode>
);
