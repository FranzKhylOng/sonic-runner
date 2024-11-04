import { Vec2, GameObj } from "kaplay";
import game from "../kaplayCtx";

export function makeSonic(pos: Vec2) {
  //js dev wants a pattern where a function constructs sonic, cause of this i think we could have a Sonic class
  const sonic = game.add([
    game.sprite("sonic", { anim: "run" }), //set default animation to run
    game.scale(4),
    game.area({ shape: new game.Rect(game.vec2(0, 2), 30, 32) }), //to have automatic hitbox
    game.anchor("center"), //the default origin of the object is top left, we do this tp position along the center
    game.pos(pos),
    game.body({ jumpForce: 1700 }), //enables physics
    {
      //extra properties/methods
      ringCollectUi: null as GameObj | null,
      setControls() {
        game.onButtonPress("jump", () => {
          // @ts-ignore
          if (this.isGrounded()) {
            // @ts-ignore
            this.play("jump"); //play the jump animation
            // @ts-ignore
            this.jump(); //builtin function to jump
            game.play("jump", { volume: 0.5 }); //play the jump sound
          }
        });
        game.onButtonDown("left", () => {
          // @ts-ignore
          this.move(-1000, 0); //move left
          // @ts-ignore
          // this.scale.x = -4; //flip the sprite
        });
        game.onButtonDown("right", () => {
          // @ts-ignore
          this.move(1000, 0); //move right
          // @ts-ignore
          this.scale.x = 4; //flip the sprite
        });
      },
      setEvents() {
        // @ts-ignore
        this.onGround(() => {
          // @ts-ignore
          this.play("run"); //play the run animation
        });
      },
    },
  ]);

  sonic.ringCollectUi = sonic.add([
    game.text("", { font: "mania", size: 24 }),
    game.color(255, 255, 0),
    game.anchor("center"),
    game.pos(30, -10),
  ]);

  return sonic;
}
