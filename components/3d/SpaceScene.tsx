"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stars,
  Float,
  OrbitControls,
  Environment,
  MeshDistortMaterial,
  Sphere,
  Trail,
} from "@react-three/drei";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

// ─── NEBULA SHADER MATERIAL ──────────────────────────────────────
function NebulaShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex noise functions
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for(int i = 0; i < 5; i++) {
        value += amplitude * snoise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 uv = vUv;
      float time = uTime * 0.1;

      // Create nebula clouds
      vec3 p = vec3(uv * 3.0, time);
      float noise1 = fbm(p);
      float noise2 = fbm(p + vec3(100.0));
      float noise3 = fbm(p + vec3(200.0));

      // Color palette - deep space nebula
      vec3 color1 = vec3(0.02, 0.01, 0.05);    // Deep purple-black
      vec3 color2 = vec3(0.1, 0.05, 0.2);     // Dark purple
      vec3 color3 = vec3(0.05, 0.02, 0.15);    // Dark blue-purple
      vec3 color4 = vec3(0.0, 0.1, 0.2);       // Deep blue

      vec3 color = mix(color1, color2, noise1);
      color = mix(color, color3, noise2 * 0.5);
      color = mix(color, color4, noise3 * 0.3);

      // Add subtle glow
      float glow = smoothstep(0.3, 0.7, noise1) * 0.15;
      color += vec3(0.0, 0.05, 0.1) * glow;

      // Vignette
      float vignette = 1.0 - smoothstep(0.3, 1.0, length(uv - 0.5) * 1.5);
      color *= vignette;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -50]} scale={[200, 200, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── FLOATING ASTEROIDS ──────────────────────────────────────────
function AsteroidField() {
  const groupRef = useRef<THREE.Group>(null);
  const asteroidCount = 30;

  const asteroids = useMemo(() => {
    return Array.from({ length: asteroidCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40 - 20,
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.1,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      floatSpeed: Math.random() * 0.5 + 0.2,
      floatOffset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const asteroid = asteroids[i];
      child.rotation.x += asteroid.rotationSpeed;
      child.rotation.y += asteroid.rotationSpeed * 0.7;
      child.position.y =
        asteroid.position[1] + Math.sin(time * asteroid.floatSpeed + asteroid.floatOffset) * 2;
    });
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((asteroid, i) => (
        <mesh key={i} position={asteroid.position} scale={asteroid.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#2a2a3a"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── ROTATING PLANET (EARTH) ───────────────────────────────────
function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const mouse = useMousePosition();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group position={[15, -5, -30]}>
      {/* Planet Body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial
          color="#1a3a5c"
          roughness={0.6}
          metalness={0.2}
          emissive="#0a1a2a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh ref={atmosphereRef} scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial
          color="#00a8ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Rings */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[5.5, 7, 64]} />
        <meshStandardMaterial
          color="#3a4a6a"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── SATELLITE ────────────────────────────────────────────────────
function Satellite() {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRadius = 12;
  const orbitSpeed = 0.3;

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
    groupRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius - 30;
    groupRef.current.position.y = Math.sin(time * orbitSpeed * 0.5) * 2;
    groupRef.current.rotation.y = -time * orbitSpeed;
  });

  return (
    <group ref={groupRef}>
      {/* Satellite Body */}
      <mesh>
        <boxGeometry args={[0.8, 0.5, 0.5]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Solar Panels */}
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a2a4a" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a2a4a" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Signal Light */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

// ─── METEOR SHOWER ──────────────────────────────────────────────
function Meteor() {
  const meshRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Points>(null);
  const startPos = useMemo(
    () => new THREE.Vector3(
      (Math.random() - 0.5) * 100,
      40 + Math.random() * 20,
      (Math.random() - 0.5) * 50 - 20
    ),
    []
  );
  const velocity = useMemo(
    () => new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      -5 - Math.random() * 5,
      (Math.random() - 0.5) * 2
    ),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.position.add(velocity.clone().multiplyScalar(delta));

    // Reset when below view
    if (meshRef.current.position.y < -50) {
      meshRef.current.position.copy(startPos);
    }
  });

  return (
    <mesh ref={meshRef} position={startPos}>
      <sphereGeometry args={[0.05, 4, 4]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

function MeteorShower() {
  const meteorCount = 5;
  return (
    <group>
      {Array.from({ length: meteorCount }, (_, i) => (
        <Meteor key={i} />
      ))}
    </group>
  );
}

// ─── MOON ───────────────────────────────────────────────────────
function Moon() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <mesh ref={meshRef} position={[-20, 15, -40]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#c8c8c8"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

// ─── CAMERA CONTROLLER ──────────────────────────────────────────
function CameraController() {
  const { camera } = useThree();
  const mouse = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // Smooth camera movement based on mouse
    targetRotation.current.x = mouse.normalizedY * 0.05;
    targetRotation.current.y = mouse.normalizedX * 0.05;

    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.02;
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.02;
  });

  return null;
}

// ─── MAIN SPACE SCENE ───────────────────────────────────────────
export function SpaceScene() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#050508"]} />
        <fog attach="fog" args={["#050508", 20, 100]} />

        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00a8ff" />
        <pointLight position={[20, 5, -30]} intensity={0.5} color="#ffffff" />

        {/* Camera */}
        <CameraController />

        {/* Nebula Background */}
        <NebulaShader />

        {/* Stars */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Secondary star layer for depth */}
        <Stars
          radius={80}
          depth={30}
          count={3000}
          factor={2}
          saturation={0.2}
          fade
          speed={0.5}
        />

        {/* Planet */}
        <Planet />

        {/* Moon */}
        <Moon />

        {/* Satellite */}
        <Satellite />

        {/* Asteroid Field */}
        <AsteroidField />

        {/* Meteor Shower */}
        <MeteorShower />

        {/* Space Dust Particles */}
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.5}>
          <group>
            {Array.from({ length: 50 }, (_, i) => (
              <mesh
                key={i}
                position={[
                  (Math.random() - 0.5) * 60,
                  (Math.random() - 0.5) * 40,
                  (Math.random() - 0.5) * 30 - 10,
                ]}
              >
                <sphereGeometry args={[0.02, 4, 4]} />
                <meshBasicMaterial
                  color="#ffffff"
                  transparent
                  opacity={Math.random() * 0.5 + 0.2}
                />
              </mesh>
            ))}
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
