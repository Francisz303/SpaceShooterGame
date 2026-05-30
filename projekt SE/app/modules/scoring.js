import {
  currentHighscore,
  currentScore,
  finalHighScore,
  finalScore,
} from "./globals.js";

export let score = 0;

export function restartScoring() {
  score = 0;
}

// DODAJ PUNKTY
export function addScore(value) {
  score += value;
}

// FORMAT ZAPISU PUNKTÓW
export function formatScore(score) {
  return String(score).padStart(5, "0");
}

// ZAKTUALIZUJ WYŚWIETLANIE PUNKTÓW
export function updateScoreUI() {
  currentScore.textContent = formatScore(score);
}

export let highScore = 0;

// ZWIĘKSZ REKORD JEŚLI JEST MNIEJSZY OD WYNIKU
export function updateHighScore() {
  if (score > highScore) {
    highScore = score;
  }
}
// ZAKTUALIZUJ WYŚWIETLANIE REKORDU
export function updateHighScoreUI() {
  currentHighscore.textContent = formatScore(highScore);
}

export function updateFinalScoreUI() {
  finalScore.textContent = formatScore(score);
}

export function updateFinalHighScoreUI() {
  finalHighScore.textContent = formatScore(highScore);
}
