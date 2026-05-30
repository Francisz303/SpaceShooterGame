import { startGame } from "/app/modules/gameStatus.js";
import { updateBullets } from "/app/modules/shooting.js";

document
  .getElementById("btn-starting-game")
  .addEventListener("click", startGame);

console.log("MAIN CONNECT");
