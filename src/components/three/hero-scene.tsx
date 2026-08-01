"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Torus, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingSphere({ position, color, scale = 1, speed = 1, distort = 0.3 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingBox({ position, color, scale = 1, speed = 1 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.8} floatIntensity={0.8}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
      </Box>
    </Float>
  );
}

function FloatingTorus({ position, color, scale = 1, speed = 1 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={1} floatIntensity={1.2}>
      <Torus ref={meshRef} args={[1, 0.4, 16, 32]} position={position} scale={scale}>
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </Torus>
    </Float>
  );
}

function Scene() {
  return (
    <>
      {/* Main sphere - Primary color */}
      <FloatingSphere position={[0, 0, 0]} color="#4f46e5" scale={1.5} speed={0.8} distort={0.4} />
      
      {/* Secondary shapes */}
      <FloatingBox position={[-2.5, 1.5, -1]} color="#06b6d4" scale={0.6} speed={1.2} />
      <FloatingBox position={[2.5, -1, -0.5]} color="#8b5cf6" scale={0.5} speed={0.9} />
      
      {/* Torus rings */}
      <FloatingTorus position={[2, 1.5, -2]} color="#ec4899" scale={0.4} speed={1} />
      <FloatingTorus position={[-2, -1.5, -1]} color="#10b981" scale={0.35} speed={1.3} />
      
      {/* Small accent spheres */}
      <FloatingSphere position={[-1.5, 2, 1]} color="#f59e0b" scale={0.3} speed={1.5} distort={0.2} />
      <FloatingSphere position={[1.5, -2, 0.5]} color="#ef4444" scale={0.25} speed={1.4} distort={0.15} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      
      {/* Environment for reflections */}
      <Environment preset="city" />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

export function HeroScene() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ preserveDrawingBuffer: true }}
          id="hero-canvas"
        >
          <Scene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
