import game from "../kaplayCtx";
import { GameObj } from "kaplay";

export function createPlatforms(
  platformWidth: number,
  platformHeight: number
): GameObj[] {
  return [
    game.add([
      game.sprite("platforms"),
      game.pos(0, platformHeight),
      game.scale(4),
      game.area(),
    ]),
    game.add([
      game.sprite("platforms"),
      game.pos(platformWidth * 4, platformHeight),
      game.scale(4),
      game.area(),
    ]),
  ];
}
