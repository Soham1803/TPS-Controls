import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import type { RapierRigidBody } from '@react-three/rapier';

export interface ShootingParams {
   
  world: any; // Use any to avoid version conflicts between different RAPIER versions
  camera: THREE.Camera;
  controls: React.RefObject<RapierRigidBody | null>;
  dotRef: React.RefObject<THREE.Mesh | null>;
  shoot: React.RefObject<boolean>;
  shootRayDirection: React.RefObject<THREE.Vector3>;
}

export function handleShooting({
  world,
  camera,
  controls,
  dotRef,
  shoot,
  shootRayDirection
}: ShootingParams): void {
  // Update shoot ray direction
  const newDirection = camera.getWorldDirection(new THREE.Vector3());
  shootRayDirection.current!.copy(newDirection);

  const rayOrigin = new THREE.Vector3().copy(camera.position);

  const shootRay = world.castRay(
    new RAPIER.Ray(rayOrigin, shootRayDirection.current!), 
    100, 
    true
  );

  // Update dot position and check for hits
  if (shootRay && shootRay.collider) {
    const hitRigidBody = shootRay.collider.parent();
    
    // Check if we didn't hit ourselves by comparing handles
    if (hitRigidBody && hitRigidBody.isValid()) {
      const playerHandle = controls.current?.handle;
      const hitHandle = hitRigidBody.handle;
      
      if (playerHandle !== undefined && hitHandle !== playerHandle) {
        const impulseStrength = 0.025;
        const impulsePoint = new THREE.Vector3()
          .copy(rayOrigin)
          .add(shootRayDirection.current!.multiplyScalar(shootRay.timeOfImpact));

        if (dotRef.current) {
          dotRef.current.position.copy(impulsePoint);
        }
       
        if (shoot.current) {
          hitRigidBody.applyImpulseAtPoint(
            {
              x: shootRayDirection.current!.x * impulseStrength,
              y: shootRayDirection.current!.y * impulseStrength,
              z: shootRayDirection.current!.z * impulseStrength
            },
            impulsePoint,
            true
          );
        }
      }
    }
  }
}
