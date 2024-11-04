import { Vec2 } from "kaplay";
import game from "../kaplayCtx";

export function makeRing(pos: Vec2) {
  const ring = game.add([
    game.sprite("ring", { anim: "spin" }),
    game.area(),
    game.scale(4),
    game.anchor("center"),
    game.pos(pos),
    game.offscreen(),
    "ring",
  ]);

  return ring;
}
