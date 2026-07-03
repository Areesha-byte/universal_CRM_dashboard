/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HISTORICAL_REVENUE } from '../data';

interface RevenueChartProps {
  theme?: 'dark' | 'light';
}

export default function RevenueChart({ theme = 'dark' }: RevenueChartProps) {
  const [range, setRange] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = HISTORICAL_REVENUE[range];
  const values = data.map((d) => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const rangeVal = max - min === 0 ? 1 : max - min;

  // Chart dimensions
  const height = 240;
  const width = 600;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Calculate coordinates
  const points = data.map((item, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    // Keep 15% padding at top and bottom of the chart area
    const y =
      paddingTop +
      chartHeight -
      ((item.value - min) / rangeVal) * (chartHeight * 0.7 + 10) -
      10;
    return { x, y, label: item.label, value: item.value };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const fillD = `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  const formatCurrency = (val: number) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    return `$${(val / 1000).toFixed(0)}K`;
  };

  const textClass = theme === 'dark' ? 'text-gray-400 font-mono text-[10px]' : 'text-gray-500 font-mono text-[10px]';
  const gridStroke = theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
  const activeGridStroke = theme === 'dark' ? 'rgba(226, 192, 116, 0.15)' : 'rgba(181, 146, 66, 0.15)';

  return (
    <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'glass-card' : 'glass-card-light'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className={`text-xs uppercase tracking-wider font-semibold ${theme === 'dark' ? 'text-luxury-gold' : 'text-luxury-gold-dark'}`}>
            Financial Performance
          </span>
          <h3 className={`text-2xl font-serif mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Revenue Pipeline Analytics
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-black/20 dark:bg-white/5 p-1 rounded-lg border border-white/5">
          {(['weekly', 'monthly', 'yearly'] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRange(r);
                setHoverIndex(null);
              }}
              className={`px-3 py-1 text-xs rounded-md transition-all font-medium capitalize ${
                range === r
                  ? 'bg-luxury-gold text-black shadow-lg font-semibold'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-white/5'
                  : 'text-gray-600 hover:text-black hover:bg-black/5'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-x-auto no-scrollbar">
        <div className="min-w-[600px] h-[240px] relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2c074" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#e2c074" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = paddingTop + ratio * chartHeight;
              const gridVal = max - ratio * rangeVal;
              return (
                <g key={i}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke={gridStroke}
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingLeft - 10}
                    y={y + 3}
                    textAnchor="end"
                    className={textClass}
                    fill="currentColor"
                  >
                    {formatCurrency(gridVal)}
                  </text>
                </g>
              );
            })}

            {/* Area under the line */}
            <path d={fillD} fill="url(#chartGrad)" />

            {/* Main Area Stroke */}
            <path
              d={pathD}
              fill="none"
              stroke="#e2c074"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Vertical guidelines and interactivity anchors */}
            {points.map((p, i) => {
              const isActive = hoverIndex === i;
              return (
                <g key={i}>
                  {/* Vertical hover guide */}
                  {isActive && (
                    <line
                      x1={p.x}
                      y1={paddingTop}
                      x2={p.x}
                      y2={height - paddingBottom}
                      stroke={activeGridStroke}
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Node trigger */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 6 : 4}
                    fill={isActive ? '#e2c074' : (theme === 'dark' ? '#0a0a0c' : '#ffffff')}
                    stroke="#e2c074"
                    strokeWidth="2"
                    onMouseEnter={() => setHoverIndex(i)}
                    className="cursor-pointer transition-all duration-200"
                  />

                  {/* X Axis Label */}
                  <text
                    x={p.x}
                    y={height - paddingBottom + 20}
                    textAnchor="middle"
                    className={`${textClass} font-sans`}
                    fill="currentColor"
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}

            {/* Mouseover listening overlays */}
            {points.map((p, i) => (
              <rect
                key={`rect-${i}`}
                x={p.x - chartWidth / (points.length * 2)}
                y={paddingTop}
                width={chartWidth / points.length}
                height={chartHeight}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                className="cursor-pointer"
              />
            ))}
          </svg>

          {/* Interactive HTML Tooltip */}
          {hoverIndex !== null && points[hoverIndex] && (
            <div
              className="absolute pointer-events-none p-3 rounded-lg border border-luxury-gold/20 shadow-xl transition-all duration-150 glass-panel z-10 text-xs flex flex-col gap-0.5"
              style={{
                left: `${points[hoverIndex].x + 10}px`,
                top: `${points[hoverIndex].y - 65}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                {points[hoverIndex].label} Pipeline
              </span>
              <span className="font-serif text-base text-luxury-gold font-semibold">
                {points[hoverIndex].value.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
