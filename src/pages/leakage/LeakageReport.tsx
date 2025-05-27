
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import RegionIcon from '@/components/ui/RegionIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Edit, CheckCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeakageData {
  date: string;
  time: string;
  waterLoss: number;
  pressureDrop: number;
  location: string;
  severity: 'High' | 'Medium' | 'Low';
  action: boolean;
  status: 'Resolved' | 'Investigating';
  plumber?: string;
  resolvedDate?: string;
  resolvedNote?: string;
}

const LeakageReport = () => {
  const { regionId } = useParams();
  const [selectedTimeframe, setSelectedTimeframe] = useState('yesterday');
  const [selectedTab, setSelectedTab] = useState('leakage');

  // Get region based on regionId
  const getRegionInfo = (id: string) => {
    const regions = {
      'north': { name: 'North', region: 'north' },
      'south': { name: 'South', region: 'south' },
      'east': { name: 'East', region: 'east' },
      'west': { name: 'West', region: 'west' },
      'kigali': { name: 'Kigali', region: 'kigali' },
    };
    
    return regions[id as keyof typeof regions] || { name: 'Unknown', region: 'north' };
  };
  
  const regionInfo = getRegionInfo(regionId || 'kigali');

  // Mock leakage detection data
  const leakageData: LeakageData = {
    date: '06/03/2025',
    time: '12:00 AM',
    waterLoss: 20,
    pressureDrop: 20,
    location: 'Kigali, Kicukiro,Kamarahsi',
    severity: 'High',
    action: true,
    status: 'Resolved',
    plumber: 'Rubangurumikiza Armable',
    resolvedDate: '06/03/2025',
    resolvedNote: 'There was a pipe leakage that damaged the pipe in a great amount, but it has been fixed and water is flowing again.'
  };

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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Leakage Report</CardTitle>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Download size={16} />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-mono text-center my-6">TUE-06/03/2025</h2>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-medium mb-4">Leakage Detection</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{leakageData.date}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{leakageData.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
                  <div className="mb-4">
                    <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold">{leakageData.waterLoss}</div>
                    <div className="text-blue-800 dark:text-blue-300 text-xs">cm³</div>
                    <div className="text-blue-600 dark:text-blue-400 text-xs mt-1">water loss</div>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
                  <div className="mb-4">
                    <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold">{leakageData.pressureDrop}</div>
                    <div className="text-blue-800 dark:text-blue-300 text-xs">kpa</div>
                    <div className="text-blue-600 dark:text-blue-400 text-xs mt-1">pressure drop</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <div className="text-sm">{leakageData.location}</div>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v2m0 4h.01"/><path d="M4.331 5.578a10 10 0 0 1 15.338 0M6.357 7.95a7 7 0 0 1 11.286 0"/><path d="M8.383 10.322a4 4 0 0 1 7.234 0"/></svg>
                  <div className="text-sm font-medium">Severity:</div>
                  <div className="text-sm text-red-500">{leakageData.severity}</div>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/></svg>
                  <div className="text-sm font-medium">Action:</div>
                  <div className="text-sm">{leakageData.action ? 'Yes' : 'No'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                  <div className="text-sm font-medium">Status:</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <input 
                        type="radio" 
                        id="resolved" 
                        name="status"
                        className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500"
                        checked={leakageData.status === 'Resolved'}
                      />
                      <label htmlFor="resolved" className="text-sm">Resolved</label>
                    </div>
                    <div className="flex items-center gap-1">
                      <input 
                        type="radio" 
                        id="investigating" 
                        name="status"
                        className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500"
                        checked={leakageData.status === 'Investigating'}
                      />
                      <label htmlFor="investigating" className="text-sm">Investigating</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {leakageData.status === 'Resolved' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg shadow-sm mb-8 relative">
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Edit size={16} className="text-blue-600" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-4 text-blue-600">
                  <CheckCircle size={20} />
                  <h3 className="text-lg font-medium">Resolved leakage</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Date</div>
                    <div className="text-sm">{leakageData.resolvedDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Plumber</div>
                    <div className="text-sm">{leakageData.plumber}</div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Resolved note</div>
                  <div className="text-sm">{leakageData.resolvedNote}</div>
                </div>
                <div className="flex justify-center mt-8">
                  <div className="flex flex-col items-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.0801V12.0001C21.9988 14.1565 21.3005 16.2548 20.0093 17.9819C18.7182 19.7091 16.9033 20.9726 14.8354 21.5839C12.7674 22.1952 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4882 2.02168 11.3364C2.16356 9.18467 2.99721 7.13643 4.39828 5.49718C5.79935 3.85793 7.69279 2.71549 9.79619 2.24025C11.8996 1.76502 14.1003 1.98245 16.07 2.86011" stroke="#12AD59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01L9 11.01" stroke="#12AD59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-2xl font-bold mt-2 mb-4">Success</span>
                  </div>
                </div>
              </div>
            )}

            {leakageData.status === 'Investigating' && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg shadow-sm mb-8 relative">
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Edit size={16} className="text-yellow-600" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-4 text-yellow-600">
                  <Search size={20} />
                  <h3 className="text-lg font-medium">Investigating leakage</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Date Reported</div>
                    <div className="text-sm">{leakageData.date}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Assigned To</div>
                    <div className="text-sm">Not assigned yet</div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Investigation Status</div>
                  <div className="text-sm">Technicians have been dispatched to assess the situation.</div>
                </div>
                <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700">
                  Mark as Resolved
                </Button>
              </div>
            )}

            <h2 className="text-xl font-mono text-center my-6">FRI-14/03/2025</h2>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LeakageReport;
