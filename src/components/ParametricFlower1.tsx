// src/components/ParametricFlower1.tsx (Replaces Flower2)
import React from 'react';

interface ParametricFlowerProps {
  hue: number;
}

const ParametricFlower1: React.FC<ParametricFlowerProps> = ({ hue }) => {
  const numPetals = 8;
  const size = 150;
  const depth = 30;

  // Parametric equations for 3D-like rose curve
  const generatePetalPath = (index: number) => {
    const points = [];
    const angleStep = Math.PI / 20;
    
    for (let theta = 0; theta <= Math.PI; theta += angleStep) {
      // Rose curve equation with depth modulation
      const r = size * Math.sin(4 * theta);
      const depthFactor = Math.sin(theta) * depth;
      
      // Convert to Cartesian with depth simulation
      const x = (r + depthFactor) * Math.cos(theta + (index * 2 * Math.PI) / numPetals);
      const y = (r + depthFactor) * Math.sin(theta + (index * 2 * Math.PI) / numPetals);
      
      points.push(`${x},${y}`);
    }
    
    return `M${points.join('L')}Z`;
  };

  return (
    <div className="flower-container">
      <svg width="300" height="300" viewBox="-180 -180 360 360">
        <defs>
          <linearGradient id="center-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`hsl(${hue}, 100%, 40%)`} />
            <stop offset="100%" stopColor={`hsl(${(hue + 40) % 360}, 100%, 60%)`} />
          </linearGradient>
        </defs>
        
        {Array.from({ length: numPetals }).map((_, i) => {
          const color1 = (hue + i * 45) % 360;
          const color2 = (color1 + 30) % 360;
          
          return (
            <defs key={i}>
              <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`hsl(${color1}, 100%, 70%)`} />
                <stop offset="100%" stopColor={`hsl(${color2}, 100%, 50%)`} />
              </linearGradient>
            </defs>
          );
        })}

        {Array.from({ length: numPetals }).map((_, i) => (
          <path
            key={i}
            d={generatePetalPath(i)}
            fill={`url(#gradient-${i})`}
            stroke={`hsl(${(hue + i * 45) % 360}, 100%, 35%)`}
            strokeWidth="1"
            opacity="0.9"
            transform={`rotate(${(i * 360) / numPetals})`}
          />
        ))}
        
        <circle cx="0" cy="0" r={size * 0.15} fill="url(#center-gradient)" />
      </svg>
    </div>
  );
};

export default ParametricFlower1;