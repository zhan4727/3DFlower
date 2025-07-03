// src/components/OrbitalPetalFlower.tsx
import React from 'react';

interface FlowerProps {
  hue: number;
}

const OrbitalPetalFlower: React.FC<FlowerProps> = ({ hue }) => {
  const numPetals = 5;
  const size = 100;
  const orbitRadius = 60;
  
  return (
    <div className="flower-container">
      <svg width="300" height="300" viewBox="-150 -150 300 300">
        <defs>
          <radialGradient id="orbital-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`hsl(${hue}, 100%, 80%)`} />
            <stop offset="100%" stopColor={`hsl(${(hue + 120) % 360}, 100%, 40%)`} />
          </radialGradient>
        </defs>
        
        {Array.from({ length: numPetals }).map((_, i) => {
          const color1 = (hue + i * 72) % 360;
          const color2 = (color1 + 40) % 360;
          
          return (
            <defs key={i}>
              <linearGradient id={`orbital-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`hsl(${color1}, 100%, 80%)`} />
                <stop offset="100%" stopColor={`hsl(${color2}, 100%, 60%)`} />
              </linearGradient>
            </defs>
          );
        })}
        
        {Array.from({ length: numPetals }).map((_, i) => {
          const angle = (i * 2 * Math.PI) / numPetals;
          const centerX = orbitRadius * Math.cos(angle);
          const centerY = orbitRadius * Math.sin(angle);
          
          const points = [];
          const angleStep = Math.PI / 10;
          
          for (let t = 0; t <= Math.PI * 2; t += angleStep) {
            // Orbital petal shape (ellipse)
            const petalX = size * 0.6 * Math.cos(t);
            const petalY = size * 0.4 * Math.sin(t);
            
            // Position in orbit
            const x = centerX + petalX;
            const y = centerY + petalY;
            
            points.push(`${x},${y}`);
          }
          
          return (
            <path
              key={i}
              d={`M${points.join('L')}Z`}
              fill={`url(#orbital-gradient-${i})`}
              stroke={`hsl(${(hue + i * 72) % 360}, 100%, 40%)`}
              strokeWidth="1.5"
              opacity="0.9"
              transform={`rotate(${i * 10})`}
              style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.3))" }}
            />
          );
        })}
        
        <circle cx="0" cy="0" r={size * 0.3} fill="url(#orbital-center)" />
      </svg>
    </div>
  );
};

export default OrbitalPetalFlower;