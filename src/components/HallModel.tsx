import { useMemo } from 'react';
import * as THREE from 'three';

const HALL_WIDTH = 16;
const HALL_DEPTH = 16;
const WALL_HEIGHT = 3;
const WALL_THICKNESS = 0.3;

export function HallModel() {
  const wallMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1f35',
        transparent: true,
        opacity: 0.6,
        metalness: 0.3,
        roughness: 0.5,
      }),
    []
  );

  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0f1320',
        metalness: 0.1,
        roughness: 0.8,
      }),
    []
  );

  const gridMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#2a3050',
        transparent: true,
        opacity: 0.4,
      }),
    []
  );

  const gridLines = useMemo(() => {
    const lines: THREE.Line[] = [];
    const step = 2;
    for (let x = -HALL_WIDTH / 2; x <= HALL_WIDTH / 2; x += step) {
      const points = [
        new THREE.Vector3(x, 0.01, -HALL_DEPTH / 2),
        new THREE.Vector3(x, 0.01, HALL_DEPTH / 2),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(new THREE.Line(geometry, gridMaterial));
    }
    for (let z = -HALL_DEPTH / 2; z <= HALL_DEPTH / 2; z += step) {
      const points = [
        new THREE.Vector3(-HALL_WIDTH / 2, 0.01, z),
        new THREE.Vector3(HALL_WIDTH / 2, 0.01, z),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(new THREE.Line(geometry, gridMaterial));
    }
    return lines;
  }, [gridMaterial]);

  return (
    <group>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[HALL_WIDTH, 0.2, HALL_DEPTH]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>

      {gridLines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}

      <mesh position={[0, WALL_HEIGHT / 2, -HALL_DEPTH / 2 + WALL_THICKNESS / 2]}>
        <boxGeometry args={[HALL_WIDTH, WALL_HEIGHT, WALL_THICKNESS]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      <mesh position={[0, WALL_HEIGHT / 2, HALL_DEPTH / 2 - WALL_THICKNESS / 2]}>
        <boxGeometry args={[HALL_WIDTH, WALL_HEIGHT, WALL_THICKNESS]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      <mesh position={[-HALL_WIDTH / 2 + WALL_THICKNESS / 2, WALL_HEIGHT / 2, 0]}>
        <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, HALL_DEPTH]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>

      <mesh position={[HALL_WIDTH / 2 - WALL_THICKNESS / 2, WALL_HEIGHT / 2, 0]}>
        <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, HALL_DEPTH]} />
        <primitive object={wallMaterial} attach="material" />
      </mesh>
    </group>
  );
}
