import kaplay from "kaplay";

const game = kaplay({
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

export default game;
