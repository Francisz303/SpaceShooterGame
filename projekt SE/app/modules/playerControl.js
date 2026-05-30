import { shipID, boardgame } from "/app/modules/globals.js";
import { positionBulletUnderShip, shootBullet } from "/app/modules/shooting.js";
import { shootSound } from "/app/modules/music.js";

const boardWidth = boardgame.clientWidth;
const shipWidth = shipID.clientWidth;

let xPosition = (boardWidth - shipWidth) / 2;
let movmentSpeed = 5;
const keys = {};

// FUNKCJA RESETUJĄCA STEROWANIE
export function resetKeys() {
  for (const key in keys) {
    keys[key] = false;
  }
}

// 🔥 OBSŁUGA KLAWISZY — dodawana TYLKO RAZ
export function handleKeyDown(e) {
  keys[e.key] = true;

  if (e.code === "Space") {
    e.preventDefault(); // 🔥 blokuje scroll strony
    shootBullet(xPosition);

    // 🔥 dźwięk strzału
    shootSound.currentTime = 0; // reset, żeby można było spamować strzały
    shootSound.play();
  }
}

export function handleKeyUp(e) {
  keys[e.key] = false;
}

export let playerLoop;
// 🔥 RUCH GRACZA — czysty, bez event listenerów
export function playerMovment() {
  if (keys["ArrowLeft"] && xPosition > 0) {
    xPosition -= movmentSpeed;
  }

  if (keys["ArrowRight"] && xPosition < boardWidth - shipWidth) {
    xPosition += movmentSpeed;
  }

  shipID.style.left = xPosition + "px";

  // pocisk zawsze pod statkiem
  positionBulletUnderShip(xPosition);

  playerLoop = requestAnimationFrame(playerMovment);
}

// 🔥 aktywacja sterowania
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
