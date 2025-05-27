
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import RegionIcon from '@/components/ui/RegionIcon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/ui/StatusBadge';

interface ReadingsData {
  name: string;
  waterflow: number;
  pressure: number;
  status: 'normal' | 'underflow' | 'overflow';
}

interface TimeframeOption {
  id: string;
  label: string;
}

const ReadingsReport = () => {
  const { regionId } = useParams();
  const [selectedTimeframe, setSelectedTimeframe] = useState('yesterday');
  const [selectedTab, setSelectedTab] = useState('readings');
  const [selectedTimeline, setSelectedTimeline] = useState('yesterday');

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

  const timeframeOptions: TimeframeOption[] = [
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'past-week', label: 'Past week' },
    { id: 'past-month', label: 'Past Month' }
  ];

  const timelineOptions: TimeframeOption[] = [
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'past-week', label: 'Past Week' },
    { id: 'past-month', label: 'Past Month' },
    { id: 'past-year', label: 'Past Year' }
  ];

  // Mock readings data based on region
  const getReadingsData = (): ReadingsData[] => {
    if (regionId === 'north') {
      return [
        { name: 'Musanze', waterflow: 24, pressure: 44, status: 'underflow' },
        { name: 'Gakenke', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Rulindo', waterflow: 24, pressure: 44, status: 'overflow' },
        { name: 'Burera', waterflow: 24, pressure: 44, status: 'underflow' },
        { name: 'Gicumbi', waterflow: 24, pressure: 44, status: 'normal' },
      ];
    } else if (regionId === 'south') {
      return [
        { name: 'Huye', waterflow: 24, pressure: 44, status: 'underflow' },
        { name: 'Nyanza', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Gisagara', waterflow: 24, pressure: 44, status: 'overflow' },
        { name: 'Nyaruguru', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Kamonyi', waterflow: 24, pressure: 44, status: 'underflow' },
        { name: 'Ruhango', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Muhanga', waterflow: 24, pressure: 44, status: 'overflow' },
        { name: 'Nyamagabe', waterflow: 24, pressure: 44, status: 'normal' },
      ];
    } else if (regionId === 'west') {
      return [
        { name: 'Nyabihu', waterflow: 24, pressure: 44, status: 'underflow' },
        { name: 'Karongi', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Ngororero', waterflow: 24, pressure: 44, status: 'overflow' },
        { name: 'Nyamasheke', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Rubuvu', waterflow: 24, pressure: 44, status: 'underflow' },
        { name: 'Rusizi', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Rutsiro', waterflow: 24, pressure: 44, status: 'overflow' },
      ];
    } else if (regionId === 'east') {
      return [
        { name: 'Bugesera', waterflow: 24, pressure: 44, status: 'underflow' },
        { name: 'Nyagatare', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Gatsibo', waterflow: 24, pressure: 44, status: 'overflow' },
        { name: 'Kayonza', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Kirehe', waterflow: 24, pressure: 44, status: 'underflow' },
        { name: 'Ngoma', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Rwamagana', waterflow: 24, pressure: 44, status: 'overflow' },
      ];
    } else if (regionId === 'kigali') {
      return [
        { name: 'Gasabo', waterflow: 24, pressure: 44, status: 'underflow' },
        { name: 'Nyarugenge', waterflow: 24, pressure: 44, status: 'normal' },
        { name: 'Kicukiro', waterflow: 24, pressure: 44, status: 'overflow' },
      ];
    } else {
      return [];
    }
  };

  const readingsData = getReadingsData();

  const getRegionBackground = (region: string) => {
    switch (region) {
      case 'north':
        return 'bg-yellow-50 dark:bg-yellow-900/10';
      case 'south':
        return 'bg-blue-50 dark:bg-blue-900/10';
      case 'east':
        return 'bg-orange-50 dark:bg-orange-900/10';
      case 'west':
        return 'bg-green-50 dark:bg-green-900/10';
      case 'kigali':
        return 'bg-purple-50 dark:bg-purple-900/10';
      default:
        return 'bg-gray-50 dark:bg-gray-900/10';
    }
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
            <CardTitle className="text-lg font-medium">Readings Report</CardTitle>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Download size={16} />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            {selectedTimeframe === 'yesterday' && (
              <>
                <h2 className="text-xl font-mono text-center my-6">00:00 AM</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {readingsData.slice(0, 3).map((reading, index) => (
                    <div key={index} className={`${getRegionBackground(regionInfo.region)} p-4 rounded-lg`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <div className="font-medium">{reading.name}</div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Waterflow</span>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span>{reading.waterflow} cm³/h</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Pressure</span>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>{reading.pressure} kpa</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Status</span>
                        <StatusBadge status={reading.status} />
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-mono text-center my-6">01:00 AM</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {readingsData.slice(0, 3).map((reading, index) => (
                    <div key={index} className={`${getRegionBackground(regionInfo.region)} p-4 rounded-lg`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <div className="font-medium">{reading.name}</div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Waterflow</span>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span>{reading.waterflow} cm³/h</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Pressure</span>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>{reading.pressure} kpa</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Status</span>
                        <StatusBadge status={reading.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {selectedTimeframe === 'past-week' && (
              <>
                <h2 className="text-xl font-mono text-center my-6">MON-31/03/2025</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {readingsData.slice(0, 3).map((reading, index) => (
                    <div key={index} className={`${getRegionBackground(regionInfo.region)} p-4 rounded-lg`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <div className="font-medium">{reading.name}</div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Waterflow</span>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span>{reading.waterflow} cm³/h</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Pressure</span>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>{reading.pressure} kpa</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Status</span>
                        <StatusBadge status={reading.status} />
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-mono text-center my-6">TUE-01/03/2025</h2>
              </>
            )}
            
            {selectedTimeframe === 'past-month' && (
              <>
                <h2 className="text-xl font-mono text-center my-6">JAN 2025</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {readingsData.slice(0, 3).map((reading, index) => (
                    <div key={index} className={`${getRegionBackground(regionInfo.region)} p-4 rounded-lg`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <div className="font-medium">{reading.name}</div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Waterflow</span>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span>{reading.waterflow} cm³/h</span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Pressure</span>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>{reading.pressure} kpa</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Status</span>
                        <StatusBadge status={reading.status} />
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-mono text-center my-6">FEB 2025</h2>
              </>
            )}

            <div className="mt-8">
              <h3 className="font-medium mb-3">Timeline</h3>
              <div className="space-y-2">
                {timelineOptions.map(option => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      id={option.id}
                      name="timeline"
                      className="h-4 w-4 text-smarten-blue focus:ring-smarten-blue"
                      checked={selectedTimeline === option.id}
                      onChange={() => setSelectedTimeline(option.id)}
                    />
                    <label htmlFor={option.id} className="ml-2 text-sm">{option.label}</label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReadingsReport;
