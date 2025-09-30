import type { MovementParams } from './types';

export function handleMovement({
  forward,
  backward,
  left,
  right,
  run,
  jump,
  wait,
  isJumping,
  actions,
  setAction
}: MovementParams): boolean {
  let actionAssigned = false;
  
  // Only allow movement animations if not jumping
  if (!wait && !isJumping) {
    if (forward || backward) {
      if (run) {
        setAction(actions[forward ? 3 : 4]);
        actionAssigned = true;
      } else {
        setAction(actions[forward ? 1 : 2]);
        actionAssigned = true;
      }

      if (jump) {
        setAction(actions[8]); // Set jump animation based on direction
        actionAssigned = true;
      }
    }
    
    if (left || right) {
      setAction(actions[left ? 5 : 6]);
      actionAssigned = true;
    }

    if (!actionAssigned) {
      setAction(actions[0]);
    }
  }
  
  return actionAssigned;
}
