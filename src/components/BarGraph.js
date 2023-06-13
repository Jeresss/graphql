import React from 'react';

function BarGraph({ data, width, height }) {
  const barWidth = width / data.length;
  const maxValue = Math.max(...data);
  const scale = height / maxValue;

  return (
    <svg width={width} height={height}>
      {data.map((value, index) => (
        <rect 
          key={index} 
          x={index * barWidth} 
          y={height - value * scale} 
          width={barWidth} 
          height={value * scale} 
          fill="steelblue" 
        />
      ))}
    </svg>
  );
}

export default BarGraph;
