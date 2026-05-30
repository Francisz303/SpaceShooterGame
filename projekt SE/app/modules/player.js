import { shipID } from "/app/modules/globals.js";
import { spaceShipAlarmSound } from "/app/modules/music.js";

export let isInvincible = false;

export function getIsInvincible() {
  return isInvincible;
}

export function setIsInvincible() {
  isInvincible = true;
}

export function startInvincibility() {
  isInvincible = true;

  const ship = shipID; // Twój div z graczem

  let visible = true;
  const blinkInterval = setInterval(() => {
    visible = !visible;
    ship.style.opacity = visible ? "1" : "0.2";
  }, 120);

  spaceShipAlarmSound.currentTime = 0;
  spaceShipAlarmSound.play();

  // po 1 sekundzie koniec migania
  setTimeout(() => {
    clearInterval(blinkInterval);
    ship.style.opacity = "1";
    isInvincible = false;
  }, 1000);
}
