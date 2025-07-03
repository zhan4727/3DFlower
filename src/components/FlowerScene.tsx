// src/components/FlowerScene.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';

interface FlowerSceneProps {
  hue: number;
}

const PolarFlower = ({ hue }: { hue: number }) => {
  // Mathematical functions
  const vShape = (A: number, r: number, a: number, b: number) => {
    return A * Math.exp(-b * Math.pow(Math.abs(r), 1.5)) * Math.pow(Math.abs(r), a);
  };

  const perturbation = (A: number, r: number, p: number, angle: number) => {
    return 1 + A * Math.pow(r, 2) * Math.sin(p * angle);
  };

  // Create geometry with parametric equations
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const indices = [];
    
    const layers = 120; // Increased layers for density
    const detail = 360; // Increased detail for smoothness
    
    for (let theta = 0; theta <= layers; theta++) {
      for (let phi = 0; phi <= detail; phi++) {
        const r = (70 * Math.pow(Math.abs(Math.sin(phi * 3)), 1) + 225) * theta / layers;
        const x = r * Math.cos(phi * THREE.MathUtils.DEG2RAD);
        const y = r * Math.sin(phi * THREE.MathUtils.DEG2RAD);
        const z = vShape(350, r / 100, 0.8, 0.15) - 200 + 
                  perturbation(1.5, r / 100, 12, phi);

        vertices.push(x, y, z);
        
        // Create gradient colors based on hue and position
        const color = new THREE.Color();
        color.setHSL(
          ((hue + phi * 0.5 + theta * 0.2) % 360) / 360,
          0.8,
          0.6 + 0.3 * Math.sin(theta * 0.1)
        );
        colors.push(color.r, color.g, color.b);
      }
    }

    // Create faces for a continuous surface
    for (let theta = 0; theta < layers; theta++) {
      for (let phi = 0; phi < detail; phi++) {
        const a = theta * (detail + 1) + phi;
        const b = a + 1;
        const c = (theta + 1) * (detail + 1) + phi;
        const d = c + 1;

        indices.push(a, b, d);
        indices.push(a, d, c);
      }
    }

    geo.setIndex(indices);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals(); // For proper lighting
    
    return geo;
  }, [hue]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshPhongMaterial 
        vertexColors
        shininess={100}
        specular="#ffffff"
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const FlowerCenter = () => {
  return (
    <mesh position={[0, 0, -100]} castShadow>
      <sphereGeometry args={[60, 32, 32]} />
      <meshPhongMaterial 
        color="#f1c40f"
        shininess={100}
        emissive="#f39c12"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const FlowerScene = ({ hue }: FlowerSceneProps) => {
  return (
    <Canvas className="flower-canvas">
      <PerspectiveCamera makeDefault position={[0, 0, 800]} fov={75} />
      <ambientLight intensity={0.3} />
      <pointLight position={[200, 200, 200]} intensity={1.5} color={`hsl(${hue}, 100%, 70%)`} />
      <pointLight position={[-200, -200, -200]} intensity={1} color={`hsl(${(hue + 120) % 360}, 100%, 70%)`} />
      <directionalLight position={[0, 0, 200]} intensity={0.5} />
      
      <Suspense fallback={null}>
        <PolarFlower hue={hue} />
        <FlowerCenter />
        
        <Stars 
          radius={300}
          depth={100}
          count={2000}
          factor={7}
          fade
        />
      </Suspense>
      
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.8}
      />
    </Canvas>
  );
};

export default FlowerScene;