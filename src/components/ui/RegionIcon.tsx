
interface RegionIconProps {
  region: 'north' | 'south' | 'east' | 'west' | 'kigali';
  size?: 'sm' | 'md' | 'lg';
}

const RegionIcon = ({ region, size = 'md' }: RegionIconProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const regionColors = {
    north: 'bg-yellow-500',
    south: 'bg-blue-500', 
    east: 'bg-orange-500',
    west: 'bg-green-500',
    kigali: 'bg-purple-500'
  };

  const regionLetters = {
    north: 'N',
    south: 'S',
    east: 'E', 
    west: 'W',
    kigali: 'K'
  };

  return (
    <div className={`${sizeClasses[size]} ${regionColors[region]} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
      {regionLetters[region]}
    </div>
  );
};

export default RegionIcon;
