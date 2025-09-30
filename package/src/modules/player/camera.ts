import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import type { CameraParams } from './types';
import { DEFAULT_CAMERA_FOV, ZOOM_CAMERA_FOV } from './constants';

// Camera collision detection function with enhanced multi-ray sampling
function checkCameraCollision(
  playerPosition: THREE.Vector3, 
  cameraPosition: THREE.Vector3, 
   
  world: any, // RAPIER world - using any to avoid version conflicts
  minDistance = 0.2 // Minimum distance from player when collision occurs
): { position: THREE.Vector3; hasCollision: boolean } {
  if (!world) {
    return { position: cameraPosition, hasCollision: false }; // No collision detection if world not available
  }

  const direction = new THREE.Vector3()
    .subVectors(cameraPosition, playerPosition)
    .normalize();
  
  const fullDistance = playerPosition.distanceTo(cameraPosition);
  const playerHeadPosition = playerPosition.clone().add(new THREE.Vector3(0, 1.6, 0)); // Player head height
  
  // Main ray from player head towards camera
  const mainRay = new RAPIER.Ray(
    {
      x: playerHeadPosition.x,
      y: playerHeadPosition.y,
      z: playerHeadPosition.z
    },
    {
      x: direction.x,
      y: direction.y,
      z: direction.z
    }
  );

  let closestHit = world.castRay(mainRay, fullDistance, true);
  let shortestDistance = closestHit ? closestHit.timeOfImpact : fullDistance;

  // Additional rays with offset directions to create a detection cone
  // This is more effective than parallel rays as it simulates camera volume collision
  const directionOffsets = [
    { x: 0.05, y: 0.05, z: 0 },   // Up-right
    { x: -0.05, y: 0.05, z: 0 },  // Up-left  
    { x: 0.05, y: -0.05, z: 0 },  // Down-right
    { x: -0.05, y: -0.05, z: 0 }, // Down-left
    { x: 0, y: 0.08, z: 0 },      // Straight up
    { x: 0, y: -0.08, z: 0 },     // Straight down
    { x: 0.08, y: 0, z: 0 },      // Straight right
    { x: -0.08, y: 0, z: 0 }      // Straight left
  ];

  // Cast additional rays with offset directions to create a cone of detection
  for (const dirOffset of directionOffsets) {
    // Create slightly offset direction vector
    const offsetDirection = new THREE.Vector3(
      direction.x + dirOffset.x,
      direction.y + dirOffset.y, 
      direction.z + dirOffset.z
    ).normalize();

    const offsetRay = new RAPIER.Ray({
      x: playerHeadPosition.x,
      y: playerHeadPosition.y,
      z: playerHeadPosition.z
    }, {
      x: offsetDirection.x,
      y: offsetDirection.y,
      z: offsetDirection.z
    });

    const hit = world.castRay(offsetRay, fullDistance, true);
    if (hit && hit.timeOfImpact < shortestDistance) {
      shortestDistance = hit.timeOfImpact;
      closestHit = hit;
    }
  }
  
  if (closestHit && shortestDistance < fullDistance - 0.3) { // Larger buffer to avoid false positives
    // There's an obstacle between player and camera
    // Place camera just before the obstacle, but not closer than minDistance
    const safeDistance = Math.max(shortestDistance - 0.2, minDistance);
    
    const adjustedPosition = new THREE.Vector3()
      .copy(playerHeadPosition)
      .add(direction.multiplyScalar(safeDistance));
      
    return { position: adjustedPosition, hasCollision: true };
  }
  
  // No collision, use ideal position
  return { position: cameraPosition, hasCollision: false };
}

