import React from 'react';
import { KeyboardControls, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Player } from "./Player"
import { Physics, RigidBody } from '@react-three/rapier';

function App() {


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
        <OrbitControls />
        <ambientLight intensity={1} />
        <directionalLight color={'orange'} position={[0, 10, 5]} intensity={1} />
        <gridHelper args={[100, 100]} />
        <Physics gravity={[0, -9.81, 0]} >
          <RigidBody position={[0, 0, 0]} type="fixed" colliders="cuboid">
            <mesh rotation={[-Math.PI/2, 0, 0]}>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color={'gray'} />
            </mesh>
          </RigidBody>
          <RigidBody position={[5, 4, 0]} type="dynamic" friction={0.5} colliders="cuboid">
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={'blue'} />
            </mesh>
          </RigidBody>
          <Player />
        </Physics>
      </Canvas>
    </KeyboardControls>
    </div>
  )
}

export default App
