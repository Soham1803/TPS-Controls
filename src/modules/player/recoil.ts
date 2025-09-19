import type { RecoilParams } from './types';
import { RECOIL_DURATION, RECOIL_STRENGTH } from './constants';

export function handleRecoil({
  recoilActive,
  recoilStartTime,
  leftHandBone,
  rightHandBone,
  leftHandOriginalRotation,
  rightHandOriginalRotation
}: RecoilParams): void {
  if (recoilActive.current && leftHandBone.current && rightHandBone.current) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - recoilStartTime.current;
    const progress = Math.min(elapsedTime / RECOIL_DURATION, 1);

    if (progress < 1) {
      // Apply recoil with easing (quick up, slow down)
      const recoilIntensity = Math.sin(progress * Math.PI) * RECOIL_STRENGTH;
      
      // Apply the recoil rotation
      leftHandBone.current.rotation.copy(leftHandOriginalRotation.current);
      rightHandBone.current.rotation.copy(rightHandOriginalRotation.current);
      
      // Optional: Add slight side-to-side motion for more realism
      leftHandBone.current.rotation.z += recoilIntensity * 0.05;
      rightHandBone.current.rotation.z -= recoilIntensity * 0.05;
    } else {
      // Reset to original positions
      leftHandBone.current.rotation.copy(leftHandOriginalRotation.current);
      rightHandBone.current.rotation.copy(rightHandOriginalRotation.current);
      recoilActive.current = false;
    }
  }
}
