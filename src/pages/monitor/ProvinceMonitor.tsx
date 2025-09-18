
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
      color: 'bg-yellow-500'
    },
    south: {
      name: 'Southern', 
      districts: ['Nyanza', 'Gisagara', 'Nyaruguru', 'Huye', 'Nyamagabe', 'Ruhango', 'Muhanga', 'Kamonyi'],
      color: 'bg-blue-500'
    },
    east: {
      name: 'Eastern',
      districts: ['Rwamagana', 'Nyagatare', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Bugesera'],
      color: 'bg-orange-500'
    },
    west: {
      name: 'Western',
      districts: ['Nyabihu', 'Karongi', 'Ngororero', 'Nyamasheke', 'Rubavu', 'Rusizi', 'Rutsiro'],
      color: 'bg-green-500'
    },
    kigali: {
      name: 'Kigali',
      districts: ['Nyarugenge', 'Gasabo', 'Kicukiro'],
      color: 'bg-purple-500'
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
      <div className="p-6 bg-gray-50 min-h-screen space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentProvince?.name}</h1>
              <p className="text-gray-600">Real-time monitoring and analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <div className="text-sm text-gray-500">Last updated: 2 minutes ago</div>
          </div>
        </div>

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
                  <span className="text-sm text-gray-500">
                    {timeRange === 'D' ? '16:00 PM' : timeRange === 'M' ? 'This Month' : 'This Year'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    {timeRange === 'D' ? '24 L/h' : timeRange === 'M' ? '1.8K L/h' : '9.5K L/h'}
                  </span>
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
              <LineChart 
                data={chartData} 
                lines={[
                  { dataKey: 'water flow', stroke: '#3b82f6', name: 'Water Flow (L/h)' },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Districts Data */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Districts Overview</CardTitle>
            <p className="text-sm text-gray-500">Current readings by district in {currentProvince?.name}</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">N°</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">District</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Water Flow</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedDistrictData.length > 0 ? (
                    processedDistrictData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{item.id}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.district}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.waterflow}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={item.status as any} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                        No district data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProvinceMonitor;
