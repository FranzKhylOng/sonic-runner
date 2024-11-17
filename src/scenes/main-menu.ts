import game from "../kaplayCtx";
import { Sonic } from "../entities/sonic";
import { createBackgrounds, createPlatforms, setupParallax } from "../utils";

export function mainMenu() {
  game.play("bg", { volume: 0.2, loop: true });
  if (!game.getData("bestScore")) {
    game.setData("bestScore", 0);
  }

  game.onButtonPress("jump", () => {
    game.go("playGame");
  });

  const bgWidth = 1920;
  const platformWidth = 1280;
  const platformHeight = 450;

  const backgrounds = createBackgrounds(bgWidth);
  const platforms = createPlatforms(platformWidth, platformHeight);

  game.add([
    game.text("Sonic Runner", { font: "mania", size: 108 }),
    game.pos(game.center().x, 200),
    game.anchor("center"),
  ]);

  game.add([
    game.text("Press SPACE/Click/Touch to Start", { font: "mania", size: 36 }),
    game.pos(game.center().x, game.center().y - 200),
    game.anchor("center"),
  ]);

  new Sonic(game.vec2(200, 745));

  setupParallax(backgrounds, bgWidth, 100, 0);
  setupParallax(platforms, platformWidth, 4000, platformHeight);
}
