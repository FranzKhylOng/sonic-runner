import game from "../kaplayCtx";

export function loadSprites() {
  game.loadSprite("chemicalBg", "../graphics/chemical-bg.png");
  game.loadSprite("platforms", "../graphics/platforms.png");
  game.loadSprite("sonic", "../graphics/sonic.png", {
    sliceX: 8, //how many columns there are in the sprite sheet
    sliceY: 2, //how many rows there are in the sprite sheet
    anims: {
      run: { from: 0, to: 7, loop: true, speed: 30 }, //30 frames per second
      jump: { from: 8, to: 15, loop: true, speed: 50 },
    },
  });
  game.loadSprite("ring", "../graphics/ring.png", {
    sliceX: 16,
    sliceY: 1,
    anims: {
      spin: { from: 0, to: 15, loop: true, speed: 30 },
    },
  });
  game.loadSprite("motobug", "../graphics/motobug.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
      run: { from: 0, to: 4, loop: true, speed: 8 },
    },
  });
  game.loadSprite("buzzbomber", "../graphics/buzzbomber.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      fly: { from: 0, to: 3, loop: true, speed: 8 },
    },
  });
}
