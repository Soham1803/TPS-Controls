# Getting Started

## Installation

```bash
# Preferred
pnpm add tps-controls

# Or alternatively
npm install tps-controls
```

## Basic Usage

```tsx
import { Player } from 'tps-controls';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

function App() {
  return (
    <Canvas>
      <Physics>
        <Player position={[0, 0, 0]} />
      </Physics>
    </Canvas>
  );
}
```

## Physics Customization

You can customize the player's physical behavior using physics props:

```tsx
<Player 
  position={[0, 0, 0]}
  // Physics properties
  mass={6}                    // Character weight (default: 5)
  friction={0.7}              // Surface grip (default: 0.5)
  restitution={0.2}           // Bounciness (default: 0.3)
  linearDamping={0.15}        // Movement damping (default: 0.1)
  angularDamping={0.15}       // Rotation damping (default: 0.1)
  colliderArgs={[0.6, 0.35]}  // Collision shape [height, radius] (default: [0.5, 0.3])
/>
```

### Physics Props Explained

- **`mass`**: Controls character weight. Higher values = more momentum, harder to stop
- **`friction`**: Surface grip. 0 = slippery (ice), 1 = maximum grip
- **`restitution`**: Bounciness. 0 = no bounce, 1 = super bouncy
- **`linearDamping`**: Movement resistance. Higher values = character stops faster
- **`angularDamping`**: Rotation resistance
- **`colliderArgs`**: Collision capsule dimensions [height, radius]

## Requirements

- React >=18.0.0
- @react-three/fiber >=8.0.0
- @react-three/drei >=9.0.0
- @react-three/rapier >=1.0.0
- three >=0.150.0

## Controls

| Key | Action |
|-----|--------|
| `W/A/S/D` | Move forward/left/backward/right |
| `F` (hold) | Run |
| `Space` | Jump |
| `Mouse` | Look around |
| `Right Click` (hold) | Zoom/Aim |
| `Left Click` | Shoot |
