# Getting Started

## Installation

```bash
npm install @soham1803/third-person-controls
```

## Basic Usage

```tsx
import { Player } from '@soham1803/third-person-controls';
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
