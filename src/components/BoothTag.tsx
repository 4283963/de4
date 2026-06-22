import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Booth } from '@/types';
import { useExhibitionStore } from '@/stores/useStore';
import { getHeatColor } from '@/utils/heatmap';

interface BoothTagProps {
  booth: Booth;
}

export function BoothTag({ booth }: BoothTagProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { getTrafficByBoothId, selectedBoothId } = useExhibitionStore();

  const traffic = getTrafficByBoothId(booth.id);
  const count = traffic?.count || 0;
  const level = traffic?.level || 'low';
  const isSelected = selectedBoothId === booth.id;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = booth.position.y + 2.2 + Math.sin(time * 1.5 + booth.id * 0.3) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[booth.position.x, booth.position.y + 2.2, booth.position.z]}
    >
      <Billboard>
        <group>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.2, 0.8]} />
            <meshBasicMaterial
              color={isSelected ? '#00e5ff' : '#0a0e1a'}
              transparent
              opacity={isSelected ? 0.9 : 0.7}
            />
          </mesh>

          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[2.25, 0.85]} />
            <meshBasicMaterial
              color={getHeatColor(level)}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          <Text
            position={[0, 0.15, 0.01]}
            fontSize={0.18}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
          >
            {booth.name}
          </Text>

          <Text
            position={[0, -0.18, 0.01]}
            fontSize={0.22}
            color={getHeatColor(level)}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {count} 人
          </Text>
        </group>
      </Billboard>
    </group>
  );
}
