import game from "../kaplayCtx";
import { GameObj } from "kaplay";

export function createBackgrounds(bgWidth: number): GameObj[] {
  return [
    game.add([
      game.sprite("chemicalBg"),
      game.pos(0, 0),
      game.scale(2),
      game.opacity(0.8),
    ]),
    game.add([
      game.sprite("chemicalBg"),
      game.pos(bgWidth * 2, 0),
      game.scale(2),
      game.opacity(0.8),
    ]),
  ];
}