export function updateCamera({
  zoom,
  smoothedPlayerPosition,
  smoothedCameraPosition,
  playerYRotation,
  pitch,
  yaw,
  camera,
  world
}: CameraParams): void {
  // Camera positioning - RESTORED TO ORIGINAL IMPLEMENTATION
  const amplitude = zoom.current ? 0.2 : 4;
  const adder = zoom.current ? 0.1 : 3;
  const zoomAdjuster = zoom.current ? Math.cos(pitch) : Math.sin(pitch);
  const cameraDistance = amplitude * (zoomAdjuster) + adder; // Adjust camera distance based on pitch
  const baseCameraHeight = zoom.current ? 1.65 : 1.5; // Base height of the camera above the player
  const orbitAngle = pitch;

  const cameraOffset = new THREE.Vector3(
    zoom.current ? -0.35 : 0,
    Math.sin(orbitAngle) * cameraDistance + baseCameraHeight, // Adjust height based on pitch
    -Math.cos(orbitAngle) * cameraDistance
  ); // Move camera further back
  
  cameraOffset.applyQuaternion(playerYRotation);

  const targetCameraPos = new THREE.Vector3(
    smoothedPlayerPosition.current.x + cameraOffset.x,
    smoothedPlayerPosition.current.y + cameraOffset.y - 1.6, // Subtract the offset we added
    smoothedPlayerPosition.current.z + cameraOffset.z
  );

  // Apply camera collision detection - CONSERVATIVE APPROACH
  const playerHeadPosition = smoothedPlayerPosition.current.clone();
  
  // Start with the natural camera position
  let finalCameraPosition = targetCameraPos;
  
  // Only check collision if world exists
  if (world) {
    const naturalDistance = targetCameraPos.distanceTo(playerHeadPosition);
    
    const collisionResult = checkCameraCollision(
      playerHeadPosition,
      targetCameraPos,
      world,
      0.2 // Very small minimum distance - only prevent clipping through walls
    );
    
    // Only use collision adjustment if:
    // 1. Collision was detected
    // 2. The collision adjustment is actually closer than natural position
    if (collisionResult.hasCollision) {
      const collisionDistance = collisionResult.position.distanceTo(playerHeadPosition);
      
      // Only use collision position if it's actually pulling the camera closer
      if (collisionDistance < naturalDistance - 0.1) { // Small threshold to avoid micro-adjustments
        finalCameraPosition = collisionResult.position;
      }
    }
  }

  // Use original lerp speed - no enhanced smoothing
  const finalLerpSpeed = zoom.current ? 0.2 : 0.1;
  
  smoothedCameraPosition.current.lerp(finalCameraPosition, finalLerpSpeed);
  camera.position.copy(smoothedCameraPosition.current);

  // Type guard to check if camera is PerspectiveCamera
  if (camera instanceof THREE.PerspectiveCamera) {
    // Smooth FOV transition between default and zoom FOV
    const targetFov = zoom.current ? ZOOM_CAMERA_FOV : DEFAULT_CAMERA_FOV;
    camera.fov += (targetFov - camera.fov) * 0.15;
    camera.zoom = zoom.current ? 1 : 2;

    // Make near plane smaller while zooming to avoid clipping with the model
    camera.near = zoom.current ? 0.01 : 0.1;

    camera.updateProjectionMatrix();
  }

  // Camera rotation - RESTORED TO ORIGINAL IMPLEMENTATION
  if (zoom.current) {
    // Look in the direction of the gun point
    // Use right palm as aim origin if available
    const aimOrigin = new THREE.Vector3();
    
    aimOrigin.copy(smoothedPlayerPosition.current).add(new THREE.Vector3(0, 1.5, 0));
    

    // Compute aim direction from yaw/pitch (match shooting direction)
    const aimQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(-pitch, yaw + Math.PI, 0, 'YXZ')
    );
    const aimDir = new THREE.Vector3(0.1, 0, -1).applyQuaternion(aimQuat);

    const aimTarget = aimOrigin.clone().add(aimDir.multiplyScalar(15));
    camera.lookAt(aimTarget);

  } else {
     // Default: look at player
    camera.lookAt(
      smoothedPlayerPosition.current.clone().add(new THREE.Vector3(0, 0.5, 0))
    );

  }
}

export function getShootDirection(camera: THREE.Camera): THREE.Vector3 {
  return camera.getWorldDirection(new THREE.Vector3());
}
