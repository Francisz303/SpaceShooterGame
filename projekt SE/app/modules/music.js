// LISTA UTWORÓW
const tracks = [
  "/audio/Main theme.m4a",
  "/audio/track1.m4a",
  "/audio/track2.m4a",
  "/audio/track3.m4a",
  "/audio/track4.m4a",
  "/audio/track5.m4a",
  "/audio/track6.m4a",
  "/audio/track7.m4a",
];

export const spaceShipAlarmSound = new Audio("/audio/alarm.mp3");
spaceShipAlarmSound.volume = 0.8;

export const shootSound = new Audio("/audio/laser_shoot.mp3");

// żeby dźwięk mógł grać wiele razy szybko pod rząd
shootSound.volume = 0.2;

export const enemyExplosionSound = new Audio("/audio/explosion.mp3");
enemyExplosionSound.volume = 0.3;

let currentTrackIndex = 0;
export let audio = new Audio(tracks[currentTrackIndex]);

audio.volume = 0.7;

// 🔥 ODTWARZA AKTUALNY UTWÓR
export function playMusic() {
  audio.src = tracks[currentTrackIndex];
  audio.currentTime = 0;
  audio.play();
}

// 🔥 ZATRZYMUJE MUZYKĘ
export function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
}

// 🔥 LOSUJE KOLEJNY UTWÓR
function nextRandomTrack() {
  let newIndex;

  do {
    newIndex = Math.floor(Math.random() * tracks.length);
  } while (newIndex === currentTrackIndex);
  // 🔥 gwarancja że nie poleci ten sam utwór dwa razy pod rząd

  currentTrackIndex = newIndex;
  playMusic();
}

// 🔥 Po zakończeniu utworu → losowy następny
audio.addEventListener("ended", nextRandomTrack);

// 🔥 Reset playlisty przy restarcie
export function resetPlaylist() {
  currentTrackIndex = Math.floor(Math.random() * tracks.length);
}
