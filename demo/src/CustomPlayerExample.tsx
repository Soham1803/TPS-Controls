import React from 'react';
import { KeyboardControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { 
  Player, 
  // preloadPlayerAssets 
} from "tps-controls"
import { Physics, RigidBody } from '@react-three/rapier';

// Example of preloading custom assets (optional, for performance)
// preloadPlayerAssets('/models/my-custom-character.glb');

/**
 * Example showing how to use the Player component with custom assets
 * This component demonstrates various customization options available
 */
function CustomPlayerExample() {
  return (
    <div>
      <span
        style={{
          position: 'absolute',
          backgroundImage: "url('/svgs/crosshair.svg')",
          width: '50px',
          height: '50px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1000,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
      
      <KeyboardControls 
        map={React.useMemo(() => [
          { name: 'forward', keys: ['ArrowUp', 'w'] },
          { name: 'backward', keys: ['ArrowDown', 's'] },
          { name: 'run', keys: ['f'] },
          { name: 'left', keys: ['ArrowLeft', 'a'] },
          { name: 'right', keys: ['ArrowRight', 'd'] },
          { name: 'jump', keys: ['Space'] },
        ], [])}
      >
        <Canvas style={{ height: '100vh', width: '100vw', margin: '0' }} camera={{zoom: 2}}>
          <ambientLight intensity={0.3} />
          <directionalLight color={'orange'} position={[0, 10, 5]} intensity={1} />
          <directionalLight color={'blue'} position={[5, 0, -10]} intensity={0.5} />
          <gridHelper args={[100, 100]} />
          
          <Physics gravity={[0, -9.81, 0]}>
            {/* Ground */}
            <RigidBody position={[0, 0, 0]} type="fixed" colliders="cuboid">
              <mesh rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color={'gray'} />
              </mesh>
            </RigidBody>
            
            {/* Platform */}
            <RigidBody position={[5, 4, 0]} type="fixed" friction={0.5} colliders="cuboid">
              <mesh>
                <boxGeometry args={[10, 10, 1]} />
                <meshStandardMaterial color={'blue'} />
              </mesh>
            </RigidBody>
            
            {/* Example 1: Player with default assets */}
            <Player position={[0, 1, 0]} />
            
            {/* Example 2: Player with custom assets (uncomment to use)
            <Player 
              position={[10, 1, 0]}
              modelPath="/models/my-character.glb"
              animationPaths={{
                idle: "/animations/custom-idle.fbx",
                walkForward: "/animations/custom-walk.fbx",
                walkBackward: "/animations/custom-walk-backward.fbx",
                runForward: "/animations/custom-run.fbx",
                runBackward: "/animations/custom-run-backward.fbx",
                strafeLeft: "/animations/custom-strafe-left.fbx",
                strafeRight: "/animations/custom-strafe-right.fbx",
                jumpStart: "/animations/custom-jump-start.fbx",
                jumpEnd: "/animations/custom-jump-end.fbx"
              }}
              audioPath="/sfx/custom-shot.mp3"
              // Custom physics properties
              mass={8}
              restitution={0.2}
              friction={0.8}
              linearDamping={0.2}
              angularDamping={0.2}
              colliderArgs={[0.6, 0.4]} // [height, radius]
            />
            */}
            
            {/* Example 3: Heavier, slower player with modified physics
            <Player 
              position={[-10, 1, 0]}
              mass={15}
              friction={1.0}
              linearDamping={0.5}
              colliderArgs={[0.8, 0.5]}
            />
            */}
          </Physics>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default CustomPlayerExample;
