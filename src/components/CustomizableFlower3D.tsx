// src/components/CustomizableFlower3D.tsx
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CustomizableFlower3DProps {
  hue: number;
  petalNum?: number;
  diameter?: number;
  pLength?: number;
  pSharpness?: number;
  flowerHeight?: number;
  curvature1?: number;
  curvature2?: number;
  bumpiness?: number;
  bumpNum?: number;
}

const CustomizableFlower3D = ({
  hue,
  petalNum = 5,
  diameter = 200,
  pLength = 60,
  pSharpness = 0.4,
  flowerHeight = 300,
  curvature1 = 0.8,
  curvature2 = 0.2,
  bumpiness = 2.5,
  bumpNum = 10,
}: CustomizableFlower3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const rows = 60;
  const cols = 120;

  // Mathematical functions
  const vShape = (A: number, r: number, a: number, b: number) => {
    return A * Math.exp(-b * Math.pow(Math.abs(r), 1.5)) * Math.pow(Math.abs(r), a);
  };

  const bumpinessFn = (A: number, r: number, f: number, angle: number) => {
    return 1 + A * Math.pow(r, 2) * Math.sin(f * angle);
  };

  // Create geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    for (let theta = 0; theta < rows; theta += 1) {
      for (let phi = 0; phi < cols; phi += 1) {
        const r = (pLength * Math.pow(Math.abs(Math.sin((petalNum / 2) * phi * 3)), pSharpness) + diameter) * theta / rows;
        const x = r * Math.cos(phi * 3);
        const y = r * Math.sin(phi * 3);
        const z = vShape(flowerHeight, r / 100, curvature1, curvature2) - 200 + 
                  bumpinessFn(bumpiness, r / 100, bumpNum, phi * 3);

        vertices.push(x, y, z);
        
        // Create color gradient based on hue and position
        const color = new THREE.Color();
        color.setHSL(
          ((hue + phi * 0.5) % 360) / 360,
          0.8,
          0.5 + 0.3 * Math.sin(theta * 0.1)
        );
        colors.push(color.r, color.g, color.b);
      }
    }

    // Create faces
    for (let theta = 0; theta < rows - 1; theta++) {
      for (let phi = 0; phi < cols - 1; phi++) {
        const a = theta * cols + phi;
        const b = theta * cols + phi + 1;
        const c = (theta + 1) * cols + phi + 1;
        const d = (theta + 1) * cols + phi;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    geo.setIndex(indices);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    
    return geo;
  }, [
    hue, petalNum, diameter, pLength, pSharpness, 
    flowerHeight, curvature1, curvature2, bumpiness, bumpNum
  ]);

  // Add subtle animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <primitive object={geometry} attach="geometry" />
      <meshPhongMaterial 
        vertexColors 
        side={THREE.DoubleSide}
        shininess={80}
        specular="#ffffff"
      />
    </mesh>
  );
};

export default CustomizableFlower3D;