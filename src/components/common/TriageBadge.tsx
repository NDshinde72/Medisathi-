/**
 * RuralCare AI — Triage Badge Component
 * Displays severity rating with standardized clinical color coding.
 */

import React from 'react';
import { TriageUrgency } from '../../types';
import { ShieldAlert, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface TriageBadgeProps {
  level: TriageUrgency;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const TriageBadge: React.FC<TriageBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const config = {
    EMERGENCY: {
      bg: 'bg-red-100 text-red-800 border-red-300',
      icon: ShieldAlert,
      label: 'EMERGENCY TRIAGE',
      dot: 'bg-red-500 animate-ping',
    },
    HIGH: {
      bg: 'bg-orange-100 text-orange-800 border-orange-300',
      icon: AlertTriangle,
      label: 'HIGH URGENCY',
      dot: 'bg-orange-500',
    },
    MODERATE: {
      bg: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: AlertCircle,
      label: 'MODERATE URGENCY',
      dot: 'bg-amber-500',
    },
    LOW: {
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: CheckCircle,
      label: 'LOW URGENCY (MILD)',
      dot: 'bg-emerald-500',
    },
  }[level] || {
    bg: 'bg-slate-100 text-slate-800 border-slate-300',
    icon: AlertCircle,
    label: level,
    dot: 'bg-slate-500',
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm gap-2 font-bold',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-md border font-semibold tracking-wide ${config.bg} ${sizeClasses}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`} />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
      </span>
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{config.label}</span>
    </span>
  );
};
