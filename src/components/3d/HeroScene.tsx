"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile } from "@/lib/hooks";

const waveVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vElevation;
  varying float vDistToCenter;

  void main() {
    vec3 pos = position;
    float dist = length(pos.xz);
    vDistToCenter = dist;
    float wave1 = sin(pos.x * 0.4 + uTime * 0.3) * 0.8;
    float wave2 = cos(pos.z * 0.3 + uTime * 0.25) * 0.6;
    float wave3 = sin((pos.x + pos.z) * 0.2 + uTime * 0.4) * 0.5;
    float mouseInfluence = smoothstep(8.0, 0.0, length(pos.xz - uMouse * 10.0));
    pos.y += wave1 + wave2 + wave3 + mouseInfluence * 1.5;
    vElevation = pos.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const waveFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vElevation;
  varying float vDistToCenter;

  void main() {
    float fade = smoothstep(20.0, 6.0, vDistToCenter);
    float elevationAlpha = 0.5 + 0.5 * smoothstep(-2.0, 2.0, vElevation);
    gl_FragColor = vec4(uColor, uOpacity * fade * elevationAlpha);
  }
`;

function WavePlane({ simplified, paused }: { simplified: boolean; paused: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color("#3b82f6") },
      uOpacity: { value: 0.12 },
    }),
    []
  );

  useFrame((state) => {
    if (paused || !matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (!simplified) {
      const m = matRef.current.uniforms.uMouse.value as THREE.Vector2;
      m.set(
        THREE.MathUtils.lerp(m.x, pointer.x, 0.02),
        THREE.MathUtils.lerp(m.y, pointer.y, 0.02)
      );
    }
  });

  const segments = simplified ? 40 : 64;

  return (
    <mesh rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -3, -2]}>
      <planeGeometry args={[40, 40, segments, segments]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={waveVertexShader}
        fragmentShader={waveFragmentShader}
        transparent
        wireframe
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function GlassShape({ simplified, paused }: { simplified: boolean; paused: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (paused || !meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
    if (!simplified) {
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        pointer.x * 0.4,
        0.015
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        pointer.y * 0.3,
        0.015
      );
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={simplified ? 1.2 : 1.5}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#2563eb"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.1}
          transmission={0.6}
          thickness={1.5}
          ior={1.5}
          envMapIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={meshRef} scale={simplified ? 1.22 : 1.52}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

function SphereParticles({ count, paused }: { count: number; paused: boolean }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 5 + Math.random() * 3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (paused || !points.current) return;
    points.current.rotation.y += delta * 0.015;
    points.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3b82f6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene({ paused = false }: { paused?: boolean }) {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 200 : 400;

  const onCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
    state.gl.toneMapping = THREE.NoToneMapping;
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ antialias: !isMobile, alpha: true }}
        onCreated={onCreated}
        frameloop={paused ? "demand" : "always"}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#3b82f6" />
        <pointLight position={[-8, -5, -5]} intensity={0.3} color="#60a5fa" />
        <WavePlane simplified={isMobile} paused={paused} />
        <GlassShape simplified={isMobile} paused={paused} />
        <SphereParticles count={particleCount} paused={paused} />
      </Canvas>
    </div>
  );
}
