import { GameObj } from "kaplay";
import game from "../kaplayCtx";
function moveEntity(entity: GameObj, speed: number, offset: number = 0) {
  entity.onUpdate(() => {
    entity.move(-(speed + offset), 0);
  });

  entity.onExitScreen(() => {
    if (entity.pos.x < -32) entity.destroy();
  });
}

export function spawnEntity(
  EntityClass: any,
  position: { x: number; y: number },
  speed: number,
  offset: number = 0,
  waitTimeRange: [number, number],
  spawnEntity: () => void
) {
  const entity = new EntityClass(game.vec2(position.x, position.y)).getEntity();
  moveEntity(entity, speed, offset);
  const waitTime = game.rand(waitTimeRange[0], waitTimeRange[1]);
  game.wait(waitTime, spawnEntity);
}
