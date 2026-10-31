import React from 'react';
import { cn } from '@/lib/utils';
import { CapabilityLevel } from '@/lib/types';

export type BadgeVariant =
  | 'default'
  | 'outline'
  | 'teal'
  | 'amber'
  | 'indigo'
  | 'emerald'
  | 'rose'
  | 'slate'
  | 'success'
  | 'warning'
  | 'neutral'
  | 'primary';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ children, variant = 'default', size = 'sm', className, ...props }: BadgeProps) {
  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-transparent text-slate-700 border-slate-300',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full',
    md: 'text-xs px-2.5 py-1 rounded-md font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-lg font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border transition-colors',
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.sm,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function CapabilityBadge({
  level,
  tier,
  size,
  className,
}: {
  level?: CapabilityLevel;
  tier?: CapabilityLevel | string;
  size?: 'sm' | 'md' | 'lg' | string;
  className?: string;
}) {
  const effective = (level || tier || 'self_declared') as CapabilityLevel;
  const badgeSize = (size === 'lg' ? 'lg' : size === 'md' ? 'md' : 'sm') as 'sm' | 'md' | 'lg';

  switch (effective) {
    case 'business_confirmed':
      return (
        <Badge variant="emerald" size={badgeSize} className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Business-Confirmed
        </Badge>
      );
    case 'expert_reviewed':
      return (
        <Badge variant="indigo" size={badgeSize} className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Expert-Reviewed
        </Badge>
      );
    case 'assessment_demonstrated':
      return (
        <Badge variant="teal" size={badgeSize} className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          Assessment-Demonstrated
        </Badge>
      );
    case 'self_declared':
    default:
      return (
        <Badge variant="slate" size={badgeSize} className={className}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Self-Declared
        </Badge>
      );
  }
}
