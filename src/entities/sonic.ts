import { Vec2, GameObj } from "kaplay";
import game from "../kaplayCtx";
import { GameEntity } from "./game-entity";

export class Sonic extends GameEntity {
  plusPoints: GameObj | null = null;

  constructor(spawnPoint: Vec2) {
    super(
      "sonic",
      "run",
      spawnPoint,
      "sonic",
      true,
      new game.Rect(game.vec2(0, 2), 30, 32),
      {
        jumpForce: 1700,
      }
    );
  }

  setPointsUi() {
    this.obj.plusPoints = this.obj.add([
      game.text("", { font: "mania", size: 24 }),
      game.color(255, 255, 0),
      game.anchor("center"),
      game.pos(30, -10),
    ]);
  }

  setControls() {
    game.onButtonPress("jump", () => {
      if (this.obj.isGrounded()) {
        this.obj.play("jump");
        this.obj.jump();
        game.play("jump", { volume: 0.5 });
      }
    });
    game.onButtonDown("left", () => {
      this.obj.move(-1000, 0);
    });
    game.onButtonDown("right", () => {
      this.obj.move(1000, 0);
    });
  }

  setEvents() {
    this.obj.onGround(() => {
      this.obj.play("run");
    });
  }
}
