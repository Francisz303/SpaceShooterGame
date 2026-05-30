import {
  btnTryAgain,
  endingWindow,
  startingWindow,
} from "/app/modules/globals.js";
import {
  handleKeyDown,
  handleKeyUp,
  playerMovment,
  playerLoop,
  resetKeys,
} from "/app/modules/playerControl.js";
import { scrollBackground } from "/app/modules/animation.js";
import {
  enemies,
  spawnEnemy,
  updateEnemies,
  enemyLoop,
} from "/app/modules/enemy.js";
import { getIsInvincible, setIsInvincible } from "/app/modules/player.js";
import { backgroundLoop, restartBackgroundY } from "/app/modules/animation.js";
import {
  updateFinalScoreUI,
  updateFinalHighScoreUI,
  restartScoring,
  updateScoreUI,
} from "/app/modules/scoring.js";
import { restartLives, updateLivesUI } from "/app/modules/playerLife.js";
import { playMusic, stopMusic, resetPlaylist } from "/app/modules/music.js";

export let enemySpawnInterval;

// PRZYCIKSK STARTU GRY
export function startGame() {
  startingWindow.style.display = "none";
  playerMovment();
  scrollBackground();

  // włącz muzykę
  resetPlaylist();
  playMusic();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  enemySpawnInterval = setInterval(() => {
    const enemy = spawnEnemy();
    enemies.push(enemy);
  }, 1500);

  updateEnemies();
}

// KONIEC GRY
export function gameOver() {
  // zatrzymanie gry
  cancelAnimationFrame(window.enemyLoop);
  cancelAnimationFrame(window.bulletLoop);
  cancelAnimationFrame(backgroundLoop); // 🔥 zatrzymanie tła
  cancelAnimationFrame(playerLoop);
  cancelAnimationFrame(enemyLoop);

  // zatrzymanie generowania przeciwników
  clearInterval(enemySpawnInterval);

  // wyłącz myzukę
  stopMusic();
  // blokada ruchu gracza
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);

  resetKeys();

  // 🔥 aktualizacja punktów na ekranie końcowym
  updateFinalScoreUI();
  updateFinalHighScoreUI();

  document.body.style.overflow = "auto";

  // pokazanie okna końcowego

  endingWindow.style.display = "flex"; // lub block, zależnie od stylu

  // opcjonalnie: reset nieśmiertelności
}

btnTryAgain.addEventListener("click", () => {
  restartGame();
});

// RESTART GRY
export function restartGame() {
  // ukryj ekran końcowy
  endingWindow.style.display = "none";

  // przywróć scroll strony
  document.body.style.overflow = "auto";

  resetKeys();

  // reset punktów
  restartScoring();
  updateScoreUI();

  // reset życia
  restartLives();
  updateLivesUI();

  // usuń przeciwników z planszy
  enemies.forEach((enemy) => enemy.remove());
  enemies.length = 0;

  // reset tła
  restartBackgroundY();

  // zatrzymaj poprzedni interwał (na wszelki wypadek)
  clearInterval(enemySpawnInterval);

  // start gry
  startGame();
}
