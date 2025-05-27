
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RegionIcon from './RegionIcon';
import { useNavigate, useLocation } from 'react-router-dom';

interface Province {
  id: string;
  name: string;
  region: 'north' | 'south' | 'east' | 'west' | 'kigali';
}

interface ProvinceDropdownProps {
  selectedProvince?: Province;
  onProvinceSelect?: (province: Province) => void;
  navigateToPage?: string;
}

const ProvinceDropdown = ({ selectedProvince, onProvinceSelect, navigateToPage }: ProvinceDropdownProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const provinces: Province[] = [
    { id: 'north', name: 'North', region: 'north' },
    { id: 'south', name: 'South', region: 'south' },
    { id: 'east', name: 'East', region: 'east' },
    { id: 'west', name: 'West', region: 'west' },
    { id: 'kigali', name: 'Kigali', region: 'kigali' },
  ];

  const [selected, setSelected] = useState<Province>(() => {
    // Try to get province from URL first
    const pathParts = location.pathname.split('/');
    const provinceFromUrl = provinces.find(p => p.id === pathParts[2]);
    return selectedProvince || provinceFromUrl || provinces[0];
  });

  // Update selected province when URL changes
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const provinceFromUrl = provinces.find(p => p.id === pathParts[2]);
    if (provinceFromUrl && provinceFromUrl.id !== selected.id) {
      setSelected(provinceFromUrl);
    }
  }, [location.pathname, selected.id]);

  const handleSelect = (province: Province) => {
    setSelected(province);
    onProvinceSelect?.(province);
    
    // Determine navigation based on current path
    const currentPath = location.pathname;
    let targetPath = '';
    
    if (currentPath.includes('/monitor')) {
      targetPath = `/monitor/${province.id}`;
    } else if (currentPath.includes('/device')) {
      targetPath = `/device/${province.id}`;
    } else if (currentPath.includes('/control')) {
      targetPath = `/control/${province.id}`;
    } else if (currentPath.includes('/leakage')) {
      targetPath = `/leakage/${province.id}`;
    } else if (navigateToPage) {
      targetPath = `${navigateToPage}/${province.id}`;
    }
    
    if (targetPath) {
      navigate(targetPath);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md p-2 transition-all duration-300 hover:scale-105">
          <RegionIcon region={selected.region} />
          <span className="text-lg font-semibold color-transition">{selected.name}</span>
          <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-300 hover:rotate-180" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-56 bg-white dark:bg-gray-800 border shadow-lg animate-scale-in"
      >
        {provinces.map((province) => (
          <DropdownMenuItem 
            key={province.id}
            onClick={() => handleSelect(province)}
            className={`flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer ${
              selected.id === province.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            <RegionIcon region={province.region} size="sm" />
            <span className="font-medium">{province.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProvinceDropdown;
