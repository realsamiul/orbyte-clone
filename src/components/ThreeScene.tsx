"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Sphere, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { ScrollStore } from "./ScrollStore";

const PLANET_BASE_RADIUS = 6;
const PLANET_RADIUS_MULTIPLIER = 40;
const PLANET_Y_MULTIPLIER = -34.6;

// 1. Fresnel Atmospheric Glow Shader Material
const FresnelGlowMaterial = shaderMaterial(
  {
    glowColor: new THREE.Color("#ffffff"),
    glowPower: 2.2, // Softer, broader rim glow
    glowIntensity: 0.9, // Higher luminance to stand out on rich dark backgrounds
  },
  // Vertex Shader: Compute normals and view vectors in view space
  `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader: Compute rim glow based on view vector / normal alignment
  `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform vec3 glowColor;
    uniform float glowPower;
    uniform float glowIntensity;
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      // Fresnel term: 1.0 at edges (perpendicular), 0.0 at center (aligned)
      float intensity = pow(1.0 - max(dot(normal, viewDir), 0.0), glowPower);
      gl_FragColor = vec4(glowColor, intensity * glowIntensity);
    }
  `
);

// Register custom shader material with react-three-fiber
extend({ FresnelGlowMaterial });

function getCameraPathPosition(progress: number) {
  // Orbyte specific eased progress formula matching their WebGL bundle
  const easedProgress = 0.5 * Math.pow(2 * progress - 1, 3) + 0.5;
  
  const t = 2 * Math.PI * easedProgress;
  const n = PLANET_BASE_RADIUS + PLANET_RADIUS_MULTIPLIER * easedProgress;
  
  return new THREE.Vector3(
    Math.sin(t) * n,
    PLANET_Y_MULTIPLIER * easedProgress,
    Math.cos(t) * n
  );
}

interface SceneRef {
  globeOpacity: number;
}

function SceneChoreography({ sceneRef }: { sceneRef: React.MutableRefObject<SceneRef> }) {
  const scrollCurrent = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    const lerpFactor = 1 - Math.exp(-4 * safeDelta);
    
    // Read from the globally bridged scroll store
    scrollCurrent.current += (ScrollStore.progress - scrollCurrent.current) * lerpFactor;
    
    // Fade out globe after ~33% of scroll (when animation completes)
    if (scrollCurrent.current > 0.33) {
      const fadeProgress = (scrollCurrent.current - 0.33) / 0.15;
      sceneRef.current.globeOpacity = Math.max(0, 1 - fadeProgress);
    } else {
      sceneRef.current.globeOpacity = 1;
    }
    
    const camPos = getCameraPathPosition(scrollCurrent.current);
    
    const camDir = camPos.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const right = up.clone().cross(camDir).normalize();
    const localUp = camDir.clone().cross(right).normalize();
    
    const mouseOffsetX = right.clone().multiplyScalar(0.3 * mouse.current.x);
    const mouseOffsetY = localUp.clone().multiplyScalar(0.3 * mouse.current.y);
    
    const finalCamPos = camPos.clone().add(mouseOffsetX).add(mouseOffsetY);
    
    state.camera.position.lerp(finalCamPos, lerpFactor);
    state.camera.lookAt(0, 0, 0);
    
    const targetFov = isMobile ? 54 : 42; 
    // @ts-ignore
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov, 1 - Math.exp(-3 * safeDelta));
    state.camera.updateProjectionMatrix();
  });

  return null;
}

interface OrbitalRingProps {
  radius: number;
  rotationX?: number;
  rotationY?: number;
  color?: string;
  opacity?: number;
}

// concentric thin orbital ring paths matching the editorial aesthetics
function OrbitalRing({
  radius,
  rotationX = 0,
  rotationY = 0,
  color = "#ffffff",
  opacity = 0.15,
}: OrbitalRingProps) {
  const segments = 128;
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <lineLoop 
      geometry={geometry} 
      rotation={[rotationX, rotationY, 0]}
    >
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineLoop>
  );
}

function Planet({ opacityRef }: { opacityRef: React.MutableRefObject<SceneRef> }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const dotsRef = useRef<THREE.Points>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.04 * safeDelta;
    }
    if (dotsRef.current) {
      dotsRef.current.rotation.y += 0.08 * safeDelta;
      dotsRef.current.rotation.x += 0.02 * safeDelta;
    }
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.y -= 0.03 * safeDelta;
    }
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = opacityRef.current.globeOpacity;
        } else if (child instanceof THREE.Points) {
          child.material.opacity = opacityRef.current.globeOpacity;
        }
      });
    }
  });

  // Create a SphereGeometry and use its vertices for the glowing dotted grid
  const dottedGeometry = useMemo(() => {
    // 32 x 32 segments provides an elegant density of dots without being overwhelming
    return new THREE.SphereGeometry(1.295, 32, 32);
  }, []);

  return (
    <group ref={groupRef}>
      {/* A. Core Planet (Opacity Blocker: Blocks objects, particles, and rings behind the sphere) */}
      <Sphere ref={coreRef} args={[1.28, 64, 64]}>
        <meshStandardMaterial
          color="#040404"
          roughness={0.95}
          metalness={0.9}
          transparent={true}
        />
      </Sphere>

      {/* B. Dotted grid globe wrapper (The premium glowing grid of StitchMark) */}
      <points ref={dotsRef} geometry={dottedGeometry}>
        <pointsMaterial
          color="#ffffff"
          size={0.015} // tiny glowing vertices
          transparent={true}
          opacity={0.35}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>

      {/* C. Atmospheric rim-lighting (Volumetric Halo) */}
      <Sphere args={[1.32, 64, 64]}>
        {/* @ts-ignore */}
        <fresnelGlowMaterial
          glowColor={new THREE.Color("#ffffff")}
          glowPower={2.0} // Shaper edge rim
          glowIntensity={0.65}
          transparent={true}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </Sphere>

      {/* D. Interactive Orbital concentric ring systems */}
      <group ref={ringGroupRef}>
        <OrbitalRing radius={1.7} rotationX={0.4} rotationY={0.2} opacity={0.2} />
        <OrbitalRing radius={2.2} rotationX={-0.3} rotationY={0.5} opacity={0.15} />
        <OrbitalRing radius={2.8} rotationX={0.2} rotationY={-0.4} opacity={0.1} />
        <OrbitalRing radius={3.5} rotationX={0.5} rotationY={-0.1} opacity={0.06} />
      </group>
    </group>
  );
}

function Particles() {
  const count = 750;
  const meshRef = useRef<THREE.Points>(null);

  // Position particles in a flat orbital galactic disc/asteroid field around the planet
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 24 + 2.5; // orbital distance
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      // standard gaussian flat thickness disk on Y plane
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5; 
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.015 * safeDelta;
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
      <pointsMaterial 
        size={0.04} 
        color="#ffffff" 
        transparent 
        opacity={0.3} 
        sizeAttenuation={true} 
      />
    </points>
  );
}

export default function ThreeScene() {
  const sceneRef = useRef<SceneRef>({ globeOpacity: 1 });

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>
        <SceneChoreography sceneRef={sceneRef} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 10, 5]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-5, -10, -5]} intensity={0.4} color="#ffffff" />
        <Planet opacityRef={sceneRef} />
        <Particles />
      </Canvas>
    </div>
  );
}
