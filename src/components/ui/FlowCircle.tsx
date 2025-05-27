
import { cn } from '@/lib/utils';

interface FlowCircleProps {
  value: number;
  unit: string;
  className?: string;
  color?: string;
  textColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FlowCircle = ({ 
  value, 
  unit, 
  className, 
  color = 'bg-blue-100 dark:bg-blue-900/20', 
  textColor = 'text-blue-600 dark:text-blue-400',
  size = 'md' 
}: FlowCircleProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const valueSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div 
      className={cn(
        'rounded-full flex flex-col items-center justify-center', 
        color,
        sizeClasses[size],
        className
      )}
    >
      <span className={cn('font-bold', textColor, valueSizeClasses[size])}>
        {value}
      </span>
      <span className="text-xs text-gray-600 dark:text-gray-400">
        {unit}
      </span>
    </div>
  );
};

export default FlowCircle;
