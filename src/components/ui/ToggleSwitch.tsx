
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ToggleSwitchProps {
  isOn?: boolean;
  onChange?: (isOn: boolean) => void;
  onLabel?: string;
  offLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const ToggleSwitch = ({ 
  isOn = false, 
  onChange, 
  onLabel = 'ON', 
  offLabel = 'OFF', 
  size = 'lg',
  disabled = false, 
}: ToggleSwitchProps) => {
  const [internalState, setInternalState] = useState(isOn);
  
  const value = isOn !== undefined ? isOn : internalState;
  
  const handleClick = () => {
    if (disabled) return;
    
    if (onChange) {
      onChange(!value);
    } else {
      setInternalState(!value);
    }
  };
  
  const sizes = {
    sm: 'w-14 h-8',
    md: 'w-20 h-10',
    lg: 'w-40 h-20',
  };
  
  const knobSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-16 h-16',
  };
  
  const textSizes = {
    sm: 'text-[8px]',
    md: 'text-xs',
    lg: 'text-xl',
  };
  
  return (
    <button
      className={cn(
        'relative rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105',
        sizes[size],
        value ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-200' : 'bg-gradient-to-r from-blue-400 to-blue-500 shadow-lg shadow-blue-200',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out bg-gray-800 dark:bg-gray-700 flex items-center justify-center font-bold shadow-lg',
          knobSizes[size],
          textSizes[size],
          {
            'left-1 transform rotate-0': !value,
            'right-1 transform rotate-180': value,
            'text-blue-400': !value,
            'text-green-400': value,
          }
        )}
        style={{
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {value ? onLabel : offLabel}
      </div>
    </button>
  );
};

export default ToggleSwitch;
