// src/components/PolarRoseDiagram.tsx
import { useState, useRef, useEffect } from 'react';

const PolarRoseDiagram = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState(1);
  const [yOffset, setYOffset] = useState(0);
  const [takeAbs, setTakeAbs] = useState(false);
  const radius = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set drawing styles
    ctx.strokeStyle = 'hsl(75, 79%, 51%)';
    ctx.fillStyle = 'hsl(75, 79%, 51%, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px Arial';
    
    // Center of canvas
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Translate to center
    ctx.translate(centerX, centerY);
    
    // Draw Cartesian coordinate system
    ctx.beginPath();
    ctx.moveTo(-centerX + 40, 0);
    ctx.lineTo(centerX - 40, 0);
    ctx.moveTo(0, -centerY + 40);
    ctx.lineTo(0, centerY - 40);
    ctx.stroke();
    
    // Draw grid lines
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(-centerX, -radius - yOffset);
    ctx.lineTo(centerX, -radius - yOffset);
    ctx.moveTo(-centerX, radius - yOffset);
    ctx.lineTo(centerX, radius - yOffset);
    ctx.stroke();
    
    // Draw coordinate labels
    ctx.setLineDash([]);
    ctx.fillText('0', -12, 15);
    ctx.fillText('π', centerX - 40, 15);
    ctx.fillText('-π', -centerX + 30, 15);
    
    // Draw value labels
    const cosHeight = (yOffset / radius).toFixed(1);
    ctx.fillText(cosHeight, -35, -radius - yOffset + 8);
    ctx.fillText(`${(parseFloat(cosHeight) - 2).toFixed(1)}`, -35, radius - yOffset + 8);
    
    // Draw polar coordinate system
    ctx.beginPath();
    ctx.arc(0, 0, Math.abs(-radius + yOffset), 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, Math.abs(radius + yOffset), 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw polar rose
    ctx.beginPath();
    ctx.strokeStyle = 'hsl(340, 100%, 70%)';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    
    for (let theta = 0; theta < 360; theta += 1) {
      let r;
      if (takeAbs) {
        r = radius * Math.abs(Math.sin(frequency * theta * Math.PI / 180)) + yOffset;
      } else {
        r = radius * Math.sin(frequency * theta * Math.PI / 180) + yOffset;
      }
      
      const x = r * Math.cos(theta * Math.PI / 180);
      const y = r * Math.sin(theta * Math.PI / 180);
      
      if (theta === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.stroke();
    
    // Draw equation text
    ctx.fillStyle = 'hsl(75, 79%, 51%)';
    ctx.font = '24px Arial';
    const equation = takeAbs 
      ? `r = |sin(${frequency.toFixed(1)}φ)| + ${(yOffset / radius).toFixed(1)}`
      : `r = sin(${frequency.toFixed(1)}φ) + ${(yOffset / radius).toFixed(1)}`;
    
    ctx.fillText(equation, 0, centerY - 40);
    
    // Reset translation
    ctx.translate(-centerX, -centerY);
  }, [frequency, yOffset, takeAbs, radius]);

  return (
    <div className="polar-rose-container">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="polar-rose-canvas"
      />
      
      <div className="polar-rose-controls">
        <div className="control-group">
          <label>Frequency: {frequency.toFixed(1)}</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            step="0.1" 
            value={frequency} 
            onChange={(e) => setFrequency(parseFloat(e.target.value))}
          />
        </div>
        
        <div className="control-group">
          <label>Y Offset: {(yOffset / radius).toFixed(1)}</label>
          <input 
            type="range" 
            min="-240" 
            max="240" 
            step="10" 
            value={yOffset} 
            onChange={(e) => setYOffset(parseInt(e.target.value))}
          />
        </div>
        
        <button onClick={() => setTakeAbs(!takeAbs)}>
          {takeAbs ? "Absolute Values" : "Normal Values"}
        </button>
      </div>
    </div>
  );
};

export default PolarRoseDiagram;