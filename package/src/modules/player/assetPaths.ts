/**
 * Asset path utilities for TPS Controls package
 */

// Global base path for assets - can be configured by the consuming application
let assetBasePath = '';

/**
 * Set the base path for all package assets
 * This should be called by the consuming application to set the correct path
 * for their deployment environment
 */
export function setAssetBasePath(basePath: string) {
  assetBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

/**
 * Get the base path for assets
 */
export function getAssetBasePath() {
  return assetBasePath;
}

/**
 * Get the full path for a package asset
 */
export function getAssetPath(relativePath: string) {
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return assetBasePath ? `${assetBasePath}/${cleanPath}` : `/${cleanPath}`;
}

// Default animation paths - these will be resolved at runtime
export const DEFAULT_ANIMATION_PATHS = {
  idle: 'animations/pistol-idle.fbx',
  walkForward: 'animations/pistol-walk.fbx',
  walkBackward: 'animations/pistol-walk-backward.fbx',
  runForward: 'animations/pistol-run.fbx',
  runBackward: 'animations/pistol-run-backward.fbx',
  strafeLeft: 'animations/pistol-strafe-left.fbx',
  strafeRight: 'animations/pistol-strafe-right.fbx',
  jumpStart: 'animations/pistol-jump-1.fbx',
  jumpEnd: 'animations/pistol-jump-2.fbx',
} as const;

export const DEFAULT_MODEL_PATH = 'models/player.glb';
export const DEFAULT_AUDIO_PATH = 'sfx/pistol-shot.mp3';
