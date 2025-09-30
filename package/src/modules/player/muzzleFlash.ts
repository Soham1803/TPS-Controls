import * as THREE from 'three';
import type { MuzzleFlashParams } from './types';
import { MUZZLE_FLASH_DURATION, MUZZLE_FLASH_LIGHT_INTENSITY } from './constants';

export function handleMuzzleFlash({
  muzzleFlashActive,
  muzzleFlashStartTime,
  muzzleFlashRef,
  muzzleFlashLightRef,
  gunBarrelRef,
  group,
  bones,
  pitch,
  yaw,
  camera
}: MuzzleFlashParams): void {
  if (muzzleFlashActive.current) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - muzzleFlashStartTime.current;
    const progress = Math.min(elapsedTime / MUZZLE_FLASH_DURATION, 1);

    if (progress < 1) {
      // Calculate gun barrel position (approximate position in front of right hand)
      if (group.current) {
        const handWorldPosition = new THREE.Vector3();
        bones[3].getWorldPosition(handWorldPosition);
        
        // Offset forward from the hand to simulate gun barrel
        const gunOffset = new THREE.Vector3(0, 0.2, 1); // Adjust based on your gun model
        const mflashQuat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(pitch, yaw, 0, 'YXZ')
        );
        gunOffset.applyQuaternion(mflashQuat);
        gunBarrelRef.current.copy(handWorldPosition).add(gunOffset);
      }

      // Flash intensity with quick fade
      const flashIntensity = 1 - Math.pow(progress, 2); // Quick fade out
      
      // Update muzzle flash position and visibility
      if (muzzleFlashRef.current) {
        muzzleFlashRef.current.position.copy(gunBarrelRef.current);
        muzzleFlashRef.current.lookAt(camera.position); // Always face camera
        muzzleFlashRef.current.visible = true;
        
        // Scale variation for more dynamic effect
        const scale = 0.3 + Math.random() * 0.2; // Random scale between 0.3-0.5
        muzzleFlashRef.current.scale.setScalar(scale * flashIntensity);
        
        // Rotate randomly for variety
        muzzleFlashRef.current.rotation.z = Math.random() * Math.PI * 2;
      }

      // Update muzzle flash light
      if (muzzleFlashLightRef.current) {
        muzzleFlashLightRef.current.position.copy(gunBarrelRef.current.clone().add(new THREE.Vector3(0, 0.1, 0.3)));
        muzzleFlashLightRef.current.intensity = MUZZLE_FLASH_LIGHT_INTENSITY * flashIntensity;
        muzzleFlashLightRef.current.visible = true;
      }
    } else {
      // Hide flash when animation is complete
      if (muzzleFlashRef.current) {
        muzzleFlashRef.current.visible = false;
      }
      if (muzzleFlashLightRef.current) {
        muzzleFlashLightRef.current.visible = false;
      }
      muzzleFlashActive.current = false;
    }
  }
}
