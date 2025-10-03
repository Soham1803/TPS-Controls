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
# Preferred
pnpm add tps-controls

# Or alternatively
npm install tps-controls
```

### Peer Dependencies

Make sure you have these installed in your project:

```bash
# Preferred
pnpm add react react-dom @react-three/fiber @react-three/drei @react-three/rapier three

# Or alternatively
npm install react react-dom @react-three/fiber @react-three/drei @react-three/rapier three
```

## 🚀 Quick Start

### Basic Usage (with default assets)

```tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Player } from 'tps-controls';

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
          
          {/* Player with default assets and basic physics customization */}
          <Player 
            position={[0, 1, 0]}
            mass={6}              // Slightly heavier than default
            friction={0.7}        // More grip on surfaces
            restitution={0.2}     // Less bouncy
          />
        </Physics>
      </Canvas>
    </div>
  );
}
```

### Custom Assets

You can easily use your own 3D model, animations, and audio files:

```tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Player, preloadPlayerAssets } from 'tps-controls';

// Preload your custom assets for better performance
preloadPlayerAssets('/models/my-character.glb');

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Physics>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[100, 1, 100]} />
            <meshStandardMaterial color="gray" />
          </mesh>
          
          <Player 
            position={[0, 1, 0]}
            modelPath="/models/my-character.glb"
            animationPaths={{
              idle: "/animations/my-idle.fbx",
              walkForward: "/animations/my-walk.fbx",
              runForward: "/animations/my-run.fbx",
              jumpStart: "/animations/my-jump-start.fbx",
              jumpEnd: "/animations/my-jump-end.fbx"
              // ... other animations are optional and will use defaults
            }}
            audioPath="/sfx/my-gun-shot.mp3"
            // Customize physics behavior
            mass={8}                    // Heavier character = more momentum
            friction={0.8}              // Higher friction = less sliding
            restitution={0.1}           // Lower bounce factor
            linearDamping={0.2}         // Higher damping = stops faster
            angularDamping={0.2}        // Rotation damping
            colliderArgs={[0.6, 0.4]}   // [height, radius] - larger collider
          />
        </Physics>
      </Canvas>
    </div>
  );
}
```

## 🎨 Customization Options

### Physics Behavior

The Player component uses Rapier physics and provides several props to customize the physical behavior:

```tsx
<Player 
  // Basic physics props
  mass={5}                    // Character weight (affects momentum and jump height)
  friction={0.5}              // Surface grip (0 = ice, 1 = sticky)
  restitution={0.3}           // Bounciness (0 = no bounce, 1 = super bouncy)
  linearDamping={0.1}         // Movement resistance (higher = stops faster)
  angularDamping={0.1}        // Rotation resistance
  colliderArgs={[0.5, 0.3]}   // Collision shape [height, radius]
  
  // Examples of different character feels:
  
  // Heavy tank-like character
  mass={12}
  friction={0.9}
  linearDamping={0.3}
  
  // Light, agile character  
  mass={3}
  friction={0.4}
  linearDamping={0.05}
  
  // Bouncy character
  restitution={0.8}
  mass={4}
/>
```

### PlayerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelPath` | `string` | `'/models/player.glb'` | Path to your 3D model (.glb/.gltf) |
| `animationPaths` | `AnimationPaths` | Default pistol animations | Custom animation file paths |
| `audioPath` | `string` | `'/sfx/pistol-shot.mp3'` | Path to shooting sound effect |
| `colliderArgs` | `[number, number]` | `[0.5, 0.3]` | Capsule collider [height, radius] |
| `mass` | `number` | `5` | Physics body mass |
| `restitution` | `number` | `0.3` | Bounce factor (0-1) |
| `friction` | `number` | `0.5` | Surface friction (0-1) |
| `linearDamping` | `number` | `0.1` | Movement damping |
| `angularDamping` | `number` | `0.1` | Rotation damping |
| `castShadow` | `boolean` | `false` | Whether the player casts shadows |
| `receiveShadow` | `boolean` | `false` | Whether the player receives shadows |

