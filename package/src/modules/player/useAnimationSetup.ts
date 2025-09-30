import * as THREE from 'three';
import React from 'react';
import { useFBX } from '@react-three/drei';

interface AnimationPaths {
  idle?: string;
  walkForward?: string;
  walkBackward?: string;
  runForward?: string;
  runBackward?: string;
  strafeLeft?: string;
  strafeRight?: string;
  jumpStart?: string;
  jumpEnd?: string;
}

// Default animation paths
const DEFAULT_ANIMATIONS: Required<AnimationPaths> = {
  idle: '/animations/pistol-idle.fbx',
  walkForward: '/animations/pistol-walk.fbx',
  walkBackward: '/animations/pistol-walk-backward.fbx',
  runForward: '/animations/pistol-run.fbx',
  runBackward: '/animations/pistol-run-backward.fbx',
  strafeLeft: '/animations/pistol-strafe-left.fbx',
  strafeRight: '/animations/pistol-strafe-right.fbx',
  jumpStart: '/animations/pistol-jump-1.fbx',
  jumpEnd: '/animations/pistol-jump-2.fbx',
};

export function useAnimationSetup(clone: THREE.Object3D, customAnimations?: AnimationPaths) {
  // Merge custom animations with defaults
  const animationPaths = React.useMemo(() => ({
    ...DEFAULT_ANIMATIONS,
    ...customAnimations,
  }), [customAnimations]);

  // Import animation from FBX
  const { animations: idle } = useFBX(animationPaths.idle);
  const { animations: walkAhead } = useFBX(animationPaths.walkForward);
  const { animations: walkBackward } = useFBX(animationPaths.walkBackward);
  const { animations: runAhead } = useFBX(animationPaths.runForward);
  const { animations: runBackward } = useFBX(animationPaths.runBackward);
  const { animations: strafeLeft } = useFBX(animationPaths.strafeLeft);
  const { animations: strafeRight } = useFBX(animationPaths.strafeRight);
  const { animations: jump1 } = useFBX(animationPaths.jumpStart);
  const { animations: jump2 } = useFBX(animationPaths.jumpEnd);

  // Clone and rename all animations in a single useMemo
  const animationClips = React.useMemo(() => {
    const clips = [
      idle[0].clone(),
      walkAhead[0].clone(),
      walkBackward[0].clone(),
      runAhead[0].clone(),
      runBackward[0].clone(),
      strafeLeft[0].clone(),
      strafeRight[0].clone(),
      jump1[0].clone(),
      jump2[0].clone()
    ];

    clips[0].name = 'idle';
    clips[1].name = 'forwardWalk';
    clips[2].name = 'backwardWalk';
    clips[3].name = 'runForward';
    clips[4].name = 'runBackward';
    clips[5].name = 'strafeLeft';
    clips[6].name = 'strafeRight';
    clips[7].name = 'jump1';
    clips[8].name = 'jump2';

    return clips;
  }, [idle, walkAhead, walkBackward, runAhead, runBackward, strafeLeft, strafeRight, jump1, jump2]);

  const mixer = React.useMemo(() => new THREE.AnimationMixer(clone), [clone]);
  const actions = React.useMemo(() => [] as THREE.AnimationAction[], []);

  return { actions, mixer, animationClips };
}
