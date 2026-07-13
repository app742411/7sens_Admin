import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { clsx } from 'clsx';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  trendValue: string;
  trendText: string;
  iconBgClass?: string;
  iconColorClass?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  trendText,
  iconBgClass = 'bg-blue-50',
  iconColorClass = 'text-blue-500'
}) => {
  const isGreen = iconColorClass.includes('green');
  const isBlue = iconColorClass.includes('blue');
  const isRed = iconColorClass.includes('red');
  const isYellow = iconColorClass.includes('yellow') || iconColorClass.includes('orange') || iconColorClass.includes('amber') || iconColorClass.includes('gold') || iconColorClass.includes('C9A84C');
  
  const hoverBorderClass = isGreen 
    ? 'hover:border-green-300' 
    : isBlue 
      ? 'hover:border-blue-300' 
      : isRed 
        ? 'hover:border-red-300' 
        : isYellow 
          ? 'hover:border-amber-300' 
          : 'hover:border-[#C9A84C]/50';

  const glowClass = isGreen 
    ? 'to-green-500/5' 
    : isBlue 
      ? 'to-blue-500/5' 
      : isRed 
        ? 'to-red-500/5' 
        : isYellow 
          ? 'to-amber-500/5' 
          : 'to-[#C9A84C]/5';

  const iconHoverClass = isGreen 
    ? 'group-hover:from-green-600 group-hover:to-green-500' 
    : isBlue 
      ? 'group-hover:from-blue-600 group-hover:to-blue-500' 
      : isRed 
        ? 'group-hover:from-red-600 group-hover:to-red-500' 
        : isYellow 
          ? 'group-hover:from-[#C9A84C] group-hover:to-[#b59641]' 
          : 'group-hover:from-[#C9A84C] group-hover:to-[#b59641]';

  return (
    <div className={clsx(
      "bg-white p-5 border border-gray-100 rounded-none shadow-sm flex flex-col gap-4 relative overflow-hidden group transition-all duration-300 hover:shadow-md",
      hoverBorderClass
    )}>
      {/* Dynamic corner gradient glow */}
      <div className={clsx(
        "absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-transparent rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none",
        glowClass
      )} />
      
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</span>
          <span className="text-2xl font-extrabold text-[#1B2A4A] tracking-tight">{value}</span>
        </div>
        <div className={clsx(
          "w-10 h-10 rounded-none flex items-center justify-center transition-all duration-300 shadow-sm shrink-0 border border-transparent bg-gradient-to-br from-transparent to-transparent group-hover:text-white group-hover:border-transparent",
          iconBgClass,
          iconColorClass,
          iconHoverClass
        )}>
          {icon}
        </div>
      </div>
      
      <div className="flex items-center gap-1 text-xs font-bold mt-1 border-t border-gray-50 pt-3 z-10">
        <span className={clsx(
          "flex items-center gap-0.5",
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        )}>
          {trend === 'up' ? (
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          ) : (
            <ArrowDownRight size={14} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          )}
          <span>{trendValue}</span>
        </span>
        <span className="text-gray-400 font-medium ml-0.5">{trendText}</span>
      </div>
    </div>
  );
};
