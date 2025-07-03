// Flower1.tsx
import React from 'react';

interface FlowerProps {
  hue: number;
}

const Flower1: React.FC<FlowerProps> = ({ hue }) => {
  const petals = 6;
  return (
    <div className="flower">
      {[...Array(petals)].map((_, i) => (
        <div 
          key={i}
          className="petal"
          style={{
            transform: `rotate(${i * 60}deg)`,
            background: `linear-gradient(to right, 
              hsl(${(hue + i * 30) % 360}, 100%, 70%), 
              hsl(${(hue + i * 30 + 15) % 360}, 100%, 50%))`
          }}
        />
      ))}
      <div className="center" />
    </div>
  );
};

export default Flower1;