import game from "./kaplayCtx";
import mainMenu from "./scenes/main-menu";
import playGame from "./scenes/play-game"; //maybe have an index file for scenes

//maybe put this in a separate file function
game.loadSprite("chemicalBg", "graphics/chemical-bg.png");
game.loadSprite("platforms", "graphics/platforms.png");
game.loadSprite("sonic", "graphics/sonic.png", {
  sliceX: 8, //how many columns there are in the sprite sheet
  sliceY: 2, //how many rows there are in the sprite sheet
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 30 }, //30 frames per second
    jump: { from: 8, to: 15, loop: true, speed: 50 },
  },
});
game.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});
game.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});

game.loadFont("mania", "fonts/mania.ttf");
game.loadSound("destroy", "sounds/Destroy.wav");
game.loadSound("hurt", "sounds/Hurt.wav");
game.loadSound("hyperRing", "sounds/HyperRing.wav");
game.loadSound("jump", "sounds/Jump.wav");
game.loadSound("ring", "sounds/Ring.wav");
game.loadSound("city", "sounds/city.mp3");

game.scene("mainMenu", mainMenu); //we are setting what's the scene function but not calling it
game.scene("playGame", playGame);
game.scene("gameOver", () => {});

game.go("mainMenu"); //go to the main scene
