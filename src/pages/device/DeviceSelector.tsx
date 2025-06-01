
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import RegionIcon from '@/components/ui/RegionIcon';
import { ChevronDown } from 'lucide-react';

// Import SVG icons
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';

// DistrictCard component for consistent district rendering
interface DistrictCardProps {
  district: {
    id: string;
    name: string;
    devices: {
      esp32: number;
      sensors: number;
      'smart-valves': number;
    };
  };
  selectedDeviceType: string;
  regionColor: string;
  gradientStyle: React.CSSProperties;
}

const DistrictCard: React.FC<DistrictCardProps> = ({ 
  district, 
  selectedDeviceType, 
  regionColor, 
  gradientStyle 
}) => {
  const deviceCount = district.devices[selectedDeviceType as keyof typeof district.devices] || 0;
  const buttonColor = selectedDeviceType === 'sensors' ? '#009DFF' : '#0095ff';
  
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
      <div className="py-3 text-center font-medium text-white text-lg" 
           style={{...gradientStyle, backgroundColor: regionColor}}>
        {district.name}
      </div>
      <div className="p-5">
        <div className="text-3xl font-bold text-center mb-0">{deviceCount}</div>
        <div className="text-sm text-gray-500 text-center mb-4">
          {selectedDeviceType === 'esp32' ? 'ESP32' : 
           selectedDeviceType === 'sensors' ? 'Sensors' : 'Smart Valves'}
        </div>
        <div className="flex justify-center">
          <Link to={`/device/list/${district.id}?type=${selectedDeviceType}`}>
            <button className="text-white text-sm py-1 px-4 rounded-full"
                    style={{backgroundColor: buttonColor}}>
              See Devices
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const DeviceSelector = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>('esp32');
  const [selectedRegion, setSelectedRegion] = useState<string>('north');
  // No longer need dropdown functionality since we're using region tabs directly

  const deviceTypes = [
    { id: 'esp32', name: 'ESP32', color: '#737373', bgColor: '#EEEEEE' },
    { id: 'sensors', name: 'Sensors', color: '#FFFFFF', bgColor: '#009DFF' },
    { id: 'smart-valves', name: 'Smart Valves', color: '#737373', bgColor: '#FFFFFF' },
  ];

  const regions = [
    { id: 'north', name: 'North', waterFlow: 20000, letter: 'N', color: 'bg-yellow-500', icon: NorthIcon },
    { id: 'south', name: 'South', waterFlow: 20000, letter: 'S', color: 'bg-blue-500', icon: SouthIcon },
    { id: 'east', name: 'East', waterFlow: 20000, letter: 'E', color: 'bg-orange-500', icon: EastIcon },
    { id: 'west', name: 'West', waterFlow: 20000, letter: 'W', color: 'bg-green-500', icon: WestIcon },
    { id: 'kigali', name: 'Kigali', waterFlow: 20000, letter: 'K', color: 'bg-purple-500', icon: KigaliIcon },
  ];

  // District data for each province with counts for different device types
  const provinceDistricts = {
    north: [
      { id: 'rulindo', name: 'Rulindo', devices: { esp32: 20, sensors: 15, 'smart-valves': 8 } },
      { id: 'burera', name: 'Burera', devices: { esp32: 22, sensors: 18, 'smart-valves': 12 } },
      { id: 'musanze', name: 'Musanze', devices: { esp32: 25, sensors: 20, 'smart-valves': 15 } },
      { id: 'gicumbi', name: 'Gicumbi', devices: { esp32: 18, sensors: 14, 'smart-valves': 7 } },
      { id: 'gakenke', name: 'Gakenke', devices: { esp32: 16, sensors: 12, 'smart-valves': 5 } },
    ],
    south: [
      { id: 'huye', name: 'Huye', devices: { esp32: 24, sensors: 16, 'smart-valves': 10 } },
      { id: 'nyanza', name: 'Nyanza', devices: { esp32: 22, sensors: 18, 'smart-valves': 9 } },
      { id: 'gisagara', name: 'Gisagara', devices: { esp32: 18, sensors: 14, 'smart-valves': 7 } },
      { id: 'nyaruguru', name: 'Nyaruguru', devices: { esp32: 16, sensors: 12, 'smart-valves': 6 } },
      { id: 'kamonyi', name: 'Kamonyi', devices: { esp32: 20, sensors: 15, 'smart-valves': 8 } },
      { id: 'ruhango', name: 'Ruhango', devices: { esp32: 19, sensors: 14, 'smart-valves': 7 } },
      { id: 'muhanga', name: 'Muhanga', devices: { esp32: 21, sensors: 16, 'smart-valves': 9 } },
      { id: 'nyamagabe', name: 'Nyamagabe', devices: { esp32: 17, sensors: 13, 'smart-valves': 6 } },
    ],
    east: [
      { id: 'bugesera', name: 'Bugesera', devices: { esp32: 23, sensors: 19, 'smart-valves': 11 } },
      { id: 'nyagatare', name: 'Nyagatare', devices: { esp32: 26, sensors: 22, 'smart-valves': 14 } },
      { id: 'gatsibo', name: 'Gatsibo', devices: { esp32: 21, sensors: 17, 'smart-valves': 9 } },
      { id: 'kayonza', name: 'Kayonza', devices: { esp32: 19, sensors: 15, 'smart-valves': 8 } },
      { id: 'kirehe', name: 'Kirehe', devices: { esp32: 17, sensors: 13, 'smart-valves': 6 } },
      { id: 'ngoma', name: 'Ngoma', devices: { esp32: 20, sensors: 16, 'smart-valves': 8 } },
      { id: 'rwamagana', name: 'Rwamagana', devices: { esp32: 22, sensors: 18, 'smart-valves': 10 } },
    ],
    west: [
      { id: 'nyabihu', name: 'Nyabihu', devices: { esp32: 19, sensors: 15, 'smart-valves': 7 } },
      { id: 'karongi', name: 'Karongi', devices: { esp32: 21, sensors: 17, 'smart-valves': 9 } },
      { id: 'ngororero', name: 'Ngororero', devices: { esp32: 18, sensors: 14, 'smart-valves': 7 } },
      { id: 'nyamasheke', name: 'Nyamasheke', devices: { esp32: 20, sensors: 16, 'smart-valves': 8 } },
      { id: 'rubavu', name: 'Rubavu', devices: { esp32: 24, sensors: 20, 'smart-valves': 12 } },
      { id: 'rusizi', name: 'Rusizi', devices: { esp32: 22, sensors: 18, 'smart-valves': 10 } },
      { id: 'rutsiro', name: 'Rutsiro', devices: { esp32: 17, sensors: 13, 'smart-valves': 6 } },
    ],
    kigali: [
      { id: 'gasabo', name: 'Gasabo', devices: { esp32: 30, sensors: 25, 'smart-valves': 18 } },
      { id: 'nyarugenge', name: 'Nyarugenge', devices: { esp32: 28, sensors: 23, 'smart-valves': 16 } },
      { id: 'kicukiro', name: 'Kicukiro', devices: { esp32: 26, sensors: 21, 'smart-valves': 14 } },
    ],
  };
  
  // Get districts based on selected region
  const getDistricts = () => {
    if (!selectedRegion) return [];
    return provinceDistricts[selectedRegion as keyof typeof provinceDistricts] || [];
  };

  const districts = getDistricts();

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Choose a device</h1>
          
          {/* Device Type Selector */}
          <div className="flex gap-4 mb-8 w-[390px] mx-auto justify-between">
            {deviceTypes.map((device) => (
              <button
                key={device.id}
                style={{
                  backgroundColor: selectedDeviceType === device.id ? device.bgColor : '#EEEEEE',
                  color: selectedDeviceType === device.id ? device.color : '#737373'
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium min-w-[120px] border ${
                  selectedDeviceType === device.id && device.id === 'smart-valves' ? 'border-gray-300' : 'border-transparent'
                }`}
                onClick={() => setSelectedDeviceType(device.id)}
              >
                {device.name}
              </button>
            ))}
          </div>
        </div>

        {/* Regional Overview */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {regions.map((region) => (
              <div
                key={region.id}
                className={`bg-white rounded-lg shadow-sm p-5 cursor-pointer hover:shadow-md transition-all duration-200 ${selectedRegion === region.id ? 'border-2 border-blue-200' : 'border border-transparent'}`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 flex items-center justify-center`}>
                    <img src={region.icon} alt={region.name} className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-gray-900">{region.name}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mt-1">
                  {region.waterFlow.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">ESP32</div>
              </div>
            ))}
          </div>
        </div>

        {/* District Level Display */}
        {selectedRegion && (
          <div>
            <div className="flex items-center mb-6 justify-between" style={{maxWidth: '960px', margin: '0 auto'}}>
              <div className="font-semibold text-gray-700">On the district level</div>
            </div>
            
            <div className="flex justify-between mb-8 mx-auto" style={{maxWidth: '960px'}}>
              {/* Region stats */}
              {regions.map((region) => (
                <div
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`px-3 py-2 cursor-pointer flex flex-col items-center ${
                    selectedRegion === region.id ? 'bg-gray-100 rounded-xl' : ''
                  }`}
                  style={{width: '110px'}}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${region.color}`}>
                    <img src={region.icon} alt={region.name} className="w-6 h-6" />
                  </div>
                  <div className="text-center text-sm mt-1">{region.name}</div>
                  <div className="flex flex-col mt-1">
                    <div className="text-xs text-gray-500 text-center">Water Flow</div>
                    <div className="font-bold text-center">{region.waterFlow.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            

            
            {/* Render districts with specific layouts per province */}
            {selectedRegion === 'north' && (
              <div className="flex flex-col items-center gap-8">
                <div className="flex gap-8">
                  {districts.slice(0, 3).map((district) => (
                    <DistrictCard 
                      key={district.id} 
                      district={district} 
                      selectedDeviceType={selectedDeviceType}
                      regionColor="#FFBE0B"
                      gradientStyle={{backgroundImage: 'repeating-linear-gradient(to right, rgba(251, 191, 36, 0.7), rgba(251, 191, 36, 0.7) 10px, rgba(217, 119, 6, 0.5) 10px, rgba(217, 119, 6, 0.5) 20px)'}}
                    />
                  ))}
                </div>
                <div className="flex gap-8 justify-center">
                  {districts.slice(3, 5).map((district) => (
                    <DistrictCard 
                      key={district.id} 
                      district={district} 
                      selectedDeviceType={selectedDeviceType}
                      regionColor="#FFBE0B"
                      gradientStyle={{backgroundImage: 'repeating-linear-gradient(to right, rgba(251, 191, 36, 0.7), rgba(251, 191, 36, 0.7) 10px, rgba(217, 119, 6, 0.5) 10px, rgba(217, 119, 6, 0.5) 20px)'}}
                    />
                  ))}
                </div>
              </div>
            )}

            {selectedRegion === 'south' && (
              <div className="grid grid-cols-4 gap-8">
                {districts.map((district) => (
                  <DistrictCard 
                    key={district.id} 
                    district={district} 
                    selectedDeviceType={selectedDeviceType}
                    regionColor="#3B82F6"
                    gradientStyle={{backgroundImage: 'repeating-linear-gradient(to right, rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0.7) 10px, rgba(37, 99, 235, 0.5) 10px, rgba(37, 99, 235, 0.5) 20px)'}}
                  />
                ))}
              </div>
            )}

            {selectedRegion === 'east' && (
              <div className="flex flex-col items-center gap-8">
                <div className="flex gap-8">
                  {districts.slice(0, 4).map((district) => (
                    <DistrictCard 
                      key={district.id} 
                      district={district} 
                      selectedDeviceType={selectedDeviceType}
                      regionColor="#FD7E14"
                      gradientStyle={{backgroundImage: 'repeating-linear-gradient(to right, rgba(249, 115, 22, 0.7), rgba(249, 115, 22, 0.7) 10px, rgba(234, 88, 12, 0.5) 10px, rgba(234, 88, 12, 0.5) 20px)'}}
                    />
                  ))}
                </div>
                <div className="flex gap-8 justify-center">
                  {districts.slice(4, 7).map((district) => (
                    <DistrictCard 
                      key={district.id} 
                      district={district} 
                      selectedDeviceType={selectedDeviceType}
                      regionColor="#FD7E14"
                      gradientStyle={{backgroundImage: 'repeating-linear-gradient(to right, rgba(249, 115, 22, 0.7), rgba(249, 115, 22, 0.7) 10px, rgba(234, 88, 12, 0.5) 10px, rgba(234, 88, 12, 0.5) 20px)'}}
                    />
                  ))}
                </div>
              </div>
            )}

            {selectedRegion === 'west' && (
              <div className="flex flex-col items-center gap-8">
                <div className="flex gap-8">
                  {districts.slice(0, 4).map((district) => (
                    <DistrictCard 
                      key={district.id} 
                      district={district} 
                      selectedDeviceType={selectedDeviceType}
                      regionColor="#22C55E"
                      gradientStyle={{backgroundImage: 'repeating-linear-gradient(to right, rgba(34, 197, 94, 0.7), rgba(34, 197, 94, 0.7) 10px, rgba(22, 163, 74, 0.5) 10px, rgba(22, 163, 74, 0.5) 20px)'}}
                    />
                  ))}
                </div>
                <div className="flex gap-8 justify-center">
                  {districts.slice(4, 7).map((district) => (
                    <DistrictCard 
                      key={district.id} 
                      district={district} 
                      selectedDeviceType={selectedDeviceType}
                      regionColor="#22C55E"
                      gradientStyle={{backgroundImage: 'repeating-linear-gradient(to right, rgba(34, 197, 94, 0.7), rgba(34, 197, 94, 0.7) 10px, rgba(22, 163, 74, 0.5) 10px, rgba(22, 163, 74, 0.5) 20px)'}}
                    />
                  ))}
                </div>
              </div>
            )}

            {selectedRegion === 'kigali' && (
              <div className="flex gap-8 justify-center">
                {districts.map((district) => (
                  <DistrictCard 
                    key={district.id} 
                    district={district} 
                    selectedDeviceType={selectedDeviceType}
                    regionColor="#AF52DE"
                    gradientStyle={{backgroundImage: 'repeating-linear-gradient(to right, rgba(168, 85, 247, 0.7), rgba(168, 85, 247, 0.7) 10px, rgba(147, 51, 234, 0.5) 10px, rgba(147, 51, 234, 0.5) 20px)'}}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DeviceSelector;
