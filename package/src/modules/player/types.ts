import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import type { RapierRigidBody } from '@react-three/rapier';

export type ActionName = 'idle' | 'forwardWalk' | 'backwardWalk' | 'runForward' | 'runBackward' | 'strafeLeft' | 'strafeRight';

export interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

export type GLTFResult = GLTF & {
  nodes: {
    Slide_Highlight_0_1: THREE.Mesh;
    Slide_Highlight_0_2: THREE.Mesh;
    Slide_Highlight_0_3: THREE.Mesh;
    Alpha_Joints: THREE.SkinnedMesh;
    Alpha_Surface: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Highlight: THREE.MeshStandardMaterial;
    Primary: THREE.MeshStandardMaterial;
    Secondary: THREE.MeshStandardMaterial;
    Alpha_Joints_MAT: THREE.MeshStandardMaterial;
    Alpha_Body_MAT: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export interface PlayerProps extends React.ComponentProps<'group'> {
  // Asset paths - all optional with defaults
  modelPath?: string;
  animationPaths?: {
    idle?: string;
    walkForward?: string;
    walkBackward?: string;
    runForward?: string;
    runBackward?: string;
    strafeLeft?: string;
    strafeRight?: string;
    jumpStart?: string;
    jumpEnd?: string;
  };
  audioPath?: string;
  
  // Physics and behavior props
  colliderArgs?: [height: number, radius: number];
  mass?: number;
  restitution?: number;
  friction?: number;
  linearDamping?: number;
  angularDamping?: number;
  
  // Shadow props
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export interface PlayerState {
  wait: boolean;
  isJumping: boolean;
  action: THREE.AnimationAction | null;
}

export interface PlayerRefs {
  group: React.RefObject<THREE.Group>;
  controls: React.RefObject<RapierRigidBody>;
  mouseRotationRef: React.MutableRefObject<{ x: number; y: number }>;
  jumpPressedRef: React.MutableRefObject<boolean>;
  shoot: React.MutableRefObject<boolean>;
  zoom: React.MutableRefObject<boolean>;
  shotSfxRef: React.RefObject<THREE.PositionalAudio>;
  leftHandBone: React.MutableRefObject<THREE.Bone | null>;
  rightHandBone: React.MutableRefObject<THREE.Bone | null>;
  rightPalmBone: React.MutableRefObject<THREE.Bone | null>;
  recoilActive: React.MutableRefObject<boolean>;
  recoilStartTime: React.MutableRefObject<number>;
  leftHandOriginalRotation: React.MutableRefObject<THREE.Euler>;
  rightHandOriginalRotation: React.MutableRefObject<THREE.Euler>;
  muzzleFlashRef: React.RefObject<THREE.Mesh>;
  muzzleFlashLightRef: React.RefObject<THREE.PointLight>;
  muzzleFlashActive: React.MutableRefObject<boolean>;
  muzzleFlashStartTime: React.MutableRefObject<number>;
  gunBarrelRef: React.MutableRefObject<THREE.Vector3>;
  smoothedPlayerPosition: React.MutableRefObject<THREE.Vector3>;
  smoothedCameraPosition: React.MutableRefObject<THREE.Vector3>;
  shootRayDirection: React.MutableRefObject<THREE.Vector3>;
  dotRef: React.RefObject<THREE.Mesh>;
}

export interface JumpParams {
  jumpPressed: boolean;
  isGrounded: boolean;
  wait: boolean;
  isJumping: boolean;
  actions: THREE.AnimationAction[];
  controls: React.RefObject<RapierRigidBody | null>;
  setAction: (action: THREE.AnimationAction) => void;
  setIsJumping: (jumping: boolean) => void;
  setWait: (wait: boolean) => void;
}

export interface MovementParams {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  run: boolean;
  jump: boolean;
  wait: boolean;
  isJumping: boolean;
  actions: THREE.AnimationAction[];
  setAction: (action: THREE.AnimationAction) => void;
}

export interface RecoilParams {
  recoilActive: React.MutableRefObject<boolean>;
  recoilStartTime: React.MutableRefObject<number>;
  leftHandBone: React.MutableRefObject<THREE.Bone | null>;
  rightHandBone: React.MutableRefObject<THREE.Bone | null>;
  leftHandOriginalRotation: React.MutableRefObject<THREE.Euler>;
  rightHandOriginalRotation: React.MutableRefObject<THREE.Euler>;
}

export interface MuzzleFlashParams {
  muzzleFlashActive: React.MutableRefObject<boolean>;
  muzzleFlashStartTime: React.MutableRefObject<number>;
  muzzleFlashRef: React.RefObject<THREE.Mesh | null>;
  muzzleFlashLightRef: React.RefObject<THREE.PointLight | null>;
  gunBarrelRef: React.MutableRefObject<THREE.Vector3>;
  group: React.RefObject<THREE.Group | null>;
  bones: THREE.Bone[];
  pitch: number;
  yaw: number;
  camera: THREE.Camera;
}

export interface CameraParams {
  zoom: React.MutableRefObject<boolean>;
  smoothedPlayerPosition: React.MutableRefObject<THREE.Vector3>;
  smoothedCameraPosition: React.MutableRefObject<THREE.Vector3>;
  playerYRotation: THREE.Quaternion;
  pitch: number;
  yaw: number;
  camera: THREE.Camera;
   
  world?: any; // Optional world for collision detection
}

export interface MovementPhysicsParams {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  run: boolean;
  playerYRotation: THREE.Quaternion;
  controls: React.RefObject<RapierRigidBody | null>;
  smoothedPlayerPosition: React.MutableRefObject<THREE.Vector3>;
}
