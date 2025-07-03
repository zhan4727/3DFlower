// src/components/PolarFlower.tsx
import { useMemo } from 'react';
import * as THREE from 'three';

interface PolarFlowerProps {
  hue: number;
  layers?: number;
  detail?: number;
}

const PolarFlower = ({ hue, layers = 60, detail = 180 }: PolarFlowerProps) => {
  // Mathematical functions from your example
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

    for (let theta = 0; theta < layers; theta++) {
      for (let phi = 0; phi < 360; phi += 360 / detail) {
        const r = (70 * Math.pow(Math.abs(Math.sin(phi * 3)), 1) + 225) * theta / layers;
        const x = r * Math.cos(phi * THREE.MathUtils.DEG2RAD);
        const y = r * Math.sin(phi * THREE.MathUtils.DEG2RAD);
        const z = vShape(350, r / 100, 0.8, 0.15) - 200 + perturbation(1.5, r / 100, 12, phi);

        vertices.push(x, y, z);
        
        // Create gradient colors based on hue
        const color = new THREE.Color();
        color.setHSL(
          ((hue + phi * 0.5) % 360) / 360,
          0.8,
          0.6 + 0.3 * Math.sin(theta * 0.1)
        );
        colors.push(color.r, color.g, color.b);
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    
    return geo;
  }, [hue, layers, detail]);

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

export default PolarFlower;