# Asset Integration Guide

This guide explains how to integrate your own 3D models, animations, and audio files with the Third-Person Controls package.

## 🎯 Asset Requirements

### 3D Model (.glb/.gltf)

Your 3D model should meet the following requirements:

1. **Rigged Character**: Must be a rigged humanoid character
2. **Bone Structure**: Compatible with Mixamo/standard humanoid bone structure
3. **File Format**: .glb or .gltf format
4. **Optimization**: Optimized for real-time rendering (reasonable polygon count)
5. **Textures**: Embedded or properly referenced textures

**Bone Names Expected** (for hand tracking and animations):
- Hip bone as root
- Standard humanoid skeleton structure
- Hand bones for recoil effects

### Animations (.fbx)

The package expects 9 different animation types:

| Animation Type | Purpose | Loop | Duration |
|----------------|---------|------|----------|
| `idle` | Character standing still | ✅ Yes | Any |
| `walkForward` | Walking forward | ✅ Yes | ~1-2s |
| `walkBackward` | Walking backward | ✅ Yes | ~1-2s |
| `runForward` | Running forward | ✅ Yes | ~0.8-1.5s |
| `runBackward` | Running backward | ✅ Yes | ~0.8-1.5s |
| `strafeLeft` | Side-stepping left | ✅ Yes | ~1-2s |
| `strafeRight` | Side-stepping right | ✅ Yes | ~1-2s |
| `jumpStart` | Jump take-off | ❌ No | ~0.3-0.5s |
| `jumpEnd` | Jump landing | ❌ No | ~0.3-0.5s |

**Animation Guidelines:**
- Use consistent frame rates (30fps recommended)
- Ensure smooth looping for movement animations
- Jump animations should be single-play
- Compatible with your 3D model's bone structure

### Audio (.mp3/.wav/.ogg)

For the shooting sound effect:

1. **Format**: MP3, WAV, or OGG
2. **Duration**: Short (0.1-0.5 seconds)
3. **Quality**: Web-optimized (not too large)
4. **Type**: Gun shot, laser, or any shooting sound

## 📁 File Structure

Place your assets in your project's public folder:

```
public/
├── models/
│   └── my-character.glb
├── animations/
│   ├── my-idle.fbx
│   ├── my-walk.fbx
│   ├── my-walk-backward.fbx
│   ├── my-run.fbx
│   ├── my-run-backward.fbx
│   ├── my-strafe-left.fbx
│   ├── my-strafe-right.fbx
│   ├── my-jump-start.fbx
│   └── my-jump-end.fbx
└── sfx/
    └── my-shot.mp3
```

## 🛠️ Implementation Examples

### Complete Custom Setup

```tsx
import { Player, preloadPlayerAssets } from 'tps-controls';

// Optional: Preload for better performance
preloadPlayerAssets('/models/my-character.glb');

function MyGame() {
  return (
    <Player 
      modelPath="/models/my-character.glb"
      animationPaths={{
        idle: "/animations/my-idle.fbx",
        walkForward: "/animations/my-walk.fbx",
        walkBackward: "/animations/my-walk-backward.fbx",
        runForward: "/animations/my-run.fbx",
        runBackward: "/animations/my-run-backward.fbx",
        strafeLeft: "/animations/my-strafe-left.fbx",
        strafeRight: "/animations/my-strafe-right.fbx",
        jumpStart: "/animations/my-jump-start.fbx",
        jumpEnd: "/animations/my-jump-end.fbx"
      }}
      audioPath="/sfx/my-shot.mp3"
    />
  );
}
```

### Partial Custom Setup

You can override only specific animations:

```tsx
<Player 
  modelPath="/models/my-character.glb"
  animationPaths={{
    idle: "/animations/custom-idle.fbx",
    runForward: "/animations/custom-run.fbx",
    // Other animations will use defaults
  }}
  audioPath="/sfx/custom-shot.mp3"
/>
```

### Model Only

Use your own model with default animations and audio:

```tsx
<Player modelPath="/models/my-character.glb" />
```

## 🎮 Testing Your Assets

1. **Start Simple**: Begin with just a custom model
2. **Add Animations**: Test one animation at a time
3. **Check Console**: Watch for loading errors
4. **Test Controls**: Verify all movement types work
5. **Audio Test**: Ensure shooting sound plays correctly

## 🚨 Troubleshooting

### Common Issues

**Model not loading:**
- Check file path is correct
- Ensure .glb/.gltf is in public folder
- Verify file is not corrupted

**Animations not playing:**
- Confirm bone structure matches model
- Check animation file paths
- Ensure animations are compatible with model

**Physics issues:**
- Adjust `colliderArgs` to match model size
- Modify `mass` and `friction` for different feel

**Audio not playing:**
- Check audio file format is supported
- Verify file path in public folder
- Test audio file plays in browser

### Performance Tips

1. **Optimize Models**: Keep polygon count reasonable
2. **Compress Textures**: Use appropriate texture sizes
3. **Preload Assets**: Use `preloadPlayerAssets()` for critical models
4. **Test on Mobile**: Ensure performance on target devices

## 🔗 Recommended Tools

- **3D Modeling**: Blender, Maya, 3ds Max
- **Animation**: Mixamo (free), Blender
- **Audio Editing**: Audacity (free), Adobe Audition
- **Model Optimization**: glTF-Pipeline, Blender glTF exporter
