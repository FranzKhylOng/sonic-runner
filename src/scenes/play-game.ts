import { makeBuzzBomber } from "../entities/buzz-bomber";
import { makeMotobug } from "../entities/motobug";
import { makeRing } from "../entities/ring";
import { makeSonic } from "../entities/sonic";
import game from "../kaplayCtx";

export default function playGame() {
  game.setGravity(3100); //the gravity won't do anything if you do not have entities with a body component

  const bgWidth = 1920;
  const platformWidth = 1280;
  let score = 0;

  const backgrounds = [
    //game.add creates a new entity/object for the game
    game.add([
      game.sprite("chemicalBg"),
      game.pos(0, 0),
      game.scale(2),
      game.opacity(0.8),
    ]),
    game.add([
      game.sprite("chemicalBg"),
      game.pos(bgWidth * 2, 0), //put the second bg piece next to the first one for parallax effect, 2x for scale
      game.scale(2),
      game.opacity(0.8),
    ]),
  ];

  const platforms = [
    game.add([
      game.sprite("platforms"),
      game.pos(0, 450),
      game.scale(4),
      game.area(),
    ]),
    game.add([
      game.sprite("platforms"),
      game.pos(platformWidth * 4, 450),
      game.scale(4),
      game.area(),
    ]),
  ];

  const scoreText = game.add([
    game.text("Score: 0", { font: "mania", size: 72 }),
    game.pos(20, 20),
  ]);
  const sonic = makeSonic(game.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();
  //game objects have access to this method, checking if it collides with any object with the specified tag
  sonic.onCollide("enemy", (enemy) => {
    //we can pass the entity that sonic collides with as an argument
    if (!sonic.isGrounded()) {
      game.play("destroy", { volume: 0.5 });
      game.play("hyperRing", { volume: 0.5 });
      game.destroy(enemy);
      sonic.play("jump");
      sonic.jump();
      score += 5;
      scoreText.text = `Score: ${score}`;

      sonic.ringCollectUi!.text = "+5";
      game.wait(1, () => {
        sonic.ringCollectUi!.text = "";
      });
      return;
    }

    game.play("hurt", { volume: 0.5 });
    game.go("gameOver", score);
  });

  sonic.onCollide("flyingEnemy", () => {
    game.play("hurt", { volume: 0.5 });
    game.go("gameOver", score);
  });

  sonic.onCollide("ring", (ring) => {
    game.play("ring", { volume: 0.5 });
    sonic.ringCollectUi!.text = "+1";
    game.wait(1, () => {
      sonic.ringCollectUi!.text = "";
    });
    game.destroy(ring);
    score++;
    scoreText.text = `Score: ${score}`;
  });

  let gameSpeed = 500;

  game.loop(1, () => {
    if (gameSpeed < 4000) gameSpeed += 50;
  });
  //adjust max speed
  const spawnMotobug = () => {
    //motobug is 32x32, so we need to adjust the x,y value to spawn it off screen and at above the platform
    const motobug = makeMotobug(game.vec2(1950, 773));

    motobug.onUpdate(() => {
      if (gameSpeed < 1500) {
        motobug.move(-gameSpeed + 50, 0); //move the motobug faster than the game speed to have effect where the motobug is at a different speed than the event
      }
      motobug.move(-gameSpeed, 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < -32) motobug.destroy();
    });

    const waitTime = game.rand(1, 3); //could be an argument for modularity
    game.wait(waitTime, spawnMotobug); //recursively call the function to spawn another motobug infinitely
  };

  const spawnBuzzBomber = () => {
    //motobug is 32x32, so we need to adjust the x,y value to spawn it off screen and at above the platform
    game.wait(1, () => {
      const buzzBomber = makeBuzzBomber(game.vec2(1950, 220));

      buzzBomber.onUpdate(() => {
        if (gameSpeed < 1500) {
          buzzBomber.move(-gameSpeed + 25, 0); //move the buzzBomber faster than the game speed to have effect where the buzzBomber is at a different speed than the event
        }
        buzzBomber.move(-gameSpeed, 0);
      });

      buzzBomber.onExitScreen(() => {
        if (buzzBomber.pos.x < -32) buzzBomber.destroy();
      });
    });

    const waitTime = game.rand(3, 6); //could be an argument for modularity
    game.wait(waitTime, spawnBuzzBomber); //recursively call the function to spawn another buzzBomber infinitely
  };

  const spawnRing = () => {
    //motobug is 32x32, so we need to adjust the x,y value to spawn it off screen and at above the platform
    const ring = makeRing(game.vec2(1950, 773));

    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });

    ring.onExitScreen(() => {
      if (ring.pos.x < -32) ring.destroy();
    });

    const waitTime = game.rand(0.5, 3.5); //could be an argument for modularity
    game.wait(waitTime, spawnRing); //recursively call the function to spawn another motobug infinitely
  };

  spawnRing();
  spawnMotobug();
  // if (gameSpeed > 1500) {
  spawnBuzzBomber();
  // }

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

  game.onUpdate(() => {
    // Parallax effect when a foreground element moves at a different speed than a background element
    // Check if the second bg piece is off screen
    if (backgrounds[1].pos.x < -bgWidth) {
      // Move the first bg piece to the right of the second bg piece
      backgrounds[0].moveTo(backgrounds[1].pos.x + bgWidth * 2, 0);
      const shiftedBg = backgrounds.shift(); // Remove the first bg piece from the array and return it

      if (shiftedBg) {
        backgrounds.push(shiftedBg); // Add the first bg piece to the end of the array to reset the indexes
      }
    }

    backgrounds[0].move(-100, 0);
    backgrounds[1].move(-100, 0);

    if (platforms[1].pos.x < -platformWidth) {
      platforms[0].moveTo(platforms[1].pos.x + platformWidth, 450);
      const shiftedPlatform = platforms.shift();

      if (shiftedPlatform) {
        platforms.push(shiftedPlatform);
      }
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].move(-gameSpeed, 0);
  });
}
