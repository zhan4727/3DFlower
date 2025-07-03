// Flower2.tsx
import React from 'react';

interface FlowerProps {
  hue: number;
}

const Flower2: React.FC<FlowerProps> = ({ hue }) => {
  const petals = 7;
  return (
    <div className="flower layered">
      {[...Array(petals)].map((_, i) => (
        <div 
          key={i}
          className="petal curved"
          style={{
            transform: `rotate(${i * 51.4}deg)`,
            background: `radial-gradient(circle, 
              hsl(${(hue + i * 40) % 360}, 100%, 80%), 
              hsl(${(hue + i * 40 + 20) % 360}, 100%, 60%))`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
      <div className="center pulsating" />
    </div>
  );
};

export default Flower2;