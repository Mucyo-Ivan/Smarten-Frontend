
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RegionIcon from '@/components/ui/RegionIcon';

interface Device {
  id: string;
  name: string;
  communication: 'Online' | 'Offline';
  timestamp: string;
  timestampDetail: string;
  state: 'ON' | 'OFF';
}

const DeviceList = () => {
  const { regionId } = useParams();
  const [selectedSector, setSelectedSector] = useState('base');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get region based on regionId
  const getRegionInfo = (id: string) => {
    const regions = {
      'nyanza': { name: 'Nyanza', region: 'south' },
      'gisagara': { name: 'Gisagara', region: 'south' },
      'rulindo': { name: 'Rulindo', region: 'north' },
      'gasabo': { name: 'Gasabo', region: 'kigali' },
      'nyarugenge': { name: 'Nyarugenge', region: 'kigali' },
      'kicukiro': { name: 'Kicukiro', region: 'kigali' },
    };
    
    return regions[id as keyof typeof regions] || { name: 'Unknown', region: 'north' };
  };
  
  const regionInfo = getRegionInfo(regionId || '');
  
  const sectors = [
    { id: 'base', name: 'Base' },
    { id: 'burega', name: 'Burega' },
    { id: 'bushoki', name: 'Bushoki' },
    { id: 'buyoga', name: 'Buyoga' },
  ];
  
  const devices: Device[] = [
    { id: "RD-BS-SM-01", name: "RD-BS-SM-01", communication: "Online", timestamp: "Today", timestampDetail: "07:00 AM", state: "ON" },
    { id: "RD-BS-SM-02", name: "RD-BS-SM-02", communication: "Offline", timestamp: "Yesterday", timestampDetail: "12:30 AM", state: "OFF" },
    { id: "RD-BS-SM-03", name: "RD-BS-SM-03", communication: "Online", timestamp: "Today", timestampDetail: "11:00 AM", state: "ON" },
    { id: "RD-BS-SM-04", name: "RD-BS-SM-04", communication: "Online", timestamp: "Today", timestampDetail: "02:00 PM", state: "ON" },
    { id: "RD-BS-SM-05", name: "RD-BS-SM-05", communication: "Online", timestamp: "Today", timestampDetail: "04:00 PM", state: "OFF" },
    { id: "RD-BS-SM-06", name: "RD-BS-SM-06", communication: "Offline", timestamp: "Today", timestampDetail: "06:00 PM", state: "OFF" },
    { id: "RD-BS-SM-07", name: "RD-BS-SM-07", communication: "Online", timestamp: "Today", timestampDetail: "08:00 PM", state: "OFF" },
    { id: "RD-BS-SM-08", name: "RD-BS-SM-08", communication: "Offline", timestamp: "Yesterday", timestampDetail: "09:00 AM", state: "ON" },
    { id: "RD-BS-SM-09", name: "RD-BS-SM-09", communication: "Offline", timestamp: "06/04/2025", timestampDetail: "10:00 AM", state: "ON" },
    { id: "RD-BS-SM-10", name: "RD-BS-SM-10", communication: "Offline", timestamp: "05/04/2025", timestampDetail: "11:00 AM", state: "OFF" },
    { id: "RD-BS-SM-11", name: "RD-BS-SM-11", communication: "Offline", timestamp: "04/04/2025", timestampDetail: "09:00 AM", state: "OFF" },
  ];

  return (
    <MainLayout title="Smart Valves">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-6">
          <RegionIcon region={regionInfo.region as any} />
          <h2 className="text-xl font-semibold">{regionInfo.name}</h2>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="font-medium">Base</span>
                <button className="p-1">
                  <ChevronLeft size={16} />
                </button>
              </div>

              <div className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg p-1 z-10 hidden">
                {sectors.map((sector) => (
                  <button
                    key={sector.id}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md ${
                      selectedSector === sector.id ? 'bg-blue-50 dark:bg-blue-900/30 text-smarten-blue' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedSector(sector.id)}
                  >
                    {sector.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">1900 esp32</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 text-sm font-medium">N°</th>
                  <th className="pb-3 text-sm font-medium">Name</th>
                  <th className="pb-3 text-sm font-medium">Communication</th>
                  <th className="pb-3 text-sm font-medium">Timestamp</th>
                  <th className="pb-3 text-sm font-medium">State</th>
                  <th className="pb-3 text-sm font-medium">More</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, index) => (
                  <tr key={device.id} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{device.name}</td>
                    <td className="py-3">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        device.communication === 'Online'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600'
                          : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
                      }`}>
                        {device.communication}
                      </span>
                    </td>
                    <td className="py-3">
                      <div>{device.timestamp}</div>
                      <div className="text-xs text-gray-500">{device.timestampDetail}</div>
                    </td>
                    <td className="py-3">
                      <span className={`font-medium ${
                        device.state === 'ON'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}>
                        {device.state}
                      </span>
                    </td>
                    <td className="py-3">
                      <Link 
                        to={`/device/detail/${device.id}`}
                        className="text-sm text-smarten-blue px-3 py-1 border border-smarten-blue rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        View more
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md bg-smarten-blue text-white"
            >
              1
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              2
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              3
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeviceList;
