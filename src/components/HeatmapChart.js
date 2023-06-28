import React, { useEffect, useRef } from 'react';
import { Chart } from 'frappe-charts';

function HeatmapChart({ data }) {
  const chartContainerRef = useRef('#chart-heatmap');
  useEffect(() => {
    let mapDataPoints = new Map();

    if (data) {
    data.forEach((item) => {
      const date = Math.floor(new Date(item.createdAt).getTime() / 1000);
        mapDataPoints.set(date, item.amount);
    });
    const myObject = Object.fromEntries(mapDataPoints);
   
      const chart = new Chart(chartContainerRef.current, {
        title: 'XP Earned Over Time',
        data: {
          dataPoints: myObject,
          // start: startDate,
          // end: endDate,
        },
        type: 'heatmap',
        height: 250,
        colors: ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'],
      });
  
      return () => {
        chart.destroy();
      };
    }
  }, [data]);
  
  
  return <div ref={chartContainerRef}></div>;
}

export default HeatmapChart;