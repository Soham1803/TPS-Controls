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
const amplitude = zoom.current ? 1 : 4;
const adder = zoom.current ? 1 : 3;
const zoomAdjuster = Math.sin(pitch);
const cameraDistance = amplitude * zoomAdjuster + adder;
const baseCameraHeight = 1.5;
const orbitAngle = pitch;

const cameraOffset = new THREE.Vector3(
    zoom.current ? -0.3 : 0,
    Math.sin(orbitAngle) * cameraDistance + baseCameraHeight,
    -Math.cos(orbitAngle) * cameraDistance
);

cameraOffset.applyQuaternion(playerYRotation);

const targetCameraPos = new THREE.Vector3(
    smoothedPlayerPosition.current.x + cameraOffset.x,
    smoothedPlayerPosition.current.y + cameraOffset.y - 1.6,
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

  // Camera rotation
  const currentAimDir = new THREE.Vector3();
  
  if (zoom.current) {
    // Aim from the same yaw as the player plus pitch
    const aimQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(yaw + Math.PI, pitch, 0, 'YXZ'));
      
      

    currentAimDir.set(0, 0, -1).applyQuaternion(aimQuat);

    // Aim origin: head anchor
    const aimOrigin = smoothedPlayerPosition.current.clone().add(new THREE.Vector3(0, 1.5, 0));
    const aimTarget = aimOrigin.clone().add(currentAimDir.clone().multiplyScalar(10));
    camera.lookAt(aimTarget);
  } else {
    // Default: look at player
    currentAimDir.copy(camera.getWorldDirection(new THREE.Vector3()));
    camera.lookAt(
      smoothedPlayerPosition.current.clone().add(new THREE.Vector3(0, 0.5, 0))
    );
  }
}

export function getShootDirection(camera: THREE.Camera): THREE.Vector3 {
  return camera.getWorldDirection(new THREE.Vector3());
}
