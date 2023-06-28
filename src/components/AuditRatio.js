import React from "react";

const AuditRatio = ({ upAmount, downAmount }) => {
  const totalAmount = upAmount + downAmount;
  const upRatio = upAmount / totalAmount;
  const downRatio = downAmount / totalAmount;
  const barWidth = 800;
  const barHeight = 20;
  const barUPColor = "#10A7CC";
  const barDownColor = "#13DCD4 ";

  const upBarWidth = barWidth * upRatio;
  const downBarWidth = barWidth * downRatio;

  return (
    <div className="profile-graph">
      <svg width={barWidth} height={barHeight}>
        <rect width={upBarWidth} height={barHeight} fill={barUPColor} />
        <rect
          x={upBarWidth}
          width={downBarWidth}
          height={barHeight}
          fill={barDownColor}
        />
      </svg>
    </div>
  );
};

export default AuditRatio;
