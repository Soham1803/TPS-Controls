import type { JumpParams } from './types';

export function handleJump({
  jumpPressed,
  isGrounded,
  wait,
  isJumping,
  actions,
  controls,
  setAction,
  setIsJumping,
  setWait
}: JumpParams): void {
  // Handle jump on single press
  if (jumpPressed && isGrounded && !wait && !isJumping) {
    setAction(actions[8]); // Play jump animation
    setIsJumping(true);
    setWait(true);
    
    const jumpDuration = actions[8].getClip().duration; // Get jump animation duration

    if (controls.current) {
     controls.current.applyImpulse({x: 0, y: 1.3, z: 0}, true);
    }
    
    // Set jump animation duration (adjust based on your animation length)
    setTimeout(() => {
      setIsJumping(false);
    }, jumpDuration * 1000); // Convert to milliseconds
  }

  if (isGrounded && wait && !isJumping) {
    setWait(false);
  }
}
