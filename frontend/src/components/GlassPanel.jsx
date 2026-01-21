import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function GlassPanel({ children, className }) {
  return (
    <div className={twMerge("glass-panel rounded-2xl p-6", className)}>
      {children}
    </div>
  );
}
