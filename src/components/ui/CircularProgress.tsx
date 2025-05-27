
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  className?: string;
}

const CircularProgress = ({
  value,
  size = 100,
  strokeWidth = 10,
  color = "#0EA5E9",
  bgColor = "#E2E8F0",
  label,
  className,
}: CircularProgressProps) => {
  // Ensure value is within 0-100 range
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;
  
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Label in the center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold">{`${value}%`}</span>
        {label && <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</span>}
      </div>
    </div>
  );
};

export default CircularProgress;