### Shadow Rendering

Enable dynamic shadows for more realistic lighting:

```tsx
// Enable shadows in your Canvas
<Canvas shadows>
  {/* Add shadow-casting lights */}
  <directionalLight 
    position={[10, 15, 5]} 
    intensity={1.2}
    castShadow
    shadow-mapSize-width={2048}    // Higher = better quality, lower performance
    shadow-mapSize-height={2048}
    shadow-camera-far={50}
    shadow-camera-left={-25}      // Adjust these values to cover your scene
    shadow-camera-right={25}      // Larger values = more area covered
    shadow-camera-top={25}
    shadow-camera-bottom={-25}
    shadow-bias={-0.0001}         // Prevents shadow acne
  />
  
  <Physics>
    {/* Ground receives shadows */}
    <mesh position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="gray" />
    </mesh>
    
    {/* Player casts and receives shadows */}
    <Player 
      castShadow={true}      // Player casts shadows
      receiveShadow={true}   // Player receives shadows from other objects
    />
  </Physics>
</Canvas>
```

**Shadow Configuration Tips:**
- Use `shadow-bias={-0.0001}` to prevent shadow acne (dark artifacts)
- The `shadow-camera-*` props define the area where shadows are rendered
- Make them large enough to cover your playable area
- Larger values = more area covered but lower shadow resolution
- For a 100x100 ground plane, use values like `±25` to `±50`

### Animation Paths

```tsx
interface AnimationPaths {
  idle?: string;           // Character standing still
  walkForward?: string;    // Walking forward
  walkBackward?: string;   // Walking backward  
  runForward?: string;     // Running forward
  runBackward?: string;    // Running backward
  strafeLeft?: string;     // Side-stepping left
  strafeRight?: string;    // Side-stepping right
  jumpStart?: string;      // Jump take-off animation
  jumpEnd?: string;        // Jump landing animation
}
```

## 🎯 Asset Requirements

### 3D Model (.glb/.gltf)
- Rigged humanoid character with standard bone structure
- Compatible with mixamo animations
- Optimized for real-time rendering

### Animations (.fbx)
- Mixamo-compatible bone structure
- Loop-ready animations (except jump animations)
- Consistent frame rates for smooth transitions

### Audio (.mp3/.wav/.ogg)
- Short duration shooting sound effect
- Optimized file size for web delivery

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
} from 'tps-controls';
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
import { useAnimationSetup } from 'tps-controls';

function CustomPlayer() {
  const { actions, mixer } = useAnimationSetup(scene);
  
  // Use actions and mixer for custom animation logic
}
```

### Manual Camera Control

```tsx
import { updateCamera } from 'tps-controls';

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

## � Troubleshooting

### Installation Issues

```bash
# Package not found
npm install tps-controls
# or
pnpm add tps-controls

# Peer dependency warnings
npm install @react-three/fiber @react-three/drei @react-three/rapier three
```

### Runtime Issues

- **Physics not working**: Ensure your component is wrapped in `<Physics>` from `@react-three/rapier`
- **Assets not loading**: Check that your asset paths are correct and files exist in `public/`
- **TypeScript errors**: Make sure you have the latest version with `pnpm add tps-controls@latest`

For more help, see the [main repository documentation](https://github.com/Soham1803/third-person-shooter-controls).

## �📄 License

MIT License - see [LICENSE](https://github.com/Soham1803/third-person-shooter-controls/blob/main/LICENSE) for details.

## 🔗 Links

- [Demo](https://your-demo-url.com)
- [GitHub](https://github.com/Soham1803/third-person-shooter-controls)
- [Issues](https://github.com/Soham1803/third-person-shooter-controls/issues)
- [NPM](https://www.npmjs.com/package/tps-controls)
