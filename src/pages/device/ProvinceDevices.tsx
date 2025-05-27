
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Settings, Power } from 'lucide-react';

const ProvinceDevices = () => {
  const { province } = useParams();
  
  const provinceData = {
    north: {
      name: 'North Province',
      districts: ['Gicumbi', 'Musanze', 'Gakenke', 'Rulindo', 'Burera'],
      color: 'bg-yellow-500'
    },
    south: {
      name: 'South Province', 
      districts: ['Nyanza', 'Gisagara', 'Nyaruguru', 'Huye', 'Nyamagabe', 'Ruhango', 'Muhanga', 'Kamonyi'],
      color: 'bg-blue-500'
    },
    east: {
      name: 'East Province',
      districts: ['Rwamagana', 'Nyagatare', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Bugesera'],
      color: 'bg-orange-500'
    },
    west: {
      name: 'West Province',
      districts: ['Nyabihu', 'Karongi', 'Ngororero', 'Nyamasheke', 'Rubavu', 'Rusizi', 'Rutsiro'],
      color: 'bg-green-500'
    },
    kigali: {
      name: 'Kigali City',
      districts: ['Nyarugenge', 'Gasabo', 'Kicukiro'],
      color: 'bg-purple-500'
    }
  };

  const currentProvince = provinceData[province as keyof typeof provinceData];

  const deviceTypes = [
    { name: 'ESP32', count: 150, active: 148, icon: '📡' },
    { name: 'Sensors', count: 200, active: 195, icon: '🌡️' },
    { name: 'Smart Valves', count: 80, active: 78, icon: '🔧' },
    { name: 'LoRa Modules', count: 120, active: 118, icon: '📶' },
  ];

  const devices = currentProvince?.districts.flatMap((district, districtIndex) => 
    deviceTypes.map((type, typeIndex) => ({
      id: `${districtIndex}-${typeIndex}`,
      name: `${type.name}-${district}-${typeIndex + 1}`,
      type: type.name,
      district,
      status: Math.random() > 0.1 ? 'online' : 'offline',
      lastSeen: Math.random() > 0.5 ? '2 min ago' : '5 min ago',
      battery: Math.floor(Math.random() * 100),
    }))
  ) || [];

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/device">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentProvince?.name} Devices</h1>
              <p className="text-gray-600">Manage IoT devices and infrastructure</p>
            </div>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
            <Plus className="w-4 h-4" />
            Add Device
          </Button>
        </div>

        {/* Device Type Summary */}
        <div className="grid grid-cols-4 gap-6">
          {deviceTypes.map((type) => (
            <Card key={type.name}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-semibold">{type.name}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="font-medium">{type.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active:</span>
                    <span className="font-medium text-green-600">{type.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Offline:</span>
                    <span className="font-medium text-red-600">{type.count - type.active}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Devices List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Device List</CardTitle>
            <p className="text-sm text-gray-500">All devices in {currentProvince?.name}</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Device Name</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Type</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">District</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Last Seen</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Battery</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {devices.slice(0, 20).map((device) => (
                    <tr key={device.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{device.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{device.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{device.district}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          device.status === 'online' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {device.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{device.lastSeen}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                device.battery > 50 ? 'bg-green-500' : 
                                device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${device.battery}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{device.battery}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Power className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProvinceDevices;
