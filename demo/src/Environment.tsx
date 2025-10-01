import { RigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

// Moving Platform Component with Player Carrying
function MovingPlatform({ position, color = '#38a169' }: { position: [number, number, number], color?: string }) {
  const rigidBodyRef = useRef<any>();
  const timeRef = useRef(0);
  const previousPositionRef = useRef({ x: position[0], y: position[1], z: position[2] });
  const [playersOnPlatform, setPlayersOnPlatform] = useState<Set<any>>(new Set());

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (rigidBodyRef.current) {
      // Calculate new position
      const x = position[0] + Math.sin(timeRef.current * 2) * 2; // Reduced to 2 units
      const y = position[1];
      const z = position[2];
      
      // Calculate movement delta
      const deltaX = x - previousPositionRef.current.x;
      const deltaZ = z - previousPositionRef.current.z;
      
      // Move any players that are on this platform
      playersOnPlatform.forEach(playerBody => {
        if (playerBody && playerBody.translation) {
          const currentPos = playerBody.translation();
          playerBody.setTranslation({
            x: currentPos.x + deltaX,
            y: currentPos.y,
            z: currentPos.z + deltaZ
          }, true);
        }
      });
      
      // Update platform position
      rigidBodyRef.current.setNextKinematicTranslation({ x, y, z });
      
      // Store previous position
      previousPositionRef.current = { x, y, z };
    }
  });

  const handleCollisionEnter = (payload: any) => {
    // Check if it's the player (you might need to adjust this check based on your player setup)
    if (payload.other.rigidBodyObject?.name === 'player' || 
        payload.other.rigidBody?.userData?.isPlayer) {
      setPlayersOnPlatform(prev => new Set(prev).add(payload.other.rigidBody));
    }
  };

  const handleCollisionExit = (payload: any) => {
    if (payload.other.rigidBodyObject?.name === 'player' || 
        payload.other.rigidBody?.userData?.isPlayer) {
      setPlayersOnPlatform(prev => {
        const newSet = new Set(prev);
        newSet.delete(payload.other.rigidBody);
        return newSet;
      });
    }
  };

  return (
    <RigidBody 
      ref={rigidBodyRef} 
      position={position} 
      type="kinematicPosition" 
      colliders="cuboid"
      onCollisionEnter={handleCollisionEnter}
      onCollisionExit={handleCollisionExit}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 0.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        MOVING
      </Text>
    </RigidBody>
  );
}

// Swinging Target Component
function SwingingTarget({ position }: { position: [number, number, number] }) {
  const rigidBodyRef = useRef<any>();
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (rigidBodyRef.current) {
      const swingAngle = Math.sin(timeRef.current * 1.5) * 0.5; // Swing back and forth
      const radius = 3;
      const x = position[0] + Math.sin(swingAngle) * radius;
      const y = position[1] - Math.cos(swingAngle) * radius + radius;
      const z = position[2];
      rigidBodyRef.current.setNextKinematicTranslation({ x, y, z });
    }
  });

  return (
    <RigidBody friction={0.5} ref={rigidBodyRef} position={position} type="kinematicPosition" colliders="cuboid">
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color={'#e53e3e'} />
      </mesh>
      <Text
        position={[0, 0, 0.9]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        SWING
      </Text>
    </RigidBody>
  );
}

