import React, { useEffect, useRef } from "react";
import frappe from "frappe-charts";

const HeatmapChart = ({ data }) => {
  const chartRef = useRef(null);
  const transactions = data && data.XPWithDates;

  useEffect(() => {
    if (chartRef.current && transactions && transactions.length > 0) {
     /*  const formattedData = transactions.map((transaction) => ({
        count: transaction.amount,
        date: new Date(transaction.createdAt).toISOString().slice(0, 10),
      })); */
      const formattedData = [
        { count: 76250, date: '2023-06-02' },
        { count: 103500, date: '2023-06-08' },
        { count: 147000, date: '2023-06-04' },
        { count: 51750, date: '2023-06-09' },
        // ...
      ];
      console.log('chartRef.current: ', chartRef.current);
      console.log('formattedData: ', formattedData);

      new frappe.Chart(chartRef.current, {
        type: "heatmap",
        title: "XP Earned Over Time",
        data: {
          dataPoints: formattedData,
        },
        countLabel: "XP",
        colorScale: ["#ebedf0", "#c0ddf9", "#73b3f3", "#3286e1", "#17459e"],
      });
    } else {
      console.error("No transaction data available for the heatmap"); 
    }
  }, [transactions]);

  return <div ref={chartRef}></div>;
};

export default HeatmapChart;
