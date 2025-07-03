// src/components/SpiralPetalFlower.tsx
import React from 'react';

interface FlowerProps {
  hue: number;
}

const SpiralPetalFlower: React.FC<FlowerProps> = ({ hue }) => {
  const numPetals = 7;
  const radius = 90;
  const depth = 60;
  const detail = 80;

  return (
    <div className="flower-container">
      <svg width="300" height="300" viewBox="-150 -150 300 300">
        <defs>
          <radialGradient id="spiral-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`hsl(${hue}, 100%, 80%)`} />
            <stop offset="100%" stopColor={`hsl(${(hue + 120) % 360}, 100%, 40%)`} />
          </radialGradient>
        </defs>

        {Array.from({ length: numPetals }).map((_, i) => {
          const color1 = (hue + i * 51.4) % 360;
          const color2 = (color1 + 60) % 360;

          return (
            <defs key={i}>
              <linearGradient id={`spiral-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`hsl(${color1}, 100%, 75%)`} />
                <stop offset="100%" stopColor={`hsl(${color2}, 100%, 45%)`} />
              </linearGradient>
            </defs>
          );
        })}

        {Array.from({ length: numPetals }).map((_, i) => {
          const points = [];
          const petalAngle = (i * 2 * Math.PI) / numPetals;

          for (let j = 0; j <= detail; j++) {
            const theta = (j / detail) * Math.PI * 2;
            const phi = (15 * Math.exp(theta / 6));
            const r = radius * (1 - 0.5 * Math.pow(1 - ((3.6 * theta * 180) / 360) % 1, 4));
            const z = depth * Math.pow(r / radius, 2) * Math.pow(1.3 * r / radius - 1, 2) * Math.sin(phi);

            // Simulated 3D rotation (flattened projection)
            const x = r * Math.sin(phi) * Math.sin(theta + petalAngle);
            const y = r * Math.cos(phi) - z * 0.3;

            points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
          }

          return (
            <path
              key={i}
              d={`M${points.join('L')}Z`}
              fill={`url(#spiral-gradient-${i})`}
              stroke={`hsl(${(hue + i * 51.4) % 360}, 100%, 30%)`}
              strokeWidth="1.2"
              opacity="0.85"
            />
          );
        })}

        <circle cx="0" cy="0" r={radius * 0.2} fill="url(#spiral-center)" />
      </svg>
    </div>
  );
};

export default SpiralPetalFlower;
