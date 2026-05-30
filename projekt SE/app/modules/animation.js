import { boardgame } from "/app/modules/globals.js";

let backgroundY = 0;
const scrollSpeed = 1;

export function restartBackgroundY() {
  backgroundY = 0;
}

// PRZEWIJANIE TŁA
export let backgroundLoop;

export function scrollBackground() {
  backgroundY += scrollSpeed;
  boardgame.style.backgroundPositionY = backgroundY + "px";

  backgroundLoop = requestAnimationFrame(scrollBackground);
}
