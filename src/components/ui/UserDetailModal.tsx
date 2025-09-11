import { X, ChevronRight } from 'lucide-react';
import GianaLockettImage from '../../../Smarten Assets/assets/Giana Lockett 1.png';
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    location: string;
    consumed: string;
    unit: string;
  };
  province?: string;
}

const UserDetailModal = ({ isOpen, onClose, user, province = 'north' }: UserDetailModalProps) => {
  if (!isOpen) return null;

  // Province data with icons and colors
  const provinceData = {
    north: { name: 'North', icon: NorthIcon, color: '#F3C623' },
    south: { name: 'South', icon: SouthIcon, color: '#0E9CFF' },
    east: { name: 'East', icon: EastIcon, color: '#F97316' },
    west: { name: 'West', icon: WestIcon, color: '#22C55E' },
    kigali: { name: 'Kigali', icon: KigaliIcon, color: '#A855F7' },
  };

  const currentProvince = provinceData[province as keyof typeof provinceData] || provinceData.north;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Picture and Name */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200">
              <img 
                src={GianaLockettImage} 
                alt="Uwera Liza"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Uwera Liza</h3>
          </div>

          {/* Consumed Water */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-900">Consumed Water</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Monthly</p>
              <p className="text-xl font-bold text-gray-900">1900 litres</p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-900">Location</h4>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: currentProvince.color }}>
                <img src={currentProvince.icon} alt={currentProvince.name} className="w-4 h-4" />
              </div>
              <span>{currentProvince.name}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span>Rulindo</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span>Base</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span>Cyohoha</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span>Mushongi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
