/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface MiniChartProps {
  data: number[];
  color?: string; // 'gold' | 'cyan' | 'purple' | 'green'
  height?: number;
  width?: number;
}

export default function MiniChart({
  data,
  color = 'gold',
  height = 40,
  width = 120
}: MiniChartProps) {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min === 0 ? 1 : max - min;

  // Calculate coordinates
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    // Invert y because SVG 0,0 is top-left
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return { x, y };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // For filling the area under the curve
  const fillD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  let strokeColor = '#e2c074'; // gold
  let stopColor = 'rgba(226, 192, 116, 0.2)';

  if (color === 'cyan') {
    strokeColor = '#06b6d4';
    stopColor = 'rgba(6, 182, 212, 0.2)';
  } else if (color === 'purple') {
    strokeColor = '#a855f7';
    stopColor = 'rgba(168, 85, 247, 0.2)';
  } else if (color === 'green') {
    strokeColor = '#10b981';
    stopColor = 'rgba(16, 185, 129, 0.2)';
  }

  const gradId = `mini-chart-grad-${color}-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={stopColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {/* Gradient Fill under path */}
      <path d={fillD} fill={`url(#${gradId})`} />
      {/* Stroke path */}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Highlight dot on the last element */}
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="3"
          fill={strokeColor}
          className="animate-pulse"
        />
      )}
    </svg>
  );
}
