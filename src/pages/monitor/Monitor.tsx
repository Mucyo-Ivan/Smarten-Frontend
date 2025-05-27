
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LineChart from '@/components/ui/LineChart';
import StatusBadge from '@/components/ui/StatusBadge';
import ProvinceDropdown from '@/components/ui/ProvinceDropdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Monitor = () => {
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
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen space-y-6">
        {/* Header with Province Dropdown and Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <ProvinceDropdown />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-80 bg-white"
              />
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
              <CardTitle className="text-xl font-semibold">Real time monitoring</CardTitle>
              <p className="text-sm text-gray-500">Live water flow and pressure monitoring</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{getTimeLabel()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">{currentValues.flow}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">{currentValues.pressure}</span>
                </div>
              </div>
              <div className="flex gap-1">
                {(['D', 'M', 'Y'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={timeRange === period ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(period)}
                    className={`transition-all duration-300 ${timeRange === period ? 'bg-blue-500 hover:bg-blue-600 transform scale-105' : 'hover:scale-105'}`}
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
                  { dataKey: 'water flow', stroke: '#3b82f6', name: 'water flow' },
                  { dataKey: 'pressure', stroke: '#10b981', name: 'pressure' },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-12 gap-6">
          {/* History Table */}
          <Card className="col-span-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">History ({getHistoryLabel()})</CardTitle>
                <p className="text-sm text-gray-500">Recent readings by area</p>
              </div>
              <Link to={`/readings/north`}>
                <Button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                  See more
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">N°</th>
                      <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">
                        {timeRange === 'Y' ? 'District' : 'Area'}
                      </th>
                      <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Waterflow</th>
                      <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Pressure</th>
                      <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {historyData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-3 text-sm text-gray-900">{item.id}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.area}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.waterflow}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.pressure}</td>
                        <td className="px-4 py-3">
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
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Critical readings
              </CardTitle>
              <p className="text-sm text-gray-500">Locations requiring attention</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalReadings.map((reading, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start gap-2 mb-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                      <span className="text-sm font-medium text-gray-900">{reading.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{reading.waterflow}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{reading.pressure}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Status:</span>
                        <StatusBadge status={reading.status as any} />
                      </div>
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
