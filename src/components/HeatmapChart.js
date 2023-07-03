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
        title: 'Your gained XP amount day by day',
        data: {
          dataPoints: myObject,
           start: new Date('2022-09-01'),
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