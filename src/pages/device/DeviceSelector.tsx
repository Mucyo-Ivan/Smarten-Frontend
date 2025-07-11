import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import RegionIcon from '@/components/ui/RegionIcon';
import { ChevronDown, Droplets, Thermometer, Wind, Activity, Zap } from 'lucide-react';

// Import SVG icons
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';

const DeviceSelector = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>('esp32');
  const [selectedRegion, setSelectedRegion] = useState<string>('north');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [sensorCounts, setSensorCounts] = useState<{[key: string]: number}>({}); // Store sensor counts per district
  const navigate = useNavigate();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const deviceTypes = [
    { id: 'esp32', name: 'ESP32' },
    { id: 'sensors', name: 'Sensors' },
    { id: 'smart-valves', name: 'Smart Valves' },
  ];

  const regions = [
    { id: 'north', name: 'North', value: 20000, icon: NorthIcon, color: '#FCD34D', text: 'ESP32', sensor: { flow: 20000 }, smartValves: 20000 },
    { id: 'south', name: 'South', value: 59000, icon: SouthIcon, color: '#60A5FA', text: 'ESP32', sensor: { flow: 20000 }, smartValves: 20000 },
    { id: 'east', name: 'East', value: 100000, icon: EastIcon, color: '#FB923C', text: 'ESP32', sensor: { flow: 20000 }, smartValves: 20000 },
    { id: 'west', name: 'West', value: 420000, icon: WestIcon, color: '#22C55E', text: 'ESP32', sensor: { flow: 20000 }, smartValves: 20000 },
    { id: 'kigali', name: 'Kigali', value: 120000, icon: KigaliIcon, color: '#A855F7', text: 'ESP32', sensor: { flow: 20000 }, smartValves: 20000 },
  ];

  const provinceDistricts = {
    north: [
      { id: 'rulindo', name: 'Rulindo' },
      { id: 'burera', name: 'Burera' },
      { id: 'musanze', name: 'Musanze' },
      { id: 'gicumbi', name: 'Gicumbi' },
      { id: 'gakenke', name: 'Gakenke' },
    ],
    south: [
      { id: 'huye', name: 'Huye' },
      { id: 'nyanza', name: 'Nyanza' },
      { id: 'gisagara', name: 'Gisagara' },
      { id: 'nyaruguru', name: 'Nyaruguru' },
      { id: 'kamonyi', name: 'Kamonyi' },
      { id: 'ruhango', name: 'Ruhango' },
      { id: 'muhanga', name: 'Muhanga' },
      { id: 'nyamagabe', name: 'Nyamagabe' },
    ],
    east: [
      { id: 'bugesera', name: 'Bugesera' },
      { id: 'nyagatare', name: 'Nyagatare' },
      { id: 'gatsibo', name: 'Gatsibo' },
      { id: 'kayonza', name: 'Kayonza' },
      { id: 'kirehe', name: 'Kirehe' },
      { id: 'ngoma', name: 'Ngoma' },
      { id: 'rwamagana', name: 'Rwamagana' },
    ],
    west: [
      { id: 'nyabihu', name: 'Nyabihu' },
      { id: 'karongi', name: 'Karongi' },
      { id: 'ngororero', name: 'Ngororero' },
      { id: 'nyamasheke', name: 'Nyamasheke' },
      { id: 'rubavu', name: 'Rubavu' },
      { id: 'rusizi', name: 'Rusizi' },
      { id: 'rutsiro', name: 'Rutsiro' },
    ],
    kigali: [
      { id: 'gasabo', name: 'Gasabo' },
      { id: 'nyarugenge', name: 'Nyarugenge' },
      { id: 'kicukiro', name: 'Kicukiro' },
    ],
  };
  
  // Generate random sensor counts for each district
  useEffect(() => {
    const counts: {[key: string]: number} = {};
    
    // Generate counts for all districts across all regions
    Object.values(provinceDistricts).forEach(districts => {
      districts.forEach(district => {
        // Generate a random number between 5 and 25 for sensors
        counts[district.id] = Math.floor(Math.random() * 20) + 5;
      });
    });
    
    setSensorCounts(counts);
  }, []);

  // Get random sensor type for sensor view
  const getSensorType = (districtId: string) => {
    const sensorTypes = ['Water Quality', 'Temperature', 'Flow Rate', 'Pressure', 'Humidity'];
    const sensorIcons = [Droplets, Thermometer, Wind, Activity, Zap];
    
    // Use the district ID to consistently get the same sensor type for a district
    const index = districtId.length % sensorTypes.length;
    return {
      name: sensorTypes[index],
      Icon: sensorIcons[index]
    };
  };
  
  // Get districts based on selected region
  const getDistricts = () => {
    if (!selectedRegion) return [];
    return provinceDistricts[selectedRegion as keyof typeof provinceDistricts] || [];
  };
  
  // Get appropriate color for the selected device type
  const getDeviceColor = () => {
    switch (selectedDeviceType) {
      case 'esp32':
        return '#0095ff';
      case 'sensors':
        return '#10b981';
      case 'smart-valves':
        return '#f97316';
      case 'lora':
        return '#8b5cf6';
      default:
        return '#0095ff';
    }
  };

  // Get appropriate title based on the selected device type
  const getDeviceTitle = () => {
    switch (selectedDeviceType) {
      case 'esp32':
        return 'ESP32';
      case 'sensors':
        return 'Sensors';
      case 'smart-valves':
        return 'Smart Valves';
      case 'lora':
        return 'Lora';
      default:
        return 'ESP32';
    }
  };

  const districts = getDistricts();

  // Render a district card with consistent styling but dynamic data
  const renderDistrictCard = (district: any, bgColor: string, bgGradient: string) => (
    <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
      <div className={bgColor} style={{backgroundImage: bgGradient}}>
        {district.name}
      </div>
      <div className="p-5">
        <div className="text-3xl font-bold text-center mb-0">
          {selectedDeviceType === 'sensors' ? sensorCounts[district.id] || 0 : district.count}
        </div>
        <div className="text-sm text-gray-500 text-center mb-4">
          {selectedDeviceType === 'sensors' ? (
            <div className="flex items-center justify-center gap-1">
              {React.createElement(getSensorType(district.id).Icon, { size: 16, className: 'text-[#10b981]' })}
              <span>{getSensorType(district.id).name}</span>
            </div>
          ) : (
            getDeviceTitle()
          )}
        </div>
        <div className="flex justify-center">
          <Link to={`/device/list/${district.id}?type=${selectedDeviceType}`}>
            <button 
              className="text-white text-sm py-1 px-4 rounded-full"
              style={{ backgroundColor: selectedDeviceType === 'sensors' ? '#10b981' : '#0095ff' }}
            >
              See Devices
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Choose a device</h1>
          
          {/* Device Type Selector */}
          <div className="inline-flex bg-white rounded-full p-1 border border-gray-200 shadow-sm mb-8 mx-auto">
            {deviceTypes.map((type) => (
              <button
                key={type.id}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  selectedDeviceType === type.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedDeviceType(type.id)}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Regional Overview */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {regions.map((region) => (
              <div
                key={region.id}
                className={`bg-white rounded-xl shadow-md p-5 cursor-pointer flex flex-col items-center border-2 transition-all duration-200 ${selectedRegion === region.id ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setSelectedRegion(region.id)}
                style={{ minWidth: 180 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: `${region.color}33` }}>
                    <img src={region.icon} alt={region.name} className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-base" style={{ color: region.color }}>{region.name}</span>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 mb-1">{
                  selectedDeviceType === 'esp32' ? region.value.toLocaleString() :
                  selectedDeviceType === 'sensors' ? region.sensor.flow.toLocaleString() :
                  selectedDeviceType === 'smart-valves' ? region.smartValves.toLocaleString() :
                  region.value.toLocaleString()
                }</div>
                <div className="text-xs font-medium text-gray-500">
                  {selectedDeviceType === 'esp32' && 'ESP32'}
                  {selectedDeviceType === 'sensors' && 'Water Flow sensor'}
                  {selectedDeviceType === 'smart-valves' && 'Smart Valves'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Province Dropdown and District Cards Section - Always Visible */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-base font-semibold focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ minWidth: 120 }}
          >
                <span className="w-7 h-7 flex items-center justify-center rounded-full" style={{ background: `${regions.find(r => r.id === selectedRegion)?.color}33` }}>
                  <img src={regions.find(r => r.id === selectedRegion)?.icon} alt={regions.find(r => r.id === selectedRegion)?.name} className="w-4 h-4" />
                </span>
                <span style={{ color: regions.find(r => r.id === selectedRegion)?.color, fontWeight: 700 }}>
                  {regions.find(r => r.id === selectedRegion)?.name}
                </span>
                <ChevronDown className={`ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} size={18} />
              </button>
          {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-20 border border-gray-100 flex flex-col" ref={dropdownRef}>
              {regions.map(region => (
                    <button
                  key={region.id}
                      className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-xl text-left"
                  onClick={() => {
                    setSelectedRegion(region.id);
                    setDropdownOpen(false);
                  }}
                      style={{ width: '100%' }}
                >
                      <span className="w-6 h-6 flex items-center justify-center rounded-full" style={{ background: `${region.color}33` }}>
                        <img src={region.icon} alt={region.name} className="w-4 h-4" />
                      </span>
                      <span style={{ color: region.color, fontWeight: 700 }}>{region.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="ml-2 text-lg font-semibold">On the district level</span>
        </div>
        
          {/* District Cards - Conditional Rendering */}
              {selectedRegion === 'north' ? (
                <>
              <div className="flex flex-wrap gap-8 justify-center w-full mb-8">
                {provinceDistricts['north'].slice(0, 3).map((district) => (
                  <div key={district.id} className="bg-white rounded-3xl shadow-md overflow-hidden w-[200px] flex flex-col items-center">
                    <div
                      className="w-full py-3 text-center font-bold text-lg"
                      style={{
                        background: `repeating-linear-gradient(90deg, ${regions.find(r => r.id === selectedRegion)?.color}CC, ${regions.find(r => r.id === selectedRegion)?.color}CC 12px, ${regions.find(r => r.id === selectedRegion)?.color}99 12px, ${regions.find(r => r.id === selectedRegion)?.color}99 24px)`,
                        color: '#fff',
                        letterSpacing: '1px',
                      }}
                    >
                      {district.name}
                    </div>
                    <div className="p-5 w-full flex flex-col items-center">
                      <div className="text-3xl font-extrabold text-center mb-0">20</div>
                      <div className="text-sm text-gray-500 text-center mb-4">
                        {selectedDeviceType === 'esp32' && 'ESP32'}
                        {selectedDeviceType === 'sensors' && 'Water Flow sensor'}
                        {selectedDeviceType === 'smart-valves' && 'Smart Valves'}
                      </div>
                      <Link to={`/device/list/${district.id}?type=${selectedDeviceType}`} className="w-full flex justify-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1.5 transition-all duration-200 shadow"
                          style={{ fontSize: '13px' }}
                        >
                          See Devices
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-8 justify-center w-full">
                <div className="flex-1"></div>
                {provinceDistricts['north'].slice(3, 5).map((district) => (
                  <div key={district.id} className="bg-white rounded-3xl shadow-md overflow-hidden w-[200px] flex flex-col items-center mx-auto">
                    <div
                      className="w-full py-3 text-center font-bold text-lg"
                      style={{
                        background: `repeating-linear-gradient(90deg, ${regions.find(r => r.id === selectedRegion)?.color}CC, ${regions.find(r => r.id === selectedRegion)?.color}CC 12px, ${regions.find(r => r.id === selectedRegion)?.color}99 12px, ${regions.find(r => r.id === selectedRegion)?.color}99 24px)`,
                        color: '#fff',
                        letterSpacing: '1px',
                      }}
                    >
                      {district.name}
                    </div>
                    <div className="p-5 w-full flex flex-col items-center">
                      <div className="text-3xl font-extrabold text-center mb-0">20</div>
                      <div className="text-sm text-gray-500 text-center mb-4">
                        {selectedDeviceType === 'esp32' && 'ESP32'}
                        {selectedDeviceType === 'sensors' && 'Water Flow sensor'}
                        {selectedDeviceType === 'smart-valves' && 'Smart Valves'}
                      </div>
                      <Link to={`/device/list/${district.id}?type=${selectedDeviceType}`} className="w-full flex justify-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1.5 transition-all duration-200 shadow"
                          style={{ fontSize: '13px' }}
                        >
                          See Devices
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="flex-1"></div>
                  </div>
                </>
          ) : (
            <div className="flex flex-wrap gap-8 justify-center">
              {provinceDistricts[selectedRegion]?.map((district) => (
                <div key={district.id} className="bg-white rounded-3xl shadow-md overflow-hidden w-[200px] flex flex-col items-center">
                  <div
                    className="w-full py-3 text-center font-bold text-lg"
                    style={{
                      background: `repeating-linear-gradient(90deg, ${regions.find(r => r.id === selectedRegion)?.color}CC, ${regions.find(r => r.id === selectedRegion)?.color}CC 12px, ${regions.find(r => r.id === selectedRegion)?.color}99 12px, ${regions.find(r => r.id === selectedRegion)?.color}99 24px)`,
                      color: '#fff',
                      letterSpacing: '1px',
                    }}
                  >
                    {district.name}
                  </div>
                  <div className="p-5 w-full flex flex-col items-center">
                    <div className="text-3xl font-extrabold text-center mb-0">20</div>
                    <div className="text-sm text-gray-500 text-center mb-4">
                      {selectedDeviceType === 'esp32' && 'ESP32'}
                      {selectedDeviceType === 'sensors' && 'Water Flow sensor'}
                      {selectedDeviceType === 'smart-valves' && 'Smart Valves'}
                </div>
                    <Link to={`/device/list/${district.id}?type=${selectedDeviceType}`} className="w-full flex justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-full px-4 py-1.5 transition-all duration-200 shadow"
                        style={{ fontSize: '13px' }}
                      >
                        See Devices
                      </button>
                    </Link>
                </div>
                </div>
              ))}
                </div>
              )}
            </div>
      </div>
    </MainLayout>
  );
};

export default DeviceSelector;
