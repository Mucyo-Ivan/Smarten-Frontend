
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import RegionIcon from '@/components/ui/RegionIcon';

const DeviceSelector = () => {
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>('esp32');
  const [selectedRegion, setSelectedRegion] = useState<string>('west');

  const deviceTypes = [
    { id: 'esp32', name: 'ESP32', description: 'Microcontroller devices' },
    { id: 'sensors', name: 'Sensors', description: 'Water monitoring sensors' },
    { id: 'smart-valves', name: 'Smart Valves', description: 'Automated valve controls' },
    { id: 'lora', name: 'LoRa', description: 'Long-range communication devices' },
  ];

  const regions = [
    { id: 'north', name: 'North', value: 20000, unit: 'ESP32', color: 'bg-yellow-50', iconBg: 'bg-yellow-500', borderColor: 'border-yellow-200' },
    { id: 'south', name: 'South', value: 59000, unit: 'ESP32', color: 'bg-blue-50', iconBg: 'bg-blue-500', borderColor: 'border-blue-200' },
    { id: 'east', name: 'East', value: 100000, unit: 'ESP32', color: 'bg-orange-50', iconBg: 'bg-orange-500', borderColor: 'border-orange-200' },
    { id: 'west', name: 'West', value: 420000, unit: 'ESP32', color: 'bg-green-50', iconBg: 'bg-green-500', borderColor: 'border-green-200' },
    { id: 'kigali', name: 'Kigali', value: 120000, unit: 'ESP32', color: 'bg-purple-50', iconBg: 'bg-purple-500', borderColor: 'border-purple-200' },
  ];

  const westDistricts = [
    { id: 'nyabihu', name: 'Nyabihu', count: 20, sectors: 12 },
    { id: 'karongi', name: 'Karongi', count: 20, sectors: 10 },
    { id: 'ngororero', name: 'Ngororero', count: 20, sectors: 13 },
    { id: 'nyamasheke', name: 'Nyamasheke', count: 20, sectors: 14 },
    { id: 'rubavu', name: 'Rubavu', count: 20, sectors: 12 },
    { id: 'rusizi', name: 'Rusizi', count: 20, sectors: 18 },
    { id: 'rutsiro', name: 'Rutsiro', count: 20, sectors: 13 },
  ];

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Device Management</h1>
          <p className="text-lg text-gray-600 mb-8">Select device type and region to manage your IoT infrastructure</p>
          
          {/* Device Type Selector */}
          <div className="inline-flex bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
            {deviceTypes.map((type) => (
              <button
                key={type.id}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedDeviceType === type.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedDeviceType(type.id)}
              >
                <div className="text-center">
                  <div className="font-semibold">{type.name}</div>
                  <div className="text-xs opacity-75">{type.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Regional Overview */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Regional Overview</h2>
          <div className="grid grid-cols-5 gap-6">
            {regions.map((region) => (
              <Card
                key={region.id}
                className={`${region.color} border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                  selectedRegion === region.id 
                    ? `${region.borderColor} ring-2 ring-offset-2 ring-blue-500` 
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 ${region.iconBg} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-sm font-bold">
                        {region.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">{region.name}</span>
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {region.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">{region.unit} Devices</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active:</span>
                      <span className="font-medium text-green-600">98.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Offline:</span>
                      <span className="font-medium text-red-600">1.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* District Level Details */}
        {selectedRegion === 'west' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <RegionIcon region="west" size="lg" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">West Province</h2>
                <p className="text-gray-600">District-level device distribution</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {westDistricts.map((district) => (
                <Card key={district.id} className="hover:shadow-lg transition-all duration-200 border border-gray-200">
                  <CardContent className="p-6">
                    <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
                      <h3 className="text-xl font-semibold">{district.name}</h3>
                      <p className="text-green-100 text-sm">{district.sectors} sectors</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Devices:</span>
                        <span className="text-2xl font-bold text-gray-900">{district.count}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">ESP32:</span>
                          <span className="font-medium">{Math.floor(district.count * 0.4)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sensors:</span>
                          <span className="font-medium">{Math.floor(district.count * 0.3)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">LoRa:</span>
                          <span className="font-medium">{Math.floor(district.count * 0.2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Valves:</span>
                          <span className="font-medium">{Math.floor(district.count * 0.1)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link to={`/device/list/${district.id}`}>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                          Manage Devices
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DeviceSelector;
