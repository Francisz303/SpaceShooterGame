import { life } from "./globals.js";

export let lives = 3;

export function getLives() {
  return lives;
}

export function restartLives() {
  lives = 3;
}

export function loseLife() {
  if (lives > 0) {
    lives--;
  }
}

export function updateLivesUI() {
  // ukryj wszystkie serca
  life.forEach((heart) => (heart.style.visibility = "hidden"));

  // pokaż tylko tyle, ile zostało
  for (let i = 0; i < lives; i++) {
    life[i].style.visibility = "visible";
  }
}
