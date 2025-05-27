
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Clock, Search, ChevronDown, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

// StatusBadge component since it's missing
const StatusBadge = ({ status }: { status: 'normal' | 'overflow' | 'underflow' }) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'normal':
        return { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3 text-green-600" /> };
      case 'overflow':
        return { color: 'bg-red-100 text-red-800', icon: <AlertCircle className="w-3 h-3 text-red-600" /> };
      case 'underflow':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <AlertTriangle className="w-3 h-3 text-yellow-600" /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: null };
    }
  };

  const { color, icon } = getStatusDetails();

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {icon}
      <span className="ml-1 capitalize">{status}</span>
    </div>
  );
};

const Monitor = () => {
  const [selectedRegion, setSelectedRegion] = useState('North');
  const [timeRange, setTimeRange] = useState<'D' | 'M' | 'Y'>('D');
  
  const getChartData = () => {
    if (timeRange === 'D') {
      return [
        { name: '2h', 'water flow': 20, pressure: 40 },
        { name: '4h', 'water flow': 25, pressure: 42 },
        { name: '6h', 'water flow': 15, pressure: 38 },
        { name: '8h', 'water flow': 30, pressure: 44 },
        { name: '10h', 'water flow': 22, pressure: 40 },
        { name: '12h', 'water flow': 18, pressure: 39 },
        { name: '14h', 'water flow': 24, pressure: 42 },
        { name: '16h', 'water flow': 28, pressure: 44 },
        { name: '18h', 'water flow': 26, pressure: 43 },
        { name: '20h', 'water flow': 22, pressure: 41 },
        { name: '22h', 'water flow': 20, pressure: 40 },
        { name: '24h', 'water flow': 24, pressure: 42 },
      ];
    } else if (timeRange === 'M') {
      return [
        { name: '1st week', 'water flow': 180, pressure: 420 },
        { name: '2nd week', 'water flow': 200, pressure: 440 },
        { name: '3rd week', 'water flow': 170, pressure: 400 },
        { name: '4th week', 'water flow': 220, pressure: 460 },
      ];
    } else {
      return [
        { name: 'Jan', 'water flow': 8760, pressure: 18400 },
        { name: 'Feb', 'water flow': 9200, pressure: 19200 },
        { name: 'Mar', 'water flow': 8800, pressure: 18800 },
        { name: 'Apr', 'water flow': 9500, pressure: 20000 },
        { name: 'May', 'water flow': 9200, pressure: 19500 },
        { name: 'Jun', 'water flow': 8900, pressure: 18900 },
        { name: 'Jul', 'water flow': 9800, pressure: 20500 },
        { name: 'Aug', 'water flow': 9600, pressure: 20200 },
        { name: 'Sep', 'water flow': 9100, pressure: 19100 },
        { name: 'Oct', 'water flow': 9300, pressure: 19300 },
        { name: 'Nov', 'water flow': 8700, pressure: 18700 },
        { name: 'Dec', 'water flow': 9400, pressure: 19600 },
      ];
    }
  };

  const getTimeLabel = () => {
    if (timeRange === 'D') return '16:00 PM';
    if (timeRange === 'M') return '3rd week';
    return 'August';
  };

  const getCurrentValues = () => {
    if (timeRange === 'D') return { flow: '24 cm³/h', pressure: '44 kpa' };
    if (timeRange === 'M') return { flow: '220 cm³/h', pressure: '460 kpa' };
    return { flow: '9.8K cm³/h', pressure: '20.5K kpa' };
  };

  const getHistoryLabel = () => {
    if (timeRange === 'D') return 'past hour';
    if (timeRange === 'M') return 'past week';
    return 'past month';
  };

  const getHistoryData = () => {
    if (timeRange === 'D') {
      return [
        { id: 1, area: 'Gicumbi', waterflow: '200cm³/s', pressure: '200kpa', status: 'normal' },
        { id: 2, area: 'Musanze', waterflow: '200cm³/s', pressure: '200kpa', status: 'underflow' },
        { id: 3, area: 'Gakenke', waterflow: '200cm³/s', pressure: '200kpa', status: 'overflow' },
        { id: 4, area: 'Rulindo', waterflow: '200cm³/s', pressure: '200kpa', status: 'normal' },
        { id: 5, area: 'Burera', waterflow: '200cm³/s', pressure: '200kpa', status: 'underflow' },
      ];
    } else if (timeRange === 'M') {
      return [
        { id: 1, area: 'Gicumbi', waterflow: '200cm³/s', pressure: '200kpa', status: 'normal' },
        { id: 2, area: 'Musanze', waterflow: '200cm³/s', pressure: '200kpa', status: 'underflow' },
        { id: 3, area: 'Gakenke', waterflow: '200cm³/s', pressure: '200kpa', status: 'overflow' },
        { id: 4, area: 'Rulindo', waterflow: '200cm³/s', pressure: '200kpa', status: 'normal' },
        { id: 5, area: 'Burera', waterflow: '200cm³/s', pressure: '200kpa', status: 'underflow' },
      ];
    } else {
      return [
        { id: 1, area: 'Gicumbi', waterflow: '200cm³/s', pressure: '200kpa', status: 'normal' },
        { id: 2, area: 'Musanze', waterflow: '200cm³/s', pressure: '200kpa', status: 'underflow' },
        { id: 3, area: 'Gakenke', waterflow: '200cm³/s', pressure: '200kpa', status: 'overflow' },
        { id: 4, area: 'Rulindo', waterflow: '200cm³/s', pressure: '200kpa', status: 'normal' },
        { id: 5, area: 'Burera', waterflow: '200cm³/s', pressure: '200kpa', status: 'underflow' },
      ];
    }
  };

  const chartData = getChartData();
  const historyData = getHistoryData();
  const currentValues = getCurrentValues();
  
  const criticalReadings = [
    {
      location: 'North,Rulindo,Base',
      waterflow: '24 cm³/h',
      pressure: '44 kpa',
      status: 'underflow'
    },
    {
      location: 'Kigali,Kicukiro,Kamashashi',
      waterflow: '24 cm³/h', 
      pressure: '44 kpa',
      status: 'overflow'
    }
  ];

  return (
    <MainLayout title={selectedRegion}>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Header with Region Selection */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/20 rounded-md px-3 py-1 cursor-pointer">
              <span className="text-lg font-semibold text-yellow-500 dark:text-yellow-400">N</span>
              <ChevronDown className="h-4 w-4 ml-2 text-yellow-500 dark:text-yellow-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedRegion}</h2>
          </div>

          {/* Time Period Controls */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md">
            <button
              onClick={() => setTimeRange('D')}
              className={`px-3 py-1 text-sm ${
                timeRange === 'D' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              D
            </button>
            <button
              onClick={() => setTimeRange('M')}
              className={`px-3 py-1 text-sm ${
                timeRange === 'M' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              M
            </button>
            <button
              onClick={() => setTimeRange('Y')}
              className={`px-3 py-1 text-sm ${
                timeRange === 'Y' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Y
            </button>
          </div>
        </div>

        {/* Real Time Monitoring Chart */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Real time monitoring</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{getTimeLabel()}</span>
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {/* Chart placeholder since we don't have Chart.js installed */}
            <div className="w-full h-64 bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Blue wave line */}
                <svg viewBox="0 0 800 200" className="w-full h-full absolute">
                  <path 
                    d="M0,100 C100,80 200,120 300,100 C400,80 500,120 600,100 C700,80 800,120 900,100" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="2"
                  />
                  <circle cx="450" cy="100" r="4" fill="#3b82f6" />
                </svg>
                
                {/* Green wave line */}
                <svg viewBox="0 0 800 200" className="w-full h-full absolute">
                  <path 
                    d="M0,120 C100,100 200,140 300,120 C400,100 500,140 600,120 C700,100 800,140 900,120" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="2"
                  />
                  <circle cx="450" cy="120" r="4" fill="#22c55e" />
                </svg>
              </div>
              
              {/* X-axis time labels */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 text-xs text-gray-500">
                <span>2h</span>
                <span>4h</span>
                <span>6h</span>
                <span>8h</span>
                <span>10h</span>
                <span>12h</span>
                <span>14h</span>
                <span>16h</span>
                <span>18h</span>
                <span>20h</span>
                <span>22h</span>
                <span>24h</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300">water flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-700 dark:text-gray-300">pressure</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Current Values */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{currentValues.flow.split(' ')[0]}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">{currentValues.flow.split(' ')[1]}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Water Flow</span>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">{currentValues.pressure.split(' ')[0]}</div>
                      <div className="text-xs text-green-600 dark:text-green-400">{currentValues.pressure.split(' ')[1]}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Pressure</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Average */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">24</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">cm³/h</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Water Flow</span>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">44</div>
                      <div className="text-xs text-green-600 dark:text-green-400">kpa</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Pressure</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 dark:text-green-400">normal</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Data Collection Rate</span>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">99.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Device Connectivity</span>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">98.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Alert Response Time</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">2.3 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">System Uptime</span>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">99.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History and Critical Readings Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* History Table */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">History ({getHistoryLabel()})</CardTitle>
                <Link to="/history" className="text-sm text-blue-500 hover:underline">
                  See more
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">N°</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Area</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Waterflow</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Pressure</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((item) => (
                      <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-2 text-xs text-gray-900 dark:text-gray-300">{item.id}</td>
                        <td className="px-4 py-2 text-xs font-medium text-gray-900 dark:text-gray-300">{item.area}</td>
                        <td className="px-4 py-2 text-xs text-gray-900 dark:text-gray-300">{item.waterflow}</td>
                        <td className="px-4 py-2 text-xs text-gray-900 dark:text-gray-300">{item.pressure}</td>
                        <td className="px-4 py-2">
                          <StatusBadge status={item.status as any} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Critical Readings */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>Critical readings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {criticalReadings.map((reading, index) => (
                  <div key={index} className="p-3 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-200">{reading.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{reading.waterflow}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{reading.pressure}</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <StatusBadge status={reading.status as any} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Past {timeRange === 'D' ? 'Hour' : timeRange === 'M' ? 'Week' : 'Month'}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {timeRange === 'D' ? '16:00 PM' : timeRange === 'M' ? '3rd week' : 'August'}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">
                          {timeRange === 'D' ? '12' : timeRange === 'M' ? '44' : '44'}
                        </div>
                        <div className="text-xs text-blue-600">cm³/h</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">
                          {timeRange === 'D' ? '44' : timeRange === 'M' ? '44' : '44'}
                        </div>
                        <div className="text-xs text-green-600">kpa</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">24</div>
                        <div className="text-xs text-blue-600">cm³/h</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">44</div>
                        <div className="text-xs text-green-600">kpa</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">System Status</CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">normal</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Collection Rate</span>
                  <span className="text-sm text-green-600 font-medium">99.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Device Connectivity</span>
                  <span className="text-sm text-green-600 font-medium">98.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Alert Response Time</span>
                  <span className="text-sm text-blue-600 font-medium">2.3 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">System Uptime</span>
                  <span className="text-sm text-green-600 font-medium">99.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Monitor;
