"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useLenis } from "@studio-freight/react-lenis";

// Orbyte specific parameters extracted from minified bundle
const PLANET_BASE_RADIUS = 6;
const PLANET_RADIUS_MULTIPLIER = 40;
const PLANET_Y_MULTIPLIER = -34.6;

function getCameraPathPosition(progress: number) {
  // Eased progress matching: .5 * Math.pow(2 * A - 1, 3) + .5
  const easedProgress = 0.5 * Math.pow(2 * progress - 1, 3) + 0.5;
  
  // Orbyte path:
  // t = 2 * Math.PI * e
  // n = 6 + 40 * e
  // x = Math.sin(t) * n
  // y = -(34.6 * e)
  // z = Math.cos(t) * n
  const t = 2 * Math.PI * easedProgress;
  const n = PLANET_BASE_RADIUS + PLANET_RADIUS_MULTIPLIER * easedProgress;
  
  return new THREE.Vector3(
    Math.sin(t) * n,
    PLANET_Y_MULTIPLIER * easedProgress,
    Math.cos(t) * n
  );
}

function SceneChoreography() {
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  
  useLenis((lenis) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      scrollTarget.current = lenis.scroll / maxScroll;
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // 1 - Math.exp(-4 * delta) gives a framerate-independent lerp factor (similar to Orbyte)
    const lerpFactor = 1 - Math.exp(-4 * delta);
    
    scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * lerpFactor;
    
    const camPos = getCameraPathPosition(scrollCurrent.current);
    
    // Add mouse parallax
    const camDir = camPos.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const right = up.clone().cross(camDir).normalize();
    const localUp = camDir.clone().cross(right).normalize();
    
    const mouseOffsetX = right.clone().multiplyScalar(0.2 * mouse.current.x);
    const mouseOffsetY = localUp.clone().multiplyScalar(0.2 * mouse.current.y);
    
    const finalCamPos = camPos.clone().add(mouseOffsetX).add(mouseOffsetY);
    
    state.camera.position.lerp(finalCamPos, lerpFactor);
    state.camera.lookAt(0, 0, 0);
    
    // FOV changes
    const targetFov = isMobile ? 54 : 42; 
    // If hovering, they change FOV slightly (40 desktop, 52 mobile). Ignoring hover FOV for exactness unless needed.
    
    // @ts-ignore
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 1 - Math.exp(-3 * delta));
    state.camera.updateProjectionMatrix();
  });

  return null;
}

function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.1 * delta;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.3, 64, 64]}>
      <MeshDistortMaterial
        color="#111111"
        attach="material"
        distort={0.2}
        speed={1.5}
        roughness={0.7}
        metalness={0.8}
        wireframe={false}
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
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, [count]);

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
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.4} sizeAttenuation={true} />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>
        <SceneChoreography />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <Planet />
        <Particles />
      </Canvas>
    </div>
  );
}

