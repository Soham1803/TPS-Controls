import * as THREE from 'three';
import type { MovementPhysicsParams } from './types';
import { MOVE_SPEED, RUN_MULTIPLIER } from './constants';

const directionVector = new THREE.Vector3();

export function updateMovementPhysics({
  forward,
  backward,
  left,
  right,
  run,
  playerYRotation,
  controls,
  smoothedPlayerPosition
}: MovementPhysicsParams): void {
  if (!controls.current) return;

  // Calculate player's forward direction for movement
  const playerForward = new THREE.Vector3(0, 0, -1).applyQuaternion(playerYRotation);
  const playerRight = new THREE.Vector3().crossVectors(playerForward, new THREE.Vector3(0, 1, 0));

  // Movement calculation based on player's orientation
  const moveForward = -(Number(forward) - Number(backward)) * MOVE_SPEED * (run ? RUN_MULTIPLIER : 1);
  const moveRight = -(Number(right) - Number(left)) * MOVE_SPEED * (run ? RUN_MULTIPLIER : 1);

  directionVector
    .copy(playerForward)
    .multiplyScalar(moveForward)
    .add(playerRight.multiplyScalar(moveRight));

  const velocity = controls.current.linvel();
  controls.current.setLinvel({
    x: directionVector.x,
    y: velocity.y,
    z: directionVector.z,
  }, true);

  // Smooth the player position used for camera calculations
  const currentPlayerPos = new THREE.Vector3(
    controls.current.translation().x,
    controls.current.translation().y + 1.55,
    controls.current.translation().z
  );

  smoothedPlayerPosition.current.lerp(currentPlayerPos, 0.15);
}
