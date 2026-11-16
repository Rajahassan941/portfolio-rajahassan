"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/** Evenly distributes points on a sphere (Fibonacci lattice). */
function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [new THREE.Color("#4f7cff"), new THREE.Color("#8b5cf6"), new THREE.Color("#22d3ee")];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const tmp = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.set([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius], i * 3);
    const t = (y + 1) / 2;
    tmp.copy(palette[0]).lerp(t < 0.5 ? palette[1] : palette[2], t < 0.5 ? t * 2 : (t - 0.5) * 2);
    colors.set([tmp.r, tmp.g, tmp.b], i * 3);
  }
  return { positions, colors };
}

function Globe() {
  const group = useRef<THREE.Group>(null);
  const { positions, colors } = useMemo(() => fibonacciSphere(1400, 2.1), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.06;
    // Ease toward pointer for a subtle parallax tilt.
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.25, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.15, 0.04);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.022} vertexColors transparent opacity={0.85} depthWrite={false} sizeAttenuation />
      </points>
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#4f7cff" wireframe transparent opacity={0.12} />
      </mesh>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.6}>
        <mesh>
          <torusGeometry args={[2.7, 0.006, 8, 160]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Subtle 3D backdrop for the hero. Rendering pauses whenever the canvas
 * scrolls out of view to save battery / GPU.
 */
export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ pointerEvents: "none" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <Globe />
      </Canvas>
    </div>
  );
}
