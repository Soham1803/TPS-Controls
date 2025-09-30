# 🎮 Third-Person Controls

[![npm version](https://badge.fury.io/js/%40soham1803%2Fthird-person-controls.svg)](https://badge.fury.io/js/%40soham1803%2Fthird-person-controls)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern, reusable third-person shooter controls for React Three Fiber applications. Built with TypeScript and featuring smooth camera controls, realistic physics, and advanced animation systems.

## ✨ Features

- 🎯 **Smooth Third-Person Camera** with intelligent collision detection
- 🏃 **Realistic Movement System** - Walk, run, strafe, jump with physics
- 🔫 **Dynamic Shooting System** with muzzle flash effects and recoil
- 🎨 **Advanced Animation System** using FBX animations with smooth transitions
- 🌍 **Physics Integration** powered by Rapier physics engine
- 📦 **TypeScript Ready** with full type definitions
- 🏗️ **Modular Architecture** - import only what you need

## 📦 Installation

```bash
npm install @soham1803/third-person-controls
```

### Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom @react-three/fiber @react-three/drei @react-three/rapier three
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Player } from '@soham1803/third-person-controls';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Physics>
          {/* Ground */}
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[100, 1, 100]} />
            <meshStandardMaterial color="gray" />
          </mesh>
          
          {/* Player with controls */}
          <Player position={[0, 1, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
```

## 🎮 Controls

| Key | Action |
|-----|--------|
| `W/A/S/D` | Move forward/left/backward/right |
| `F` (hold) | Run |
| `Space` | Jump |
| `Mouse` | Look around |
| `Right Click` (hold) | Zoom/Aim |
| `Left Click` | Shoot |

## 📚 API Reference

### Player Component

The main player component with third-person controls.

```tsx
<Player 
  position={[0, 0, 0]}
  // ... other THREE.Group props
/>
```

**Props:**
- Extends `React.ComponentProps<'group'>`
- All standard THREE.Group properties are supported

### Modular Exports

Import individual modules for custom implementations:

```tsx
import {
  // Core functions
  handleMovement,
  handleJump,
  handleShooting,
  updateCamera,
  useAnimationSetup,
  
  // Types
  MovementParams,
  CameraParams,
  JumpParams
} from '@soham1803/third-person-controls';
```

## 🏗️ Architecture

The package is built with a modular architecture:

- **`Player`** - Main component orchestrating all systems
- **`camera`** - Third-person camera with collision detection
- **`movement`** - Physics-based player movement
- **`shooting`** - Raycast-based shooting system
- **`animation`** - FBX animation management
- **`physics`** - Rapier physics integration

## 🎯 Advanced Usage

### Custom Animation Setup

```tsx
import { useAnimationSetup } from '@soham1803/third-person-controls';

function CustomPlayer() {
  const { actions, mixer } = useAnimationSetup(scene);
  
  // Use actions and mixer for custom animation logic
}
```

### Manual Camera Control

```tsx
import { updateCamera } from '@soham1803/third-person-controls';

// In your component
updateCamera({
  zoom: zoomRef,
  smoothedPlayerPosition: playerPosRef,
  smoothedCameraPosition: cameraPosRef,
  // ... other params
});
```

## 📋 Requirements

- React >=18.0.0
- @react-three/fiber >=8.0.0
- @react-three/drei >=9.0.0
- @react-three/rapier >=1.0.0
- three >=0.150.0

## 🤝 Contributing

We welcome contributions! Check out our [contribution guidelines](https://github.com/Soham1803/third-person-shooter-controls/blob/main/CONTRIBUTING.md).

## 📄 License

MIT License - see [LICENSE](https://github.com/Soham1803/third-person-shooter-controls/blob/main/LICENSE) for details.

## 🔗 Links

- [Demo](https://your-demo-url.com)
- [GitHub](https://github.com/Soham1803/third-person-shooter-controls)
- [Issues](https://github.com/Soham1803/third-person-shooter-controls/issues)
- [NPM](https://www.npmjs.com/package/@soham1803/third-person-controls)
