// Flower3.tsx (Different style)
import React from 'react';

const Flower3: React.FC<{ hue: number }> = ({ hue }) => {
  const petals = 5;
  return (
    <div className="flower spiral">
      {[...Array(petals)].map((_, i) => (
        <div
          key={i}
          className="petal pointed"
          style={{
            transform: `rotate(${i * 72}deg) translateY(-100px) rotate(${i % 2 === 0 ? 15 : -15}deg)`,
            background: `conic-gradient(
              hsl(${(hue + i * 50) % 360}, 100%, 70%),
              hsl(${(hue + i * 50 + 25) % 360}, 100%, 50%)
            )`
          }}
        />
      ))}
      <div className="center" style={{ background: `hsl(${hue}, 80%, 40%)` }} />
    </div>
  );
};

export default Flower3;