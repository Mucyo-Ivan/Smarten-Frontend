
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import RegionIcon from '@/components/ui/RegionIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ControlData {
  id: number;
  date: string;
  time?: string;
  location: string;
  command: 'ON' | 'OFF';
  situation: 'normal' | 'leakage';
}

const ControlReport = () => {
  const { regionId } = useParams();
  const [selectedTimeframe, setSelectedTimeframe] = useState('yesterday');
  const [selectedTab, setSelectedTab] = useState('control');

  // Get region based on regionId
  const getRegionInfo = (id: string) => {
    const regions = {
      'north': { name: 'North', region: 'north' },
      'south': { name: 'South', region: 'south' },
      'east': { name: 'East', region: 'east' },
      'west': { name: 'West', region: 'west' },
      'kigali': { name: 'Kigali', region: 'kigali' },
    };
    
    return regions[id as keyof typeof regions] || { name: 'North', region: 'north' };
  };
  
  const regionInfo = getRegionInfo(regionId || 'north');

  // Mock control data
  const controlData: ControlData[] = [
    { id: 1, date: 'Today', time: '07:00 AM', location: 'Burera', command: 'ON', situation: 'normal' },
    { id: 2, date: 'Yesterday', time: '03:00 PM', location: 'Gicumbi', command: 'OFF', situation: 'leakage' },
    { id: 3, date: 'Today', time: '10:00 AM', location: 'Musanze', command: 'ON', situation: 'normal' },
    { id: 4, date: 'Today', time: '01:00 PM', location: 'Rulindo', command: 'ON', situation: 'leakage' },
    { id: 5, date: 'Today', time: '04:00 PM', location: 'Gakenke', command: 'OFF', situation: 'normal' },
    { id: 6, date: 'Today', time: '06:00 PM', location: 'Burera', command: 'OFF', situation: 'leakage' },
    { id: 7, date: 'Today', time: '08:00 PM', location: 'Gicumbi', command: 'OFF', situation: 'normal' },
    { id: 8, date: 'Yesterday', time: '09:00 AM', location: 'Musanze', command: 'ON', situation: 'leakage' },
    { id: 9, date: '06/04/2025', time: '10:00 AM', location: 'Rulindo', command: 'ON', situation: 'leakage' },
    { id: 10, date: '05/04/2025', time: '11:00 AM', location: 'Gakenke', command: 'OFF', situation: 'leakage' },
    { id: 11, date: '04/04/2025', time: '09:00 AM', location: 'Gicumbi', command: 'OFF', situation: 'leakage' },
  ];

  return (
    <MainLayout title="History">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <RegionIcon region={regionInfo.region as any} />
          <h2 className="text-xl font-semibold">{regionInfo.name}</h2>
          <button className="ml-1 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md bg-white dark:bg-gray-800 p-1 shadow-sm">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'leakage' 
                  ? 'bg-smarten-blue text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedTab('leakage')}
            >
              Leakage
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'readings' 
                  ? 'bg-smarten-blue text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedTab('readings')}
            >
              Readings
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === 'control' 
                  ? 'bg-smarten-blue text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedTab('control')}
            >
              Control
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2">
            <span className="font-medium">{selectedTimeframe === 'yesterday' ? 'Yesterday' : selectedTimeframe === 'past-week' ? 'Past week' : 'Past Month'}</span>
            <button className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Control Report</CardTitle>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Download size={16} />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="py-3 px-4 text-sm font-medium">N°</th>
                    <th className="py-3 px-4 text-sm font-medium">Date</th>
                    <th className="py-3 px-4 text-sm font-medium">Location</th>
                    <th className="py-3 px-4 text-sm font-medium">Commands</th>
                    <th className="py-3 px-4 text-sm font-medium">Situation</th>
                  </tr>
                </thead>
                <tbody>
                  {controlData.map((data) => (
                    <tr key={data.id} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4">{data.id}</td>
                      <td className="py-3 px-4">
                        <div>{data.date}</div>
                        {data.time && <div className="text-xs text-gray-500">{data.time}</div>}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          {data.location}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          data.command === 'ON'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}>
                          {data.command}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          data.situation === 'normal' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {data.situation}
                        </span>
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

export default ControlReport;
