"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useLenis } from "@studio-freight/react-lenis";

function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Track scroll progress to animate the planet
  const scrollProgress = useRef(0);
  
  useLenis((lenis) => {
    // Lenis gives us the current scroll value. We map it to 0-1
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      scrollProgress.current = lenis.scroll / maxScroll;
    }
  });
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.z += delta * 0.05;
      
      // Map scroll progress to the planets position and scale (mimicking Orbyte)
      const p = scrollProgress.current;
      
      // Target coordinates and scale based on scroll
      let targetX = 0;
      let targetY = 0;
      let targetScale = 1;
      
      if (p < 0.2) {
        // Hero section - center
        targetX = 0;
        targetY = 0;
        targetScale = 1;
      } else if (p < 0.5) {
        // About us - moves to the left
        targetX = -1.5;
        targetY = 0;
        targetScale = 0.8;
      } else if (p < 0.7) {
        // Services - moves back and forth slightly
        targetX = p < 0.6 ? 1.5 : -1.5;
        targetY = 0;
        targetScale = 0.7;
      } else if (p < 0.9) {
        // Big phrase - comes to center and zooms in heavily
        targetX = 0;
        targetY = 0;
        targetScale = 2.5;
      } else {
        // Footer - recedes
        targetX = 0;
        targetY = 2; // Moves up as footer comes up
        targetScale = 1.5;
      }

      // Smoothly interpolate current values towards the targets
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
      
      const currentScale = meshRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05);
      meshRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <MeshDistortMaterial
        color="#222222"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.8}
        metalness={0.2}
        wireframe={true}
      />
    </Sphere>
  );
}

function Particles() {
  const count = 500;
  const meshRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation={true} />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Planet />
        <Particles />
      </Canvas>
    </div>
  );
}

