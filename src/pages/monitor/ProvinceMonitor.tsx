
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LineChart from '@/components/ui/LineChart';
import StatusBadge from '@/components/ui/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle, ArrowLeft, Clock, Activity } from 'lucide-react';
import { useWaterReadings } from '@/hooks/useWaterReadings';
import { useMonitorData } from '@/contexts/MonitorDataContext';

// Import province icons
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';

const ProvinceMonitor = () => {
  const { province } = useParams();
  const [timeRange, setTimeRange] = useState<'D' | 'M' | 'Y'>('D');
  const [currentTime, setCurrentTime] = useState('16:00 PM');
  
  // Province mapping for WebSocket data
  const provinceMapping = {
    'north': 'Northern',
    'south': 'Southern', 
    'east': 'Eastern',
    'west': 'Western',
    'kigali': 'Kigali'
  };

  const selectedProvince = provinceMapping[province as keyof typeof provinceMapping] || 'Northern';
  
  // Use WebSocket hook for real-time data
  const { waterData, districtData, criticalReadings, pastHour, dailyAverage, connectionStatus, errorMessage, isDataStale } = useWaterReadings(selectedProvince);
  const { clearData, getConnectionStatus } = useMonitorData();
  
  const provinceData = {
    north: {
      name: 'Northern',
      districts: ['Gicumbi', 'Musanze', 'Gakenke', 'Rulindo', 'Burera'],
      color: 'bg-yellow-500',
      icon: NorthIcon
    },
    south: {
      name: 'Southern', 
      districts: ['Nyanza', 'Gisagara', 'Nyaruguru', 'Huye', 'Nyamagabe', 'Ruhango', 'Muhanga', 'Kamonyi'],
      color: 'bg-blue-500',
      icon: SouthIcon
    },
    east: {
      name: 'Eastern',
      districts: ['Rwamagana', 'Nyagatare', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Bugesera'],
      color: 'bg-orange-500',
      icon: EastIcon
    },
    west: {
      name: 'Western',
      districts: ['Nyabihu', 'Karongi', 'Ngororero', 'Nyamasheke', 'Rubavu', 'Rusizi', 'Rutsiro'],
      color: 'bg-green-500',
      icon: WestIcon
    },
    kigali: {
      name: 'Kigali',
      districts: ['Nyarugenge', 'Gasabo', 'Kicukiro'],
      color: 'bg-purple-500',
      icon: KigaliIcon
    }
  };

  const currentProvince = provinceData[province as keyof typeof provinceData];

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      setCurrentTime(formattedTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Process WebSocket data for daily chart
  const processChartData = (rawData: { flow_rate_lph: number; status: string; timestamp: string; province: string }[]) => {
    if (!rawData.length) return [];

    const filteredData = rawData
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .slice(-60); // Limit to last 60 points for performance

    return filteredData.map(item => ({
      time: `${new Date(item.timestamp).getHours()}:${new Date(item.timestamp).getMinutes().toString().padStart(2, '0')}`,
      'water flow': Math.round(item.flow_rate_lph / 60), // Convert to cm³/min
    }));
  };

  // Filter district data for the latest graph point
  const getLatestDistrictData = () => {
    if (!waterData.length || !districtData.length) return [];

    const latestPoint = waterData
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

    if (!latestPoint) return [];

    return districtData
      .filter(item => item.timestamp === latestPoint.timestamp)
      .sort((a, b) => a.district.localeCompare(b.district));
  };

  const latestDistrictData = getLatestDistrictData();

  const chartData = timeRange === 'D' ? processChartData(waterData) : 
    timeRange === 'M' ? [
      { name: 'Week 1', 'water flow': 180 },
      { name: 'Week 2', 'water flow': 200 },
      { name: 'Week 3', 'water flow': 170 },
      { name: 'Week 4', 'water flow': 220 },
    ] : [
      { name: '2021', 'water flow': 8760 },
      { name: '2022', 'water flow': 9200 },
      { name: '2023', 'water flow': 8800 },
      { name: '2024', 'water flow': 9500 },
    ];
  
  // Use real-time district data from WebSocket
  const processedDistrictData = latestDistrictData.map((item, index) => ({
    id: index + 1,
    district: item.district,
    waterflow: `${item.flow_rate.toFixed(2)} cm³/s`,
    status: item.status
  }));

  return (
    <MainLayout>
      <div className="pt-2 px-6 pb-6 bg-gray-50 min-h-screen space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <img src={currentProvince?.icon} alt={currentProvince?.name} className="h-8 w-8 object-contain" />
          <h1 className="text-2xl font-bold text-gray-900">{currentProvince?.name}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Main Chart */}
          <div className="md:col-span-2">
        {/* Real Time Monitoring Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Real Time Monitoring - {currentProvince?.name}</CardTitle>
              <p className="text-sm text-gray-500">Live water flow and pressure monitoring</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{currentTime}</span>
                      <Clock className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="flex gap-1">
                {(['D', 'M', 'Y'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={timeRange === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(period)}
                    className={timeRange === period ? 'bg-blue-500 hover:bg-blue-600' : ''}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
                  {chartData.length === 0 && timeRange === 'D' ? (
                    <div className="flex items-center justify-center h-full text-gray-500">Loading real-time data...</div>
                  ) : (
              <LineChart 
                data={chartData} 
                lines={[
                        { dataKey: 'water flow', stroke: '#3b82f6', name: 'Water Flow (cm³/min)' },
                      ]}
                    />
                  )}
                  <div className="flex items-center justify-end space-x-6 absolute bottom-[-15px] right-4">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-xs text-gray-600">water flow</span>
                    </div>
                  </div>
            </div>
          </CardContent>
        </Card>
          </div>
          
          {/* Right Column - Past Hour and Average */}
          <div>
            {/* Past Hour Card */}
            <div className="bg-white mb-6 rounded-lg shadow-sm">
              <div className="p-4">
                <div className="flex flex-col mb-2">
                  <div className="text-base font-medium mb-1">Past Minute</div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="text-xs text-gray-400">{currentTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center my-2 relative">
                  {/* Blue Circle for Flow */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-30 h-20 rounded-full bg-blue-500 text-white z-10 mb-1">
                      <div className="text-center">
                        <span className="text-base font-small px-1">{pastHour.average.toFixed(2)}cm³/s</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">Water Flow</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mt-3">
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 mr-1 text-black" />
                    <span className="mr-1 text-xs font-bold text-black">Status</span>
                    <div className="text-green-700 text-xs px-3 py-1 rounded-full font-medium" style={{backgroundColor: 'rgba(52, 211, 153, 0.25)', border: '1px solid rgba(52, 211, 153, 0.5)'}}>
                     {pastHour.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Average Card */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4">
                <div className="text-base font-medium mb-3">Average</div>
                
                <div className="flex items-center justify-center my-2 relative">
                  {/* Blue Circle for Flow */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-30 h-20 rounded-full bg-blue-500 text-white z-10 mb-1">
                      <div className="text-center">
                        <span className="text-base font-medium px-1 ">{dailyAverage.average.toFixed(2)}cm³/s</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">Water Flow</span>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-3">
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 mr-1 text-black" />
                    <span className="mr-1 text-xs font-bold text-black">Status</span>
                    <div className="text-green-700 text-xs px-3 py-1 rounded-full font-medium" style={{backgroundColor: 'rgba(52, 211, 153, 0.25)', border: '1px solid rgba(52, 211, 153, 0.5)'}}>
                    {dailyAverage.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-medium">History</h2>
              <span className="text-sm text-gray-500 ml-1">(past hour)</span>
            </div>
            <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md">
              See more
            </button>
          </div>
          
          {/* History Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
              <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left text-sm font-medium">N°</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">District</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Waterflow</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                  </tr>
                </thead>
              <tbody>
                {processedDistrictData.length > 0 ? (
                  processedDistrictData.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-4 text-sm">{item.id}</td>
                      <td className="py-3 px-4 text-sm">{item.district}</td>
                      <td className="py-3 px-4 text-sm">{item.waterflow}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={item.status as any} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-3 px-4 text-sm text-gray-500 text-center">
                      No district data available 
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProvinceMonitor;
