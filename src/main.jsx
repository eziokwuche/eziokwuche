import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MusicPlaybackProvider } from "./context/MusicPlaybackContext";
import "./styles/globals.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MusicPlaybackProvider>
      <App />
    </MusicPlaybackProvider>
  </StrictMode>
);
