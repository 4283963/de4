import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Booth, TrafficLevel } from '@/types';
import { getHeatColorThree, getHeatIntensity, getSphereScale } from '@/utils/heatmap';
import { useExhibitionStore } from '@/stores/useStore';

interface HeatSphereProps {
  booth: Booth;
}

export function HeatSphere({ booth }: HeatSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { getTrafficByBoothId, getMinMaxCount, setSelectedBoothId, selectedBoothId } =
    useExhibitionStore();

  const traffic = getTrafficByBoothId(booth.id);
  const { min, max } = getMinMaxCount();

  const level: TrafficLevel = traffic?.level || 'low';
  const count = traffic?.count || 0;
  const baseColor = useMemo(() => getHeatColorThree(level), [level]);
  const intensity = getHeatIntensity(level);
  const scale = getSphereScale(count, min, max);
  const isSelected = selectedBoothId === booth.id;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(time * 2 + booth.id * 0.5) * 0.08;

    if (meshRef.current) {
      const targetScale = scale * pulse * (hovered || isSelected ? 1.2 : 1);
      meshRef.current.scale.setScalar(targetScale);
    }
    if (outerRef.current) {
      const outerPulse = 1.3 + Math.sin(time * 1.5 + booth.id * 0.3) * 0.15;
      const targetScale = scale * outerPulse * (hovered || isSelected ? 1.3 : 1);
      outerRef.current.scale.setScalar(targetScale);
      const material = outerRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = 0.15 + Math.sin(time * 2 + booth.id) * 0.05;
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedBoothId(isSelected ? null : booth.id);
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={[booth.position.x, booth.position.y + 1.2, booth.position.z]}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={intensity * (hovered || isSelected ? 1.5 : 1)}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={outerRef}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight
        color={baseColor}
        intensity={intensity * 0.8}
        distance={3}
        decay={2}
      />
    </group>
  );
}
