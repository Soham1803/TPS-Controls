import { useGLTF } from '@react-three/drei';

// Helper function to preload assets
export function preloadPlayerAssets(modelPath = '/models/player.glb') {
  useGLTF.preload(modelPath);
}

// Preload default assets
preloadPlayerAssets();
