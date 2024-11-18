import kaplay, { KAPLAYCtx } from "kaplay";

class Game {
  private game: KAPLAYCtx;

  constructor() {
    this.game = kaplay({
      width: 1920,
      height: 1080,
      letterbox: true, //scale the canvas to fit the window while maintaining aspect ratio
      background: [0, 0, 0],
      global: false,
      touchToMouse: true, //enable touch events to be converted to mouse events
      buttons: {
        jump: {
          keyboard: ["space"],
          mouse: "left",
        },
        left: {
          keyboard: ["left"],
        },
        right: {
          keyboard: ["right"],
        },
      },
      debugKey: "d",
      debug: true,
    });
  }

  getInstance(): KAPLAYCtx {
    return this.game;
  }

  // Add any additional methods to interact with the game instance if needed
}

const gameInstance = new Game().getInstance();
export default gameInstance;
