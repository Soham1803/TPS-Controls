import React from 'react';
import { KeyboardControls, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Player } from "tps-controls"
import { Physics } from '@react-three/rapier';
import { Environment } from './Environment';

// Get the correct asset path for GitHub Pages deployment
const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/'
  return base + path.replace(/^\//, '')
}

function App() {

  return (
    <div>
      <span
        style={{
          position: 'absolute',
          backgroundImage: `url('${getAssetPath('svgs/crosshair.svg')}')`,
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
        camera={{zoom: 2}}
        shadows
      >
        <OrbitControls />
        <ambientLight intensity={0.1} />
        <directionalLight 
          color={'yellow'} 
          position={[10, 15, 5]} 
          intensity={0.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
          shadow-bias={-0.0001}
        />
        <directionalLight color={'orange'} position={[5, 0, -10]} intensity={0.5} />
        <gridHelper args={[50, 50]} />
        <Physics gravity={[0, -9.81, 0]} >
          {/* Import comprehensive shooting range environment */}
          <Environment />
          
          {/* Player - uses default assets from package */}
          <Player 
            castShadow 
            receiveShadow 
          />
        </Physics>
      </Canvas>
    </KeyboardControls>
    </div>
  )
}

export default App
