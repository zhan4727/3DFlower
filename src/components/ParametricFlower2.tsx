// src/components/ParametricFlower2.tsx (Replaces Flower3)
import React from 'react';

interface ParametricFlowerProps {
  hue: number;
}

const ParametricFlower2: React.FC<ParametricFlowerProps> = ({ hue }) => {
  const numPetals = 5;
  const size = 120;
  const depth = 40;

  // Complex parametric equation with curvature
  const generatePetalPath = (index: number) => {
    const points = [];
    const angleStep = Math.PI / 30;
    const rotation = (index * 2 * Math.PI) / numPetals;
    
    for (let t = -Math.PI/2; t <= Math.PI/2; t += angleStep) {
      // 3D parametric equations with curvature
      const r = size * (0.5 + 0.5 * Math.cos(2 * t));
      const z = depth * Math.sin(t);
      
      // Project 3D to 2D with perspective
      const scale = 1 + z/(size * 2);
      const x = scale * r * Math.cos(t + rotation);
      const y = scale * r * Math.sin(t + rotation);
      
      points.push(`${x},${y}`);
    }
    
    return `M${points.join('L')}Z`;
  };

  return (
    <div className="flower-container">
      <svg width="300" height="300" viewBox="-180 -180 360 360">
        <defs>
          <radialGradient id="center-glow" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={`hsl(${hue}, 100%, 80%)`} />
            <stop offset="100%" stopColor={`hsl(${(hue + 60) % 360}, 100%, 40%)`} />
          </radialGradient>
        </defs>
        
        {Array.from({ length: numPetals }).map((_, i) => {
          const color1 = (hue + i * 72) % 360;
          const color2 = (color1 + 40) % 360;
          
          return (
            <defs key={i}>
              <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`hsl(${color1}, 100%, 80%)`} />
                <stop offset="100%" stopColor={`hsl(${color2}, 100%, 60%)`} />
              </linearGradient>
            </defs>
          );
        })}

        {Array.from({ length: numPetals }).map((_, i) => (
          <path
            key={i}
            d={generatePetalPath(i)}
            fill={`url(#grad-${i})`}
            stroke={`hsl(${(hue + i * 72) % 360}, 100%, 40%)`}
            strokeWidth="1.5"
            opacity="0.85"
          />
        ))}
        
        <circle cx="0" cy="0" r={size * 0.2} fill="url(#center-glow)" />
      </svg>
    </div>
  );
};

export default ParametricFlower2;