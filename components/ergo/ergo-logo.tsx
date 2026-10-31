'use client';

import React from 'react';
import Link from 'next/link';

interface ErgoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  withLink?: boolean;
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
}

export function ErgoLogo({
  size = 'md',
  showTagline = true,
  withLink = true,
  theme = 'auto',
  className = '',
}: ErgoLogoProps) {
  const iconDimensions = {
    sm: 'w-7 h-7 text-sm rounded-lg',
    md: 'w-8 h-8 text-base rounded-xl',
    lg: 'w-10 h-10 text-xl rounded-2xl',
  }[size];

  const titleSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }[size];

  const logoContent = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official ERGO Symbol */}
      <div
        className={`${iconDimensions} shrink-0 overflow-hidden shadow-md shadow-[#0F2B5D]/25 relative flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="ERGO Logo Mark"
        >
          {/* Deep Navy Squircle Base */}
          <rect width="100" height="100" rx="22" fill="#0F2B5D" />
          
          {/* Top Bar (Slate Blue) */}
          <path d="M37 24H54C58.4 24 62 27.6 62 32C62 36.4 58.4 40 54 40H37V24Z" fill="#939FB5" />

          {/* Middle Bar (Pure White) */}
          <path d="M37 44H64C68.4 44 72 47.6 72 52C72 56.4 68.4 60 64 60H37V44Z" fill="#FFFFFF" />

          {/* Vertical Stem (Pure White) */}
          <path d="M26 24C23.8 24 22 25.8 22 28V72H37V24H26Z" fill="#FFFFFF" />

          {/* Bottom Kinetic Arrow (Mint Emerald Forward Momentum) */}
          <path d="M22 64H71V57L85 70L71 83V76H22V64Z" fill="#16C5A6" />
        </svg>
      </div>

      {/* Brand & Parent Attribution */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight ${titleSize} ${
              theme === 'dark' ? 'text-white' : theme === 'light' ? 'text-slate-900' : 'text-slate-900 dark:text-white'
            }`}
          >
            ERGO
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#16C5A6] bg-[#16C5A6]/10 px-1.5 py-0.5 rounded-full border border-[#16C5A6]/25">
            AI
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[10px] font-medium tracking-tight mt-0.5 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Career Intelligence <span className="opacity-40">·</span> by Zaprill
          </span>
        )}
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="inline-flex hover:opacity-95 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
