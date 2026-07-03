/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  theme?: 'dark' | 'light';
  onClick?: () => void;
  id?: string;
  key?: string | number | null;
}

export default function GlassCard({
  children,
  className = '',
  glow = false,
  theme = 'dark',
  onClick,
  id
}: GlassCardProps) {
  const baseStyle = theme === 'dark' ? 'glass-card' : 'glass-card-light';
  const glowStyle = glow && theme === 'dark' 
    ? 'relative before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-luxury-gold/10 before:pointer-events-none' 
    : '';

  return (
    <div
      id={id}
      onClick={onClick}
      className={`${baseStyle} rounded-2xl p-6 ${glowStyle} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
