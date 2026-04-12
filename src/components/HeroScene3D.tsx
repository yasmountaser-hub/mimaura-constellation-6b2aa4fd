import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FloatingOrb = ({ position, color, size, speed, distort }: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
  distort: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.8}
          distort={distort}
          speed={2}
        />
      </Sphere>
    </Float>
  );
};

const SmallOrbs = () => {
  const count = 30;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const t = state.clock.elapsedTime;
      dummy.position.set(
        positions[i * 3] + Math.sin(t * 0.5 + i) * 0.3,
        positions[i * 3 + 1] + Math.cos(t * 0.3 + i) * 0.4,
        positions[i * 3 + 2]
      );
      dummy.scale.setScalar(0.02 + Math.sin(t + i * 0.5) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#c4b5fd" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const WobbleRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
  });

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <torusGeometry args={[3, 0.04, 16, 100]} />
      <MeshWobbleMaterial
        color="#a78bfa"
        transparent
        opacity={0.2}
        factor={0.3}
        speed={1}
      />
    </mesh>
  );
};

const HeroScene3D = () => {
  return (
    <div className="absolute inset-0 -z-5" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e9d5ff" />
        <pointLight position={[-5, -3, 3]} intensity={0.4} color="#fbbf24" />

        {/* Main orb */}
        <FloatingOrb position={[2.5, 0.5, 0]} color="#a78bfa" size={1.2} speed={1.5} distort={0.4} />

        {/* Secondary orbs */}
        <FloatingOrb position={[-3, -1, -1]} color="#f9a8d4" size={0.7} speed={2} distort={0.3} />
        <FloatingOrb position={[0, 2, -2]} color="#93c5fd" size={0.5} speed={1.8} distort={0.5} />
        <FloatingOrb position={[-1.5, 1.5, 1]} color="#fcd34d" size={0.4} speed={2.2} distort={0.2} />

        {/* Particle field */}
        <SmallOrbs />

        {/* Rotating ring */}
        <WobbleRing />
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