export function Environment() {
  return (
    <>
      {/* Ground */}
      <RigidBody position={[0, 0, 0]} type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color={'#4a5568'} />
        </mesh>
      </RigidBody> 
     

      {/* Target 2 - Moving Target */}
      <MovingPlatform position={[8, 0, -15]} color="brown" />


      {/* Platforms and Obstacles - Adjusted for 0.5 unit jump height */}
      
      {/* Platform 1 - Low platform (jumpable) */}
      <RigidBody position={[15, 0.4, 10]} type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6, 0.3, 6]} />
          <meshStandardMaterial color={'#2d3748'} />
        </mesh>
      </RigidBody>
      
      {/* Platform 1 Low Wall for cover */}
      <RigidBody position={[15, 1, 7]} type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[6, 1, 0.5]} />
          <meshStandardMaterial color={'#4a5568'} />
        </mesh>
      </RigidBody>

      {/* Platform 2 - Step platform (0.3 units high - easily jumpable) */}
      <RigidBody position={[-12, 0.3, -8]} type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4, 0.3, 8]} />
          <meshStandardMaterial color={'#2d3748'} />
        </mesh>
      </RigidBody>

      {/* Cover Boxes */}
      <RigidBody position={[5, 1, 0]} type="dynamic" friction={0.8} colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={'#8b4513'} />
        </mesh>
      </RigidBody>

      <RigidBody position={[-5, 0.75, 5]} type="dynamic" friction={0.8} colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 1.5, 1]} />
          <meshStandardMaterial color={'#8b4513'} />
        </mesh>
      </RigidBody>

      <RigidBody position={[10, 0.5, -5]} type="dynamic" friction={0.8} colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 1, 3]} />
          <meshStandardMaterial color={'#8b4513'} />
        </mesh>
      </RigidBody>


      {/* Walls for Cover */}
      <RigidBody position={[0, 1.5, -30]} type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[20, 3, 1]} />
          <meshStandardMaterial color={'#718096'} />
        </mesh>
      </RigidBody>

      <RigidBody position={[25, 1.5, -15]} type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 3, 20]} />
          <meshStandardMaterial color={'#718096'} />
        </mesh>
      </RigidBody>

      <RigidBody position={[-25, 1.5, -15]} type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 3, 20]} />
          <meshStandardMaterial color={'#718096'} />
        </mesh>
      </RigidBody>

      {/* Ramps for Parkour - Lower angle for easier access */}
      <RigidBody position={[12, 0.2, 2]} type="fixed" colliders="trimesh">
        <mesh castShadow receiveShadow rotation={[0, 0, Math.PI/12]}>
          <boxGeometry args={[4, 0.2, 3]} />
          <meshStandardMaterial color={'#2d3748'} />
        </mesh>
      </RigidBody>

      <RigidBody position={[-12, 0.2, 2]} type="fixed" colliders="trimesh">
        <mesh castShadow receiveShadow rotation={[0, 0, -Math.PI/12]}>
          <boxGeometry args={[4, 0.2, 3]} />
          <meshStandardMaterial color={'#2d3748'} />
        </mesh>
      </RigidBody>

      {/* Low Platforms - All within jump reach */}
      <RigidBody position={[0, 0.4, -5]} type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.3, 3]} />
          <meshStandardMaterial color={'#2d3748'} />
        </mesh>
      </RigidBody>

      <RigidBody position={[2, 0.9, -2]} type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 0.3, 2]} />
          <meshStandardMaterial color={'#2d3748'} />
        </mesh>
      </RigidBody>

      <RigidBody position={[-3, 1.4, -1]} type="fixed" colliders="cuboid">
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 0.3, 2]} />
          <meshStandardMaterial color={'#2d3748'} />
        </mesh>
      </RigidBody>

      {/* Destructible Targets - More responsive to hits */}
      <RigidBody position={[-3, 1.9, 1]} type="dynamic" friction={0.3} colliders="cuboid" mass={0.1}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 3, 0.2]} />
          <meshStandardMaterial color={'#ed8936'} />
        </mesh>
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          50pts
        </Text>
      </RigidBody>

      <RigidBody position={[-20, 1.5, -18]} type="dynamic" friction={0.3} colliders="cuboid" mass={0.1}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 3, 0.2]} />
          <meshStandardMaterial color={'brown'} />
        </mesh>
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          50pts
        </Text>
      </RigidBody>


      <RigidBody position={[-6, 1.5, -7]} type="dynamic" friction={0.3} colliders="cuboid" mass={0.1}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 3, 0.2]} />
          <meshStandardMaterial color={'brown'} />
        </mesh>
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          50pts
        </Text>
      </RigidBody>


      <RigidBody position={[0, 1.5, 18]} type="dynamic" friction={0.3} colliders="cuboid" mass={0.1}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 3, 0.2]} />
          <meshStandardMaterial color={'brown'} />
        </mesh>
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          50pts
        </Text>
      </RigidBody>

      {/* Additional Moving Target */}
      <MovingPlatform position={[-10, 0.8, -12]} color="brown" />

      {/* Swinging Target - Now actually swings */}
      <SwingingTarget position={[0, 6, -15]} />

      {/* Range Markers */}
      <Text
        position={[0, 0.1, -10]}
        fontSize={1}
        color="#718096"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI/2, 0, 0]}
      >
        10m
      </Text>

      <Text
        position={[0, 0.1, -20]}
        fontSize={1}
        color="#718096"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI/2, 0, 0]}
      >
        20m
      </Text>

      <Text
        position={[0, 0.1, -30]}
        fontSize={1}
        color="#718096"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI/2, 0, 0]}
      >
        30m
      </Text>
    </>
  );
}
