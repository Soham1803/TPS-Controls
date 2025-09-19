import * as THREE from 'three';
import type { CameraParams } from './types';
import { DEFAULT_CAMERA_FOV, ZOOM_CAMERA_FOV } from './constants';

export function updateCamera({
  zoom,
  smoothedPlayerPosition,
  smoothedCameraPosition,
  playerYRotation,
  pitch,
  yaw,
  camera
}: CameraParams): void {
  // Camera positioning
  

  // Default third-person orbit camera
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

  // Smooth camera movement (slightly faster when zoomed)
  smoothedCameraPosition.current.lerp(targetCameraPos, zoom.current ? 0.2 : 0.1);
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

    const aimTarget = aimOrigin.clone().add(aimDir.multiplyScalar(10));
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
