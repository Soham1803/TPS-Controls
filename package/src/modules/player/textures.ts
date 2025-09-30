import * as THREE from 'three';

export function createMuzzleFlashTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  
  // Create radial gradient for flash effect
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');      // Bright white center
  gradient.addColorStop(0.3, 'rgba(255, 200, 100, 0.8)');  // Orange-yellow
  gradient.addColorStop(0.6, 'rgba(255, 100, 0, 0.4)');    // Orange fade
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');          // Transparent red edge
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  
  // Add some noise/texture for realism
  const imageData = ctx.getImageData(0, 0, 128, 128);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Add slight random variation to alpha channel
    data[i + 3] *= (0.8 + Math.random() * 0.4);
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
