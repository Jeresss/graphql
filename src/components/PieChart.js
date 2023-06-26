import React from "react";

const PieChart = ({ upAmount, downAmount }) => {
  const totalAmount = upAmount + downAmount;
  const upRatio = upAmount / totalAmount;
  const downRatio = downAmount / totalAmount;

  return (
    <div className="profile-graph">
      <h2>Audit Ratio</h2>
      <svg className="pie-chart" width={300} height={300}>
        <path
          d="M150,150 L250,150 A100,100 0 1,0 150,50 Z"
          fill="green"
          transform={`rotate(${360 * upRatio} 150 150)`}
        />
        <path
          d="M150,150 L250,150 A100,100 0 1,0 150,50 Z"
          fill="red"
          transform={`rotate(${360 * downRatio} 150 150)`}
        />
      </svg>
    </div>
  );
};

export default PieChart;
