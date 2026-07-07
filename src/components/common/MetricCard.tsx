import { TrendingUp, TrendingDown } from 'lucide-react';

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
  return (
    <div className="bg-white p-5 border border-gray-100 rounded-none shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex flex-col items-center justify-center shrink-0 border border-gray-100/50 ${iconBgClass} ${iconColorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#1B2A4A] font-bold mb-1 tracking-wide">{title}</p>
        <h3 className="text-2xl font-bold text-[#1B2A4A]">{value}</h3>
        <p className={`text-[10px] flex items-center gap-1 mt-1 font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />} 
          {trendValue} <span className="text-gray-400">{trendText}</span>
        </p>
      </div>
    </div>
  );
};
