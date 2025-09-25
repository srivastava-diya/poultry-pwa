import React from "react";

export const Sparkline = ({ points = [], stroke = "#0ea5e9", fill = "#e0f2fe" }) => {
  if (!points.length) return <div className="h-16" />;

  const width = 120;
  const height = 48;
  const max = Math.max(...points, 1);
  const min = 0;
  const stepX = points.length > 1 ? width / (points.length - 1) : width;

  const toX = (i) => i * stepX;
  const toY = (v) => height - ((v - min) / (max - min)) * height;

  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`)
    .join(" ");

  const area = `${path} L${width},${height} L0,${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" />
    </svg>
  );
};

export default Sparkline;


