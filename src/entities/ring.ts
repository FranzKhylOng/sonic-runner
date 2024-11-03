import { GameObj, Vec2 } from "kaplay";
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
    {
      ringCollectUi: null as GameObj | null,
    },
  ]);

  ring.ringCollectUi = ring.add([
    game.text("", { font: "mania", size: 24 }),
    game.color(255, 255, 0),
    game.anchor("center"),
    game.pos(30, -10),
  ]);

  return ring;
}
