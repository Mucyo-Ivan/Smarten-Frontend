
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import RegionIcon from '@/components/ui/RegionIcon';

interface DeviceDetail {
  id: string;
  name: string;
  currentState: 'ON' | 'OFF';
  lastCommand: 'OFF' | 'ON';
  communication: 'Online' | 'Offline';
  lastTimestamp: string;
  lastTimestampDetail: string;
  connectedESP: string;
  location: {
    region: 'north',
    province: string;
    district: string;
    sector: string;
    cell: string;
  }
}

const DeviceDetail = () => {
  const { deviceId } = useParams();

  // Mock device data
  const device: DeviceDetail = {
    id: deviceId || "",
    name: "RD-BS-SM-01",
    currentState: "ON",
    lastCommand: "OFF",
    communication: "Online",
    lastTimestamp: "Today",
    lastTimestampDetail: "09:50 AM",
    connectedESP: "RD-BS-ESP-01",
    location: {
      region: 'north',
      province: "Rulindo",
      district: "Base",
      sector: "Cyohoha",
      cell: "Mushangi"
    }
  };

  return (
    <MainLayout title="Smart Valves">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-6">
          <RegionIcon region="north" />
          <h2 className="text-xl font-semibold">Rulindo</h2>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-xl font-medium">{device.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 15-6-6"/><rect width="8" height="8" x="3" y="3" rx="2"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
                Commands
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Current State</span>
                  <span className={`font-medium ${device.currentState === 'ON' ? 'text-green-500' : 'text-red-500'}`}>
                    {device.currentState}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Last Command</span>
                  <span className={`font-medium ${device.lastCommand === 'ON' ? 'text-green-500' : 'text-red-500'}`}>
                    {device.lastCommand}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                Communication
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    device.communication === 'Online'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600'
                      : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                  }`}>
                    {device.communication}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Last Timestamp</span>
                  <div className="text-right">
                    <div className="font-medium">{device.lastTimestamp}</div>
                    <div className="text-xs text-gray-500">{device.lastTimestampDetail}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                Connected ESP32
              </h3>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">Devices</span>
                <span className="font-medium">{device.connectedESP}</span>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Location
              </h3>
              
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <RegionIcon region={device.location.region} size="sm" />
                  <span className="text-gray-600 dark:text-gray-400">{device.location.province}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                <span className="text-gray-600 dark:text-gray-400">{device.location.district}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                <span className="text-gray-600 dark:text-gray-400">{device.location.sector}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                <span className="text-gray-600 dark:text-gray-400">{device.location.cell}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceDetail;
