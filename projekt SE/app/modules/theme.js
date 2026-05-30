import {
  btnThemes,
  shipID,
  life,
  startingWindow,
  endingWindow,
  bullet,
  btnTryAgain,
  enemy,
  body,
} from "/app/modules/globals.js";

export let currentTheme = "light";

export function setTheme(value) {
  currentTheme = value;
}

btnThemes.addEventListener("click", () => {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  currentTheme = newTheme;
  applyTheme(currentTheme);
});

// ZMIANA MOTYWU POCISKU
export function getBulletImage() {
  return currentTheme === "dark"
    ? "/img/light_laser_bullet.svg"
    : "/img/dark_laser_bullet.svg";
}

// ZMIANA MOTYWU PRZECIWNIKA
export function getEnemyImage() {
  return currentTheme === "dark" ? "/img/light_ufo1.svg" : "/img/dark_ufo1.svg";
}

// ZMIANA MOTYWU PRZYCISKU ZMIANY MOTYWU
export function getBtnThemesImage() {
  return currentTheme === "dark" ? "/img/light_mode.svg" : "/img/dark_mode.svg";
}

// ZMIANA MOTYWU STATKU GRACZA
export function getPlayerImage() {
  return currentTheme === "dark"
    ? "/img/light_spaceship1.svg"
    : "/img/dark_spaceship1.svg";
}

export function getTryAgainImage() {
  return currentTheme === "dark"
    ? "/img/light_try_again.svg"
    : "/img/dark_try_again.svg";
}

// ZMIANA KOLORU FONTU
export function getFontColor() {
  return currentTheme === "dark" ? "#fff" : "#535353";
}
// ZMIANA MOTYWU EKRANU GRY
export function getBoardgameImage() {
  return currentTheme === "dark"
    ? "url(/img/dark_pattern.svg)"
    : "url(/img/light_pattern.svg)";
}

// ZMIANA MOTYWU SERCA
export function getHeartImage() {
  return currentTheme === "dark"
    ? "/img/light_heart.svg"
    : "/img/dark_heart.svg";
}
// ZMIANA KOLORU TŁA
export function getBackgroundColor() {
  return currentTheme === "dark" ? "#535353" : "#fff";
}
// ZMIANA KOLORU RAMKI
export function getBorderColor() {
  return currentTheme === "dark" ? "#fff" : "#535353";
}

// ZMIANA MOTYWU KOLORYSTYCZNEGO
export function applyTheme(theme) {
  btnThemes.src = getBtnThemesImage();
  shipID.querySelector("img").src = getPlayerImage();
  btnTryAgain.querySelector("img").src = getTryAgainImage();
  body.style.backgroundColor = getBackgroundColor();
  body.style.color = getFontColor();
  boardgame.style.backgroundImage = getBoardgameImage();
  boardgame.style.borderColor = getBorderColor();
  startingWindow.style.backgroundColor = getBackgroundColor();
  startingWindow.style.borderColor = getBorderColor();
  endingWindow.style.backgroundColor = getBackgroundColor();
  endingWindow.style.borderColor = getBorderColor();
  life.forEach((heart) => {
    heart.src = getHeartImage();
  });

  // 🔥 zmiana motywu WSZYSTKICH pocisków
  document.querySelectorAll(".bullet img").forEach((img) => {
    img.src = getBulletImage();
  });

  // 🔥 zmiana motywu WSZYSTKICH przeciwników
  document.querySelectorAll(".enemy img").forEach((img) => {
    img.src = getEnemyImage();
  });
}
