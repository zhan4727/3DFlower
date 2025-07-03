// src/App.tsx
import { useState } from 'react';
import FlowerScene from './components/FlowerScene';

const flowers = [
  { name: "Polar Rose", hueOffset: 0 },
  { name: "Spiral Galaxy", hueOffset: 60 },
  { name: "Crimson Bloom", hueOffset: 120 },
  { name: "Azure Dream", hueOffset: 180 },
  { name: "Golden Petals", hueOffset: 240 },
  { name: "Violet Whirl", hueOffset: 300 },
  { name: "Emerald Spiral", hueOffset: 30 }
];

const App = () => {
  const [activeFlower, setActiveFlower] = useState(0);
  const [hue, setHue] = useState(180);
  
  const currentFlower = flowers[activeFlower];
  const baseHue = (hue + currentFlower.hueOffset) % 360;

  return (
    <div className="app">
      <h1>3D Flower Visualizations</h1>
      
      <div className="controls">
        <div className="tabs">
          {flowers.map((flower, i) => (
            <button
              key={i}
              className={activeFlower === i ? 'active' : ''}
              onClick={() => setActiveFlower(i)}
            >
              {flower.name}
            </button>
          ))}
        </div>
        
        <div className="slider-container">
          <label>Color Spectrum:</label>
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={hue} 
            onChange={(e) => setHue(parseInt(e.target.value))} 
          />
          <div className="hue-preview" style={{
            background: `linear-gradient(to right, 
              hsl(0, 100%, 70%), 
              hsl(60, 100%, 70%),
              hsl(120, 100%, 70%),
              hsl(180, 100%, 70%),
              hsl(240, 100%, 70%),
              hsl(300, 100%, 70%),
              hsl(360, 100%, 70%))`
          }} />
        </div>
      </div>
      
      <div className="scene-container">
        <FlowerScene hue={baseHue} />
        <div className="instructions">
          <p>Click and drag to rotate | Scroll to zoom</p>
          <p>Hold Shift + drag to pan</p>
        </div>
      </div>
    </div>
  );
};

export default App;