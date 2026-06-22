import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { HallModel } from './HallModel';
import { HeatSphere } from './HeatSphere';
import { useExhibitionStore } from '@/stores/useStore';
import { BoothTag } from './BoothTag';

export function Scene() {
  const { booths } = useExhibitionStore();

  return (
    <Canvas
      camera={{ position: [12, 10, 12], fov: 50 }}
      gl={{ antialias: true, toneMapping: 0 }}
      style={{ background: 'linear-gradient(to bottom, #05070f, #0a0e1a)' }}
    >
      <color attach="background" args={['#05070f']} />
      <fog attach="fog" args={['#05070f', 15, 40]} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#aaccff" />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#00e5ff" />

      <HallModel />

      {booths.map((booth) => (
        <HeatSphere key={booth.id} booth={booth} />
      ))}

      {booths.map((booth) => (
        <BoothTag key={`tag-${booth.id}`} booth={booth} />
      ))}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2.1}
      />

      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

      <EffectComposer>
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
