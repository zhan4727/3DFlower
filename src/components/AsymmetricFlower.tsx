// src/components/AsymmetricFlower.tsx
import React from 'react';

interface FlowerProps {
  hue: number;
}

const AsymmetricFlower: React.FC<FlowerProps> = ({ hue }) => {
  const numPetals = 7;
  const size = 120;
  
  return (
    <div className="flower-container">
      <svg width="300" height="300" viewBox="-150 -150 300 300">
        <defs>
          <radialGradient id="asymmetric-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`hsl(${hue}, 100%, 80%)`} />
            <stop offset="100%" stopColor={`hsl(${(hue + 90) % 360}, 100%, 40%)`} />
          </radialGradient>
        </defs>
        
        {Array.from({ length: numPetals }).map((_, i) => {
          const color1 = (hue + i * 51.4) % 360;
          const color2 = (color1 + 40) % 360;
          
          return (
            <defs key={i}>
              <linearGradient id={`asymmetric-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`hsl(${color1}, 100%, 80%)`} />
                <stop offset="100%" stopColor={`hsl(${color2}, 100%, 60%)`} />
              </linearGradient>
            </defs>
          );
        })}
        
        {Array.from({ length: numPetals }).map((_, i) => {
          const points = [];
          const angleStep = Math.PI / 15;
          const rotation = (i * 360) / numPetals;
          
          // Add organic variation
          const sizeVariation = 0.8 + Math.random() * 0.4;
          const curveVariation = 0.5 + Math.random() * 0.5;
          
          for (let t = 0; t <= Math.PI; t += angleStep) {
            // Asymmetric equation with variation
            const r = size * sizeVariation * (0.6 + 0.4 * Math.sin(t * curveVariation));
            
            // Add organic twist
            const twist = Math.sin(t * 2) * 0.3;
            
            const x = r * Math.cos(t + twist);
            const y = r * Math.sin(t + twist);
            
            points.push(`${x},${y}`);
          }
          
          return (
            <path
              key={i}
              d={`M${points.join('L')}Z`}
              fill={`url(#asymmetric-gradient-${i})`}
              stroke={`hsl(${(hue + i * 51.4) % 360}, 100%, 40%)`}
              strokeWidth="1.5"
              opacity="0.85"
              transform={`rotate(${rotation})`}
              style={{ 
                filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.3))",
                transform: `rotate(${Math.random() * 10 - 5}deg)`
              }}
            />
          );
        })}
        
        <circle cx="0" cy="0" r={size * 0.2} fill="url(#asymmetric-center)" />
      </svg>
    </div>
  );
};

export default AsymmetricFlower;