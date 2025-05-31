
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

const DeviceSelector = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>('esp32');
  const [selectedRegion, setSelectedRegion] = useState<string>('north');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showProvinceSelector, setShowProvinceSelector] = useState<boolean>(true);
  
  // To force re-render when device type changes
  const [key, setKey] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
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
    { 
      id: 'north', 
      name: 'North', 
      value: 20000, 
      letter: 'N', 
      color: 'bg-yellow-500', 
      icon: NorthIcon,
      waterFlowSensorCount: 20000,
      pressureSensorCount: 20000
    },
    { 
      id: 'south', 
      name: 'South', 
      value: 59000, 
      letter: 'S', 
      color: 'bg-blue-500', 
      icon: SouthIcon,
      waterFlowSensorCount: 20000,
      pressureSensorCount: 20000
    },
    { 
      id: 'east', 
      name: 'East', 
      value: 100000, 
      letter: 'E', 
      color: 'bg-orange-500', 
      icon: EastIcon,
      waterFlowSensorCount: 20000,
      pressureSensorCount: 20000
    },
    { 
      id: 'west', 
      name: 'West', 
      value: 420000, 
      letter: 'W', 
      color: 'bg-green-500', 
      icon: WestIcon,
      waterFlowSensorCount: 20000,
      pressureSensorCount: 20000
    },
    { 
      id: 'kigali', 
      name: 'Kigali', 
      value: 120000, 
      letter: 'K', 
      color: 'bg-purple-500', 
      icon: KigaliIcon,
      waterFlowSensorCount: 20000,
      pressureSensorCount: 20000
    },
  ];

  // District data for each province
  const provinceDistricts = {
    north: [
      { id: 'rulindo', name: 'Rulindo', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'burera', name: 'Burera', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'musanze', name: 'Musanze', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'gicumbi', name: 'Gicumbi', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'gakenke', name: 'Gakenke', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
    ],
    south: [
      { id: 'huye', name: 'Huye', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'nyanza', name: 'Nyanza', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'gisagara', name: 'Gisagara', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'nyaruguru', name: 'Nyaruguru', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'kamonyi', name: 'Kamonyi', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'ruhango', name: 'Ruhango', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'muhanga', name: 'Muhanga', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'nyamagabe', name: 'Nyamagabe', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
    ],
    east: [
      { id: 'bugesera', name: 'Bugesera', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'nyagatare', name: 'Nyagatare', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'gatsibo', name: 'Gatsibo', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'kayonza', name: 'Kayonza', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'kirehe', name: 'Kirehe', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'ngoma', name: 'Ngoma', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'rwamagana', name: 'Rwamagana', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
    ],
    west: [
      { id: 'nyabihu', name: 'Nyabihu', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'karongi', name: 'Karongi', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'ngororero', name: 'Ngororero', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'nyamasheke', name: 'Nyamasheke', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'rubavu', name: 'Rubavu', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'rusizi', name: 'Rusizi', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'rutsiro', name: 'Rutsiro', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
    ],
    kigali: [
      { id: 'gasabo', name: 'Gasabo', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'nyarugenge', name: 'Nyarugenge', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
      { id: 'kicukiro', name: 'Kicukiro', count: 20, waterFlowSensorCount: 20, pressureSensorCount: 20 },
    ],
  };
  
  // Get districts based on selected region
  const getDistricts = () => {
    if (!selectedRegion) return [];
    return provinceDistricts[selectedRegion as keyof typeof provinceDistricts] || [];
  };

  const districts = getDistricts();
  
  // We're not using this effect anymore since we handle state reset in the onClick handler

  return (
    <MainLayout>
      <div key={key} className="p-6 bg-gray-50 min-h-screen">
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
                onClick={() => {
                  setSelectedDeviceType(type.id);
                  setSelectedRegion(''); // Reset region selection
                  setKey(prev => prev + 1); // Force re-render
                  setShowProvinceSelector(type.id === 'esp32');
                }}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* ESP32 Regional Overview - Only shown when ESP32 is selected */}
        {selectedDeviceType === 'esp32' && (
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
                    {region.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">ESP32</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show the province overview when Sensors is selected */}
        {selectedDeviceType === 'sensors' && !selectedRegion && (
          <div className="mt-10">
            <div className="grid grid-cols-5 gap-6 justify-center">
              {regions.map(region => (
                <div 
                  key={region.id} 
                  className="flex flex-col items-center cursor-pointer" 
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <div className="w-8 h-8 flex items-center justify-center mb-2">
                    <img src={region.icon} alt={region.name} className="w-7 h-7" />
                  </div>
                  <span className="font-medium text-sm mb-4">{region.name}</span>
                  
                  <div className="flex flex-col gap-1 w-full">
                    <div className="text-center font-bold text-xl">{region.waterFlowSensorCount.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-500 text-center">Water Flow sensor</div>
                  </div>
                  
                  <div className="flex flex-col gap-1 mt-1 w-full">
                    <div className="text-center font-bold text-xl">{region.pressureSensorCount.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-500 text-center">Pressure sensor</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show district level for Sensors when a region is selected */}
        {selectedDeviceType === 'sensors' && selectedRegion && (
          <div>
                <div className="flex items-center mb-4 relative" ref={dropdownRef}>
                  <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      if (dropdownOpen) {
                        setDropdownOpen(false);
                      } else {
                        setDropdownOpen(true);
                      }
                    }}
                  >
                    <div className="w-7 h-7 flex items-center justify-center mr-1">
                      <img src={regions.find(r => r.id === selectedRegion)?.icon} alt={regions.find(r => r.id === selectedRegion)?.name} className="w-6 h-6" />
                    </div>
                    <span className="font-medium">{regions.find(r => r.id === selectedRegion)?.name}</span>
                    <ChevronDown className={`w-4 h-4 ml-1 text-gray-500 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} />
                  </div>
                  
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md z-10 w-48 py-1">
                      {regions.map(region => (
                        <div 
                          key={region.id}
                          className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer ${selectedRegion === region.id ? 'bg-gray-50' : ''}`}
                          onClick={() => {
                            setSelectedRegion(region.id);
                            setDropdownOpen(false);
                          }}
                        >
                          <div className="w-6 h-6 flex items-center justify-center mr-2">
                            <img src={region.icon} alt={region.name} className="w-5 h-5" />
                          </div>
                          <span className="text-sm">{region.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mb-2">On the district level</div>
            
            <div className="flex flex-wrap gap-8 justify-center">
              {selectedRegion === 'north' ? (
                <>
                  <div className="flex gap-8 justify-center w-full">
                    {districts.slice(0, 3).map((district) => (
                      <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                        <div className="bg-[#FCD34D] py-3 text-center font-medium text-white text-lg" 
                             style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(253, 224, 71, 0.7), rgba(253, 224, 71, 0.7) 10px, rgba(251, 191, 36, 0.5) 10px, rgba(251, 191, 36, 0.5) 20px)'}}>
                          {district.name}
                        </div>
                        <div className="p-5">
                          <div className="text-2xl font-bold text-center mb-0">{district.waterFlowSensorCount}</div>
                          <div className="text-xs text-gray-500 text-center mb-2">Water Flow sensor</div>
                          
                          <div className="text-2xl font-bold text-center mb-0">{district.pressureSensorCount}</div>
                          <div className="text-xs text-gray-500 text-center mb-4">Pressure sensor</div>
                          
                          <div className="flex justify-center">
                            <Link to={`/device/list/${district.id}?type=sensors`}>
                              <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-8 justify-center">
                    {districts.slice(3, 5).map((district) => (
                      <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                        <div className="bg-[#FCD34D] py-3 text-center font-medium text-white text-lg" 
                             style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(253, 224, 71, 0.7), rgba(253, 224, 71, 0.7) 10px, rgba(251, 191, 36, 0.5) 10px, rgba(251, 191, 36, 0.5) 20px)'}}>
                          {district.name}
                        </div>
                        <div className="p-5">
                          <div className="text-2xl font-bold text-center mb-0">{district.waterFlowSensorCount}</div>
                          <div className="text-xs text-gray-500 text-center mb-2">Water Flow sensor</div>
                          
                          <div className="text-2xl font-bold text-center mb-0">{district.pressureSensorCount}</div>
                          <div className="text-xs text-gray-500 text-center mb-4">Pressure sensor</div>
                          
                          <div className="flex justify-center">
                            <Link to={`/device/list/${district.id}?type=sensors`}>
                              <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : selectedRegion === 'south' ? (
                <div className="grid grid-cols-4 gap-8">
                  {districts.map((district) => (
                    <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                      <div className="bg-[#396EB0] py-3 text-center font-medium text-white text-lg" 
                           style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0.7) 10px, rgba(37, 99, 235, 0.5) 10px, rgba(37, 99, 235, 0.5) 20px)'}}>
                        {district.name}
                      </div>
                      <div className="p-5">
                        <div className="text-2xl font-bold text-center mb-0">{district.waterFlowSensorCount}</div>
                        <div className="text-xs text-gray-500 text-center mb-2">Water Flow sensor</div>
                        
                        <div className="text-2xl font-bold text-center mb-0">{district.pressureSensorCount}</div>
                        <div className="text-xs text-gray-500 text-center mb-4">Pressure sensor</div>
                        
                        <div className="flex justify-center">
                          <Link to={`/device/list/${district.id}?type=sensors`}>
                            <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedRegion === 'east' ? (
                <div className="grid grid-cols-4 gap-8">
                  {districts.map((district) => (
                    <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                      <div className="bg-[#FD7E14] py-3 text-center font-medium text-white text-lg" 
                           style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(249, 115, 22, 0.7), rgba(249, 115, 22, 0.7) 10px, rgba(234, 88, 12, 0.5) 10px, rgba(234, 88, 12, 0.5) 20px)'}}>
                        {district.name}
                      </div>
                      <div className="p-5">
                        <div className="text-2xl font-bold text-center mb-0">{district.waterFlowSensorCount}</div>
                        <div className="text-xs text-gray-500 text-center mb-2">Water Flow sensor</div>
                        
                        <div className="text-2xl font-bold text-center mb-0">{district.pressureSensorCount}</div>
                        <div className="text-xs text-gray-500 text-center mb-4">Pressure sensor</div>
                        
                        <div className="flex justify-center">
                          <Link to={`/device/list/${district.id}?type=sensors`}>
                            <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedRegion === 'west' ? (
                <div className="grid grid-cols-4 gap-8">
                  {districts.map((district) => (
                    <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                      <div className="bg-[#22C55E] py-3 text-center font-medium text-white text-lg" 
                           style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(34, 197, 94, 0.7), rgba(34, 197, 94, 0.7) 10px, rgba(22, 163, 74, 0.5) 10px, rgba(22, 163, 74, 0.5) 20px)'}}>
                        {district.name}
                      </div>
                      <div className="p-5">
                        <div className="text-2xl font-bold text-center mb-0">{district.waterFlowSensorCount}</div>
                        <div className="text-xs text-gray-500 text-center mb-2">Water Flow sensor</div>
                        
                        <div className="text-2xl font-bold text-center mb-0">{district.pressureSensorCount}</div>
                        <div className="text-xs text-gray-500 text-center mb-4">Pressure sensor</div>
                        
                        <div className="flex justify-center">
                          <Link to={`/device/list/${district.id}?type=sensors`}>
                            <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-8">
                  {districts.map((district) => (
                    <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                      <div className="bg-[#AF52DE] py-3 text-center font-medium text-white text-lg" 
                           style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(168, 85, 247, 0.7), rgba(168, 85, 247, 0.7) 10px, rgba(147, 51, 234, 0.5) 10px, rgba(147, 51, 234, 0.5) 20px)'}}>
                        {district.name}
                      </div>
                      <div className="p-5">
                        <div className="text-2xl font-bold text-center mb-0">{district.waterFlowSensorCount}</div>
                        <div className="text-xs text-gray-500 text-center mb-2">Water Flow sensor</div>
                        
                        <div className="text-2xl font-bold text-center mb-0">{district.pressureSensorCount}</div>
                        <div className="text-xs text-gray-500 text-center mb-4">Pressure sensor</div>
                        
                        <div className="flex justify-center">
                          <Link to={`/device/list/${district.id}?type=sensors`}>
                            <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          </>
        ) : (
          // ESP32 VIEW
        
          <div>
            <div className="flex items-center mb-4 relative" ref={dropdownRef}>
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-7 h-7 flex items-center justify-center mr-1">
                  <img src={regions.find(r => r.id === selectedRegion)?.icon} alt={regions.find(r => r.id === selectedRegion)?.name} className="w-6 h-6" />
                </div>
                <span className="font-medium">{regions.find(r => r.id === selectedRegion)?.name}</span>
                <ChevronDown className={`w-4 h-4 ml-1 text-gray-500 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} />
              </div>
              
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                  {regions.map(region => (
                    <div 
                      key={region.id}
                      className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer ${selectedRegion === region.id ? 'bg-gray-50' : ''}`}
                      onClick={() => {
                        setSelectedRegion(region.id);
                        setDropdownOpen(false);
                      }}
                    >
                      <div className="w-6 h-6 flex items-center justify-center mr-2">
                        <img src={region.icon} alt={region.name} className="w-5 h-5" />
                      </div>
                      <span className="text-sm">{region.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mb-2">On the district level</div>
            
            <div className="flex flex-wrap gap-8 justify-center">
              {selectedRegion === 'north' ? (
                <>
                  <div className="flex gap-8 justify-center w-full">
                    {districts.slice(0, 3).map((district) => (
                      <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                        <div className="bg-[#FCD34D] py-3 text-center font-medium text-white text-lg" 
                             style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(253, 224, 71, 0.7), rgba(253, 224, 71, 0.7) 10px, rgba(251, 191, 36, 0.5) 10px, rgba(251, 191, 36, 0.5) 20px)'}}>
                          {district.name}
                        </div>
                        <div className="p-5">
                          <div className="text-3xl font-bold text-center mb-0">{district.count}</div>
                          <div className="text-sm text-gray-500 text-center mb-4">ESP32</div>
                          <div className="flex justify-center">
                            <Link to={`/device/list/${district.id}`}>
                              <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-8 justify-center">
                    {districts.slice(3, 5).map((district) => (
                      <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                        <div className="bg-[#FCD34D] py-3 text-center font-medium text-white text-lg" 
                             style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(253, 224, 71, 0.7), rgba(253, 224, 71, 0.7) 10px, rgba(251, 191, 36, 0.5) 10px, rgba(251, 191, 36, 0.5) 20px)'}}>
                          {district.name}
                        </div>
                        <div className="p-5">
                          <div className="text-3xl font-bold text-center mb-0">{district.count}</div>
                          <div className="text-sm text-gray-500 text-center mb-4">ESP32</div>
                          <div className="flex justify-center">
                            <Link to={`/device/list/${district.id}`}>
                              <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : selectedRegion === 'south' ? (
                <div className="grid grid-cols-4 gap-8">
                  {districts.map((district) => (
                    <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                      <div className="bg-[#396EB0] py-3 text-center font-medium text-white text-lg" 
                           style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0.7) 10px, rgba(37, 99, 235, 0.5) 10px, rgba(37, 99, 235, 0.5) 20px)'}}>
                        {district.name}
                      </div>
                      <div className="p-5">
                        <div className="text-3xl font-bold text-center mb-0">{district.count}</div>
                        <div className="text-sm text-gray-500 text-center mb-4">ESP32</div>
                        <div className="flex justify-center">
                          <Link to={`/device/list/${district.id}`}>
                            <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedRegion === 'east' ? (
                <div className="grid grid-cols-4 gap-8">
                  {districts.map((district) => (
                    <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                      <div className="bg-[#FD7E14] py-3 text-center font-medium text-white text-lg" 
                           style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(249, 115, 22, 0.7), rgba(249, 115, 22, 0.7) 10px, rgba(234, 88, 12, 0.5) 10px, rgba(234, 88, 12, 0.5) 20px)'}}>
                        {district.name}
                      </div>
                      <div className="p-5">
                        <div className="text-3xl font-bold text-center mb-0">{district.count}</div>
                        <div className="text-sm text-gray-500 text-center mb-4">ESP32</div>
                        <div className="flex justify-center">
                          <Link to={`/device/list/${district.id}`}>
                            <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedRegion === 'west' ? (
                <div className="grid grid-cols-4 gap-8">
                  {districts.map((district) => (
                    <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                      <div className="bg-[#22C55E] py-3 text-center font-medium text-white text-lg" 
                           style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(34, 197, 94, 0.7), rgba(34, 197, 94, 0.7) 10px, rgba(22, 163, 74, 0.5) 10px, rgba(22, 163, 74, 0.5) 20px)'}}>
                        {district.name}
                      </div>
                      <div className="p-5">
                        <div className="text-3xl font-bold text-center mb-0">{district.count}</div>
                        <div className="text-sm text-gray-500 text-center mb-4">ESP32</div>
                        <div className="flex justify-center">
                          <Link to={`/device/list/${district.id}`}>
                            <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-8">
                  {districts.map((district) => (
                    <div key={district.id} className="bg-white rounded-3xl shadow-sm overflow-hidden w-[200px]">
                      <div className="bg-[#AF52DE] py-3 text-center font-medium text-white text-lg" 
                           style={{backgroundImage: 'repeating-linear-gradient(to right, rgba(168, 85, 247, 0.7), rgba(168, 85, 247, 0.7) 10px, rgba(147, 51, 234, 0.5) 10px, rgba(147, 51, 234, 0.5) 20px)'}}>
                        {district.name}
                      </div>
                      <div className="p-5">
                        <div className="text-3xl font-bold text-center mb-0">{district.count}</div>
                        <div className="text-sm text-gray-500 text-center mb-4">ESP32</div>
                        <div className="flex justify-center">
                          <Link to={`/device/list/${district.id}`}>
                            <button className="bg-[#0095ff] text-white text-sm py-1 px-4 rounded-full">See Devices</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DeviceSelector;
