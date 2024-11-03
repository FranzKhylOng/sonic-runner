import { makeMotobug } from "../entities/motobug";
import { makeSonic } from "../entities/sonic";
import game from "../kaplayCtx";

export default function playGame() {
  game.setGravity(3100); //the gravity won't do anything if you do not have entities with a body component

  const bgWidth = 1920;
  const platformWidth = 1280;

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

  const sonic = makeSonic(game.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();

  let gameSpeed = 300;

  game.loop(1, () => {
    if (gameSpeed < 4000) gameSpeed += 50;
  });

  const spawnMotobug = () => {
    //motobug is 32x32, so we need to adjust the x,y value to spawn it off screen and at above the platform
    const motobug = makeMotobug(game.vec2(1950, 773));

    motobug.onUpdate(() => {
      if (gameSpeed < 3000) {
        motobug.move(-gameSpeed + 50, 0); //move the motobug faster than the game speed to have effect where the motobug is at a different speed than the event
      }
      motobug.move(-gameSpeed, 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < -32) motobug.destroy();
    });

    const waitTime = game.rand(1, 3);
    game.wait(waitTime, spawnMotobug); //recursively call the function to spawn another motobug infinitely
  };

  spawnMotobug();

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
