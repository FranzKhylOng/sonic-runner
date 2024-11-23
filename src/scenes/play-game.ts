import { GameObj } from "kaplay";
import { BuzzBomber } from "../entities/buzz-bomber";
import { MotoBug } from "../entities/motobug";
import { Ring } from "../entities/ring";
import { Sonic } from "../entities/sonic";
import game from "../kaplayCtx";
import { createBackgrounds, createPlatforms, setupParallax } from "../utils";
import { bgWidth, platformHeight, platformWidth } from "../config";
import { spawnEntity } from "../utils/spawn-enemy";

export function playGame() {
  game.setGravity(3100); //the gravity won't do anything if you do not have entities with a body component

  let score = 0;

  const backgrounds = createBackgrounds(bgWidth);
  const platforms = createPlatforms(platformWidth, platformHeight);

  const scoreText = game.add([
    game.text("Score: 0", { font: "mania", size: 72 }),
    game.pos(20, 20),
  ]);
  const sonic = new Sonic(game.vec2(200, 745)).getEntity();

  //game objects have access to this method, checking if it collides with any object with the specified tag
  sonic.onCollide("enemy", (enemy: GameObj) => {
    //we can pass the entity that sonic collides with as an argument
    if (!sonic.isGrounded()) {
      game.play("destroy", { volume: 0.5 });
      game.play("hyperRing", { volume: 0.5 });
      game.destroy(enemy);
      sonic.play("jump");
      sonic.jump();

      score = score + 5;
      game.setData("score", score);
      scoreText.text = `Score: ${score}`;

      sonic.plusPoints!.text = "+5";
      game.wait(1, () => {
        sonic.plusPoints!.text = "";
      });
      return;
    }
    game.play("hurt", { volume: 0.5 });
    game.go("gameOver");
  });

  sonic.onCollide("flyingEnemy", () => {
    game.play("hurt", { volume: 0.5 });
    game.go("gameOver");
  });

  sonic.onCollide("ring", (ring: GameObj) => {
    game.play("ring", { volume: 0.5 });
    sonic.plusPoints!.text = "+1";
    game.wait(1, () => {
      sonic.plusPoints!.text = "";
    });
    game.destroy(ring);

    score++;
    game.setData("score", score);
    scoreText.text = `Score: ${score}`;
  });

  let gameSpeed = 1000;

  game.loop(1, () => {
    if (gameSpeed < 4000) gameSpeed += 50;
  });
  //adjust max speed

  const spawnMotobug = () =>
    spawnEntity(
      MotoBug,
      { x: 1950, y: 773 },
      gameSpeed,
      25,
      [1, 3],
      spawnMotobug
    );

  const spawnBuzzBomber = () =>
    spawnEntity(
      BuzzBomber,
      { x: 1950, y: 220 },
      gameSpeed,
      50,
      [4, 8],
      spawnBuzzBomber
    );

  const spawnRing = () =>
    spawnEntity(Ring, { x: 1950, y: 773 }, gameSpeed, 0, [0.5, 3.5], spawnRing);

  spawnRing();
  spawnMotobug();
  spawnBuzzBomber();

  game.add([
    game.rect(1, 1080),
    game.opacity(0),
    game.area(),
    game.pos(-1, 0),
    game.body({ isStatic: true }),
  ]);

  game.add([
    game.rect(1, 1080),
    game.opacity(0),
    game.area(),
    game.pos(1921, 0),
    game.body({ isStatic: true }),
  ]);

  game.add([
    game.rect(1920, 300),
    game.opacity(0),
    game.area(), //enables collision detection
    game.pos(0, 832), //y value that matches the platform sprite
    game.body({ isStatic: true }), //enables physics
  ]);

  setupParallax(backgrounds, bgWidth, 100, 0);
  setupParallax(platforms, platformWidth, gameSpeed, platformHeight);
}
