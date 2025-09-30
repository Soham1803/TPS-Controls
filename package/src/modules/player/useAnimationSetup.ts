import * as THREE from 'three';
import React from 'react';
import { useFBX } from '@react-three/drei';

export function useAnimationSetup(clone: THREE.Object3D) {
  // Import animation from FBX
  const { animations: idle } = useFBX('/animations/pistol-idle.fbx');
  const { animations: walkAhead } = useFBX('/animations/pistol-walk.fbx');
  const { animations: walkBackward } = useFBX('/animations/pistol-walk-backward.fbx');
  const { animations: runAhead } = useFBX('/animations/pistol-run.fbx');
  const { animations: runBackward } = useFBX('/animations/pistol-run-backward.fbx');
  const { animations: strafeLeft } = useFBX('/animations/pistol-strafe-left.fbx');
  const { animations: strafeRight } = useFBX('/animations/pistol-strafe-right.fbx');
  const { animations: jump1 } = useFBX('/animations/pistol-jump-1.fbx');
  const { animations: jump2 } = useFBX('/animations/pistol-jump-2.fbx');

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
