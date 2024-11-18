import game from "../kaplayCtx";
import { Sonic } from "../entities/sonic";
import { bgWidth, platformWidth, platformHeight, gameSpeed } from "../config";

import { createBackgrounds, createPlatforms, setupParallax } from "../utils";

export function gameOver() {
  game.setGravity(0);

  let bestScore: number | null = game.getData("bestScore");

  const score: number | null = game.getData("score");

  if (!bestScore) bestScore = score;

  if (bestScore! < score!) game.setData("bestScore", score);

  game.onButtonPress("jump", () => {
    game.go("playGame");
  });

  const backgrounds = createBackgrounds(bgWidth);
  const platforms = createPlatforms(platformWidth, platformHeight);

  game.add([
    game.text("Game Over", { font: "mania", size: 108 }),
    game.pos(game.center().x, 200), // by pixels, if 1080 is the height of the canvas, y=0 is top and y=1080 is bottom
    game.anchor("center"), //center the text, the default origin of the object is top left
  ]);

  game.add([
    game.text(`Press SPACE/Click/Touch to Play Again. Best Score: ${score}`, {
      font: "mania",
      size: 36,
    }),
    game.pos(game.center().x, game.center().y - 200),
    game.anchor("center"),
  ]);

  new Sonic(game.vec2(200, 745));

  setupParallax(backgrounds, bgWidth, 100, 0);
  setupParallax(platforms, platformWidth, gameSpeed, platformHeight);
}
