import { AudioPlayOpt, GameObj } from "kaplay";
import game from "../kaplayCtx";
import { createBackgrounds, createPlatforms, setupParallax } from "../utils";
import { bgWidth, platformWidth, platformHeight, gameSpeed } from "../config";

export class Scene {
  protected backgrounds: GameObj[];
  protected platforms: GameObj[];

  constructor() {
    this.backgrounds = createBackgrounds(bgWidth);
    this.platforms = createPlatforms(platformWidth, platformHeight);
  }

  setupParallax() {
    setupParallax(this.backgrounds, bgWidth, 100, 0);
    setupParallax(this.platforms, platformWidth, gameSpeed, platformHeight);
  }

  addText(text: string, fontSize: number, x: number, y: number) {
    game.add([
      game.text(text, { font: "mania", size: fontSize }),
      game.pos(x, y),
      game.anchor("center"),
    ]);
  }

  playMusic(song: string, options: AudioPlayOpt) {
    game.play(song, options);
  }

  setNextScene(scene: string) {
    game.onButtonPress("jump", () => {
      game.go(scene);
    });
  }
}
