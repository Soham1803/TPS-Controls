import React from 'react';
import { KeyboardControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Player } from "tps-controls"
import { Physics, RigidBody } from '@react-three/rapier';

function ShadowExample() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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
        <Canvas 
          style={{ height: '100vh', width: '100vw', margin: '0' }} 
          camera={{ zoom: 2 }}
          shadows // Enable shadow rendering
        >
          {/* Ambient light for general illumination */}
          <ambientLight intensity={0.2} />
          
          {/* Main shadow-casting directional light (sun) */}
          <directionalLight 
            color={'#ffffff'} 
            position={[10, 15, 5]} 
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-bias={-0.0001}
          />
          
          {/* Secondary fill light (no shadows) */}
          <directionalLight 
            color={'#87CEEB'} 
            position={[-5, 5, -10]} 
            intensity={0.3} 
          />
          
          <Physics gravity={[0, -9.81, 0]}>
            {/* Ground plane - receives shadows */}
            <RigidBody position={[0, 0, 0]} type="fixed" colliders="cuboid">
              <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color={'#6B7280'} />
              </mesh>
            </RigidBody>
            
            {/* Obstacle boxes - cast and receive shadows */}
            <RigidBody position={[5, 2.5, 0]} type="fixed" friction={0.5} colliders="cuboid">
              <mesh castShadow receiveShadow>
                <boxGeometry args={[3, 5, 1]} />
                <meshStandardMaterial color={'#3B82F6'} />
              </mesh>
            </RigidBody>
            
            <RigidBody position={[-3, 1, 4]} type="fixed" friction={0.5} colliders="cuboid">
              <mesh castShadow receiveShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={'#10B981'} />
              </mesh>
            </RigidBody>
            
            <RigidBody position={[0, 0.5, -6]} type="fixed" friction={0.5} colliders="cuboid">
              <mesh castShadow receiveShadow>
                <boxGeometry args={[4, 1, 2]} />
                <meshStandardMaterial color={'#F59E0B'} />
              </mesh>
            </RigidBody>
            
            {/* Player with shadows enabled */}
            <Player 
              position={[0, 2, 0]}
              castShadow={true}
              receiveShadow={true}
              mass={6}
              friction={0.7}
            />
          </Physics>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default ShadowExample;
