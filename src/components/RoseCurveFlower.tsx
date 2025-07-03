// src/components/RoseCurveFlower.tsx
import React from 'react';

interface FlowerProps {
  hue: number;
}

const RoseCurveFlower: React.FC<FlowerProps> = ({ hue }) => {
  const numPetals = 6;
  const size = 120;
  
  return (
    <div className="flower-container">
      <svg width="300" height="300" viewBox="-150 -150 300 300">
        <defs>
          <radialGradient id="center-glow" cx="40%" cy="40%" r="50%">
            <stop offset="0%" stopColor={`hsl(${hue}, 100%, 80%)`} />
            <stop offset="100%" stopColor={`hsl(${(hue + 60) % 360}, 100%, 40%)`} />
          </radialGradient>
        </defs>
        
        {Array.from({ length: numPetals }).map((_, i) => {
          const color1 = (hue + i * 60) % 360;
          const color2 = (color1 + 30) % 360;
          
          return (
            <defs key={i}>
              <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`hsl(${color1}, 100%, 80%)`} />
                <stop offset="100%" stopColor={`hsl(${color2}, 100%, 60%)`} />
              </linearGradient>
            </defs>
          );
        })}
        
        {Array.from({ length: numPetals }).map((_, i) => {
          const points = [];
          const angleStep = Math.PI / 20;
          
          for (let t = 0; t <= Math.PI * 2; t += angleStep) {
            // Rose curve equation: r = a * cos(kθ)
            const k = numPetals / 2;
            const r = size * Math.cos(k * t);
            
            const x = r * Math.cos(t);
            const y = r * Math.sin(t);
            
            points.push(`${x},${y}`);
          }
          
          return (
            <path
              key={i}
              d={`M${points.join('L')}Z`}
              fill={`url(#gradient-${i})`}
              stroke={`hsl(${(hue + i * 60) % 360}, 100%, 40%)`}
              strokeWidth="1.5"
              opacity="0.85"
              transform={`rotate(${i * 60})`}
              style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.3))" }}
            />
          );
        })}
        
        <circle cx="0" cy="0" r={size * 0.2} fill="url(#center-glow)" />
      </svg>
    </div>
  );
};

export default RoseCurveFlower;