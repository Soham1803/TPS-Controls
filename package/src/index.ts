// Main exports
export { Player } from './Player';
export { preloadPlayerAssets } from './utils/preload';

// Module exports
export * from './modules/player/types';
export * from './modules/player/constants';
export { handleMovement } from './modules/player/movement';
export { handleJump } from './modules/player/jump';
export { handleRecoil } from './modules/player/recoil';
export { handleMuzzleFlash } from './modules/player/muzzleFlash';
export { updateCamera } from './modules/player/camera';
export { updateMovementPhysics } from './modules/player/physics';
export { handleShooting } from './modules/player/shooting';
export { createMuzzleFlashTexture } from './modules/player/textures';
export { useAnimationSetup } from './modules/player/useAnimationSetup';

// Re-export types for consumers
export type {
  GLTFResult,
  ActionName,
  JumpParams,
  MovementParams,
  RecoilParams,
  MuzzleFlashParams,
  CameraParams,
  MovementPhysicsParams
} from './modules/player/types';
