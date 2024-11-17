import game from "./kaplayCtx";
import { mainMenu, playGame, gameOver } from "./scenes";
import { loadSprites } from "./utils";
//maybe put this in a separate file function

loadSprites();

game.loadFont("mania", "fonts/mania.ttf");
game.loadSound("destroy", "sounds/Destroy.wav");
game.loadSound("hurt", "sounds/Hurt.wav");
game.loadSound("hyperRing", "sounds/HyperRing.wav");
game.loadSound("jump", "sounds/Jump.wav");
game.loadSound("ring", "sounds/Ring.wav");
game.loadSound("bg", "sounds/bg.mp3");

game.scene("mainMenu", mainMenu); //we are setting what's the scene function but not calling it
game.scene("playGame", playGame);
game.scene("gameOver", gameOver);

game.go("mainMenu"); //go to the main scene
