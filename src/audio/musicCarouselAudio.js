/** Single shared engine — used by MusicCarousel and App (route changes) so one pause stops everything. */
export const MUSIC_CAROUSEL_AUDIO_ENGINE = new Audio();
MUSIC_CAROUSEL_AUDIO_ENGINE.preload = "auto";
