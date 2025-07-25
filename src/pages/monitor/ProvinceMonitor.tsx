
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LineChart from '@/components/ui/LineChart';
import StatusBadge from '@/components/ui/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle, ArrowLeft } from 'lucide-react';

const ProvinceMonitor = () => {
  const { province } = useParams();
  const [timeRange, setTimeRange] = useState<'D' | 'M' | 'Y'>('D');
  
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

  const chartData = timeRange === 'D' ? [
    { name: '00:00', 'water flow': 20 },
    { name: '04:00', 'water flow': 25 },
    { name: '08:00', 'water flow': 15 },
    { name: '12:00', 'water flow': 30 },
    { name: '16:00', 'water flow': 22 },
    { name: '20:00', 'water flow': 18 },
    { name: '24:00', 'water flow': 24 },
  ] : timeRange === 'M' ? [
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
  
  const districtData = currentProvince?.districts.map((district, index) => ({
    id: index + 1,
    district,
    waterflow: `${180 + index * 20} L/s`,
    status: index % 3 === 0 ? 'normal' : index % 3 === 1 ? 'underflow' : 'overflow'
  })) || [];

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
                  {districtData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.district}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.waterflow}</td>
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
      </div>
    </MainLayout>
  );
};

export default ProvinceMonitor;
