import game from "../kaplayCtx";
import { Sonic } from "../entities/sonic";
import { Scene } from "./scene";

export function gameOver() {
  const scene = new Scene();
  game.setGravity(0);

  let bestScore: number | null = game.getData("bestScore");

  const score: number | null = game.getData("score");

  if (!bestScore) bestScore = score;

  if (bestScore! < score!) game.setData("bestScore", score);

  scene.setupParallax();
  scene.setNextScene("playGame");

  scene.addText("Game Over", 108, game.center().x, 200);
  scene.addText(
    `Press SPACE/Click/Touch to Play Again. Best Score: ${score}`,
    36,
    game.center().x,
    game.center().y - 200
  );

  new Sonic(game.vec2(200, 745));
}
