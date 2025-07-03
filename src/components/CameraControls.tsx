// src/components/CameraControls.tsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const CameraControls = () => {
  const controlsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (controlsRef.current) {
      const time = clock.getElapsedTime();
      controlsRef.current.rotation.y = time * 0.1;
      controlsRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    }
  });

  return <group ref={controlsRef} />;
};

export default CameraControls;