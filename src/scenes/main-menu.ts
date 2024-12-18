import game from "../kaplayCtx";
import { Sonic } from "../entities/sonic";
import { Scene } from "./scene";

export function mainMenu() {
  const scene = new Scene();

  scene.setupParallax();
  scene.setNextScene("playGame");
  scene.playMusic("bg", { volume: 0.2, loop: true });

  scene.addText("Sonic Runner", 108, game.center().x, 200);
  scene.addText(
    "Press SPACE/Click/Touch to Start",
    36,
    game.center().x,
    game.center().y - 200
  );

  new Sonic(game.vec2(200, 745));
}
