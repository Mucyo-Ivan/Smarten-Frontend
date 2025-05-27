
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LineChart from '@/components/ui/LineChart';
import RegionIcon from '@/components/ui/RegionIcon';
import { Search, Users as UsersIcon, TrendingUp, UserPlus } from 'lucide-react';

const Users = () => {
  const [selectedRegion, setSelectedRegion] = useState('north');
  const [searchTerm, setSearchTerm] = useState('');

  const regions = [
    { id: 'north', name: 'North', users: '20,000', growth: '+12%', color: 'bg-yellow-50', iconBg: 'bg-yellow-500', buttonColor: 'bg-yellow-500 hover:bg-yellow-600' },
    { id: 'south', name: 'South', users: '59,000', growth: '+8%', color: 'bg-blue-50', iconBg: 'bg-blue-500', buttonColor: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'east', name: 'East', users: '100,000', growth: '+15%', color: 'bg-orange-50', iconBg: 'bg-orange-500', buttonColor: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'west', name: 'West', users: '420,000', growth: '+10%', color: 'bg-green-50', iconBg: 'bg-green-500', buttonColor: 'bg-green-500 hover:bg-green-600' },
    { id: 'kigali', name: 'Kigali', users: '120,000', growth: '+18%', color: 'bg-purple-50', iconBg: 'bg-purple-500', buttonColor: 'bg-purple-500 hover:bg-purple-600' },
  ];

  const chartData = [
    { name: '00:00', value: 15000 },
    { name: '04:00', value: 18000 },
    { name: '08:00', value: 25000 },
    { name: '12:00', value: 30000 },
    { name: '16:00', value: 28000 },
    { name: '20:00', value: 22000 },
    { name: '24:00', value: 20124 },
  ];

  const consumptionData = [
    { region: 'north', percentage: 60, consumed: 92482, efficiency: 'Good' },
    { region: 'south', percentage: 55, consumed: 87321, efficiency: 'Average' },
    { region: 'east', percentage: 68, consumed: 105673, efficiency: 'Excellent' },
    { region: 'west', percentage: 72, consumed: 298456, efficiency: 'Excellent' },
    { region: 'kigali', percentage: 58, consumed: 98234, efficiency: 'Good' },
  ];

  const recentUsers = [
    { id: 1, name: 'Jean Baptiste', email: 'jean@example.com', region: 'Kigali', joinDate: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Marie Claire', email: 'marie@example.com', region: 'North', joinDate: '2024-01-14', status: 'Active' },
    { id: 3, name: 'Paul Rwagasore', email: 'paul@example.com', region: 'South', joinDate: '2024-01-13', status: 'Pending' },
    { id: 4, name: 'Grace Uwimana', email: 'grace@example.com', region: 'East', joinDate: '2024-01-12', status: 'Active' },
    { id: 5, name: 'David Nkurunziza', email: 'david@example.com', region: 'West', joinDate: '2024-01-11', status: 'Active' },
  ];

  return (
    <MainLayout title="User Management">
      <div className="p-6 bg-gray-50 min-h-screen space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Monitor user activity and water consumption across regions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Regional Overview */}
        <div className="grid grid-cols-5 gap-6">
          {regions.map((region) => (
            <Card
              key={region.id}
              className={`${region.color} border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedRegion === region.id ? 'ring-2 ring-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedRegion(region.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <RegionIcon region={region.id as any} />
                  <span className="font-semibold text-gray-900">{region.name}</span>
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{region.users}</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">{region.growth}</span>
                  </div>
                  <Button className={`${region.buttonColor} text-white text-xs px-3 py-1`}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Water Consumption Chart */}
          <Card className="col-span-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Water Consumption Analytics</CardTitle>
                <p className="text-sm text-gray-500">Daily consumption patterns and trends</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">18:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">20,124 litres</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="default" size="sm" className="bg-blue-500">D</Button>
                  <Button variant="outline" size="sm">M</Button>
                  <Button variant="outline" size="sm">Y</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <LineChart 
                  data={chartData} 
                  lines={[
                    { dataKey: 'value', stroke: '#3b82f6', name: 'Water Consumption (L)' },
                  ]}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold">1M litres</span>
                <span className="text-sm text-gray-500">total consumption today</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                Recent Registrations
              </CardTitle>
              <p className="text-sm text-gray-500">Newly registered users</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.region}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Consumption Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Regional Consumption Efficiency</CardTitle>
            <p className="text-sm text-gray-500">Water usage efficiency by region</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-6">
              {regions.map((region, index) => {
                const consumption = consumptionData[index];
                return (
                  <div key={region.id} className="text-center">
                    <div className="flex items-center gap-3 mb-4">
                      <RegionIcon region={region.id as any} />
                      <span className="font-semibold text-gray-900">{region.name}</span>
                    </div>
                    
                    <div className={`relative w-24 h-24 ${region.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{consumption.percentage}%</div>
                          <div className="text-xs text-gray-500">Efficiency</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-gray-900">
                        {consumption.consumed.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Litres consumed</div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        consumption.efficiency === 'Excellent' ? 'bg-green-100 text-green-800' :
                        consumption.efficiency === 'Good' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {consumption.efficiency}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Users;
