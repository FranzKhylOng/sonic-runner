import game from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";

export default function gameOver(score: number) {
  game.setGravity(0);

  let bestScore: number | null = game.getData("bestScore");

  if (bestScore! < score) {
    game.setData("bestScore", score);
  }

  game.onButtonPress("jump", () => {
    game.go("playGame");
  });

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

  game.add([
    game.text("Game Over", { font: "mania", size: 108 }),
    game.pos(game.center().x, 200), // by pixels, if 1080 is the height of the canvas, y=0 is top and y=1080 is bottom
    game.anchor("center"), //center the text, the default origin of the object is top left
  ]);

  game.add([
    game.text(`Press SPACE/Click/Touch to Play Again. Best Score: ${score}`, {
      font: "mania",
      size: 36,
    }),
    game.pos(game.center().x, game.center().y - 200),
    game.anchor("center"),
  ]);

  makeSonic(game.vec2(200, 745)); //x and y position of sonic

  //i think we can extract the repeated logic into a function
  //function to run every frame
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
      platforms[0].moveTo(platforms[1].pos.x + platformWidth * 2, 450);
      const shiftedPlatform = platforms.shift();

      if (shiftedPlatform) {
        platforms.push(shiftedPlatform);
      }
    }

    platforms[0].move(-4000, 0);
    platforms[1].move(-4000, 0);
  });
}
