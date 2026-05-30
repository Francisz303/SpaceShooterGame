import { shipID, boardgame, bullet } from "/app/modules/globals.js";
import { getBulletImage } from "/app/modules/theme.js";
import { enemies } from "/app/modules/enemy.js";
import { isColliding } from "/app/modules/collision.js";
import { enemyExplosionSound } from "/app/modules/music.js";
import {
  updateScoreUI,
  addScore,
  updateHighScore,
  updateHighScoreUI,
} from "/app/modules/scoring.js";

// POZYCJA BAZOWA POCISKU W MIEJSCU STATKU GRACZA
export function positionBulletUnderShip(xPosition) {
  const boardRect = boardgame.getBoundingClientRect();

  const shipWidth = shipID.clientWidth;
  const bulletWidth = bullet.clientWidth;

  const bulletX = xPosition + shipWidth / 2 - bulletWidth / 2;

  const shipRect = shipID.getBoundingClientRect();
  const bulletY = shipRect.top - boardRect.top - 10;

  bullet.style.left = bulletX + "px";
  bullet.style.top = bulletY + "px";
}

export const bullets = [];
updateBullets();

// GENEROWANIE POCISKU
export function shootBullet(xPosition) {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");

  // USTAWIA TRYB POCISKU
  const img = document.createElement("img");
  img.src = getBulletImage();
  bullet.appendChild(img);

  const shipWidth = shipID.clientWidth;
  const bulletWidth = 2;

  const bulletX = xPosition + shipWidth / 2 - bulletWidth / 2;
  const bulletY = shipID.offsetTop - 10;

  bullet.style.left = bulletX + "px";
  bullet.style.top = bulletY + "px";

  boardgame.appendChild(bullet);
  bullets.push(bullet);
}

// RUCH POCISKU
export function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    const y = parseInt(bullet.style.top);

    // RUCH POCISKU
    bullet.style.top = y - 8 + "px";

    // USUWANIE POCISKU PO WYJŚCIU POZA PLANSZĘ
    if (y + bullet.offsetHeight <= 0) {
      bullet.remove();
      bullets.splice(i, 1);
      continue;
    }

    // SPRAWDZANIE KOLIZJI Z PRZECIWNIKAMI
    for (let j = enemies.length - 1; j >= 0; j--) {
      const enemy = enemies[j];

      if (isColliding(bullet, enemy)) {
        // USUŃ POCISK
        bullet.remove();
        bullets.splice(i, 1);

        // USUŃ PRZECZIWNIKA
        enemy.remove();
        enemies.splice(j, 1);

        enemyExplosionSound.currentTime = 0;
        enemyExplosionSound.play();

        // DODAJ PUNKTY
        addScore(10);
        // USTAW REKORD NA WYNIK
        updateHighScore();

        // ZAKTUALIZUJ WYŚWIETLANIE PUNKTÓW
        updateScoreUI();
        // ZAKTUALIZUJ WYŚWIETLANIE REKORDU
        updateHighScoreUI();

        break;
      }
    }
  }

  requestAnimationFrame(updateBullets);
}
