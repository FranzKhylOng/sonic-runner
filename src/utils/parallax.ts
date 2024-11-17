import { GameObj } from "kaplay";
import game from "../kaplayCtx";

export function setupParallax(
  images: GameObj[],
  imageWidth: number,
  moveSpeed: number,
  yPos: number
) {
  game.onUpdate(() => {
    if (images[1].pos.x < -imageWidth) {
      images[0].moveTo(images[1].pos.x + imageWidth, yPos ?? images[0].pos.y);
      const shiftedimage = images.shift();
      images.push(shiftedimage!);
    }

    images[0].move(-moveSpeed, 0);
    images[1].move(-moveSpeed, 0);
  });
}
