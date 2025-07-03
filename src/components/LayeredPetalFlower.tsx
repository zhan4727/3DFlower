// src/components/LayeredPetalFlower.tsx
import React from 'react';

interface FlowerProps {
  hue: number;
}

const LayeredPetalFlower: React.FC<FlowerProps> = ({ hue }) => {
  const numLayers = 3;
  const petalsPerLayer = 6;
  const size = 100;
  
  return (
    <div className="flower-container">
      <svg width="300" height="300" viewBox="-150 -150 300 300">
        <defs>
          <radialGradient id="layered-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`hsl(${hue}, 100%, 80%)`} />
            <stop offset="100%" stopColor={`hsl(${(hue + 180) % 360}, 100%, 40%)`} />
          </radialGradient>
        </defs>
        
        {Array.from({ length: numLayers }).map((_, layer) => {
          const layerSize = size * (0.6 + layer * 0.2);
          const layerDepth = 15 * (layer + 1);
          
          return (
            <g key={layer}>
              {Array.from({ length: petalsPerLayer }).map((_, i) => {
                const color1 = (hue + i * 60 + layer * 40) % 360;
                const color2 = (color1 + 30) % 360;
                
                return (
                  <defs key={`${layer}-${i}`}>
                    <linearGradient id={`gradient-${layer}-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={`hsl(${color1}, 100%, 80%)`} />
                      <stop offset="100%" stopColor={`hsl(${color2}, 100%, 60%)`} />
                    </linearGradient>
                  </defs>
                );
              })}
              
              {Array.from({ length: petalsPerLayer }).map((_, i) => {
                const rotation = (i * 360) / petalsPerLayer;
                const points = [];
                const angleStep = Math.PI / 15;
                
                for (let t = 0; t <= Math.PI; t += angleStep) {
                  // Layered petal with curve
                  const r = layerSize * (0.7 + 0.3 * Math.sin(t));
                  const z = layerDepth * Math.sin(t);
                  
                  // 3D projection
                  const scale = 1 + z/(size * 2);
                  const x = scale * r * Math.cos(t + (rotation * Math.PI / 180));
                  const y = scale * r * Math.sin(t + (rotation * Math.PI / 180));
                  
                  points.push(`${x},${y}`);
                }
                
                return (
                  <path
                    key={`${layer}-${i}`}
                    d={`M${points.join('L')}Z`}
                    fill={`url(#gradient-${layer}-${i})`}
                    stroke={`hsl(${(hue + i * 60) % 360}, 100%, 40%)`}
                    strokeWidth="1"
                    opacity={0.9 - layer * 0.1}
                    transform={`rotate(${rotation})`}
                    style={{ 
                      filter: `blur(${layer * 0.5}px)`,
                      transform: `translateZ(${layer * -5}px)`
                    }}
                  />
                );
              })}
            </g>
          );
        })}
        
        <circle cx="0" cy="0" r={size * 0.15} fill="url(#layered-center)" />
      </svg>
    </div>
  );
};

export default LayeredPetalFlower;