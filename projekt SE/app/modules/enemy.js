import { boardgame, shipID } from "/app/modules/globals.js";
import { getEnemyImage } from "/app/modules/theme.js";
import { isColliding } from "/app/modules/collision.js";
import { getLives, loseLife, updateLivesUI } from "/app/modules/playerLife.js";
import { startInvincibility, getIsInvincible } from "/app/modules/player.js";
import { gameOver } from "/app/modules/gameStatus.js";
import { enemyExplosionSound } from "/app/modules/music.js";

// SPAWNUJE PRZECIWNIKA W DANEJ LOKALIZACJI
export function spawnEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");

  // USTAWIA TRYB PRZECIWNIKA
  const img = document.createElement("img");
  img.src = getEnemyImage();
  enemy.appendChild(img);

  const boardWidth = boardgame.clientWidth;
  const enemyWidth = 79.5;

  // losowy X, ale tak, aby przeciwnik był w całości w planszy
  const randomX = Math.random() * (boardWidth - enemyWidth);

  // Y nad planszą
  const startY = -50;

  enemy.style.left = randomX + "px";
  enemy.style.top = -50 + "px";

  boardgame.appendChild(enemy);

  return enemy;
}
export let enemyLoop;
export const enemies = [];

// RUCH PRZECIWNIKA
export function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    const y = parseInt(enemy.style.top);

    // ruch przeciwnika
    enemy.style.top = y + 3 + "px";

    // KOLIZJA Z GRACZEM
    if (isColliding(enemy, shipID)) {
      // jeśli statek jest nietykalny — ignorujemy kolizję
      if (getIsInvincible()) {
        enemy.remove();
        enemies.splice(i, 1);
        continue;
      }

      enemy.remove();
      enemies.splice(i, 1);

      enemyExplosionSound.currentTime = 0;
      enemyExplosionSound.play();

      // 🔥 utrata życia
      loseLife();
      updateLivesUI();

      // jeśli życie spadło do 0 → GAME OVER
      if (getLives() === 0) {
        gameOver();
        return;
      }

      // miganie statku
      startInvincibility();

      continue;
    }

    // usuwanie dopiero gdy CAŁY przeciwnik opuści planszę
    if (y > boardgame.clientHeight + enemy.offsetHeight) {
      enemy.remove();
      enemies.splice(i, 1);

      // 🔥 gracz traci życie
      loseLife();
      updateLivesUI();

      // 🔥 jeśli to było ostatnie życie → GAME OVER
      if (getLives() === 0) {
        gameOver();
        return;
      }

      // 🔥 miganie statku po utracie życia
      startInvincibility();

      continue;
    }
  }
  enemyLoop = requestAnimationFrame(updateEnemies);
}
