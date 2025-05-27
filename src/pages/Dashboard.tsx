
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LineChart from '@/components/ui/LineChart';
import { ArrowRight, CheckCircle, MapPin, Eye } from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'D' | 'M' | 'Y'>('D');

  const regions = [
    { 
      id: 'north', 
      name: 'North', 
      value: 20, 
      unit: 'cm³/h', 
      bgColor: 'bg-yellow-100', 
      iconBg: 'bg-yellow-500',
      iconText: 'N'
    },
    { 
      id: 'south', 
      name: 'South', 
      value: 59, 
      unit: 'cm³/h', 
      bgColor: 'bg-blue-100', 
      iconBg: 'bg-blue-500',
      iconText: 'S'
    },
    { 
      id: 'east', 
      name: 'East', 
      value: 100, 
      unit: 'cm³/h', 
      bgColor: 'bg-orange-100', 
      iconBg: 'bg-orange-500',
      iconText: 'E'
    },
    { 
      id: 'west', 
      name: 'West', 
      value: 420, 
      unit: 'cm³/h', 
      bgColor: 'bg-green-100', 
      iconBg: 'bg-green-500',
      iconText: 'W'
    },
    { 
      id: 'kigali', 
      name: 'Kigali', 
      value: 120, 
      unit: 'cm³/h', 
      bgColor: 'bg-purple-100', 
      iconBg: 'bg-purple-500',
      iconText: 'K'
    },
  ];

  const leakageData = [
    { region: 'North', count: 20, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { region: 'South', count: 100, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { region: 'East', count: 150, color: 'bg-orange-500', textColor: 'text-orange-600' },
    { region: 'West', count: 400, color: 'bg-green-500', textColor: 'text-green-600' },
    { region: 'Kigali', count: 400, color: 'bg-purple-500', textColor: 'text-purple-600' },
  ];

  const pressureData = [
    { region: 'North', value: 20, unit: 'kPa', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600', iconText: 'N' },
    { region: 'South', value: 40, unit: 'kPa', bgColor: 'bg-blue-100', textColor: 'text-blue-600', iconText: 'S' },
    { region: 'East', value: 90, unit: 'kPa', bgColor: 'bg-orange-100', textColor: 'text-orange-600', iconText: 'E' },
    { region: 'West', value: 100, unit: 'kPa', bgColor: 'bg-green-100', textColor: 'text-green-600', iconText: 'W' },
    { region: 'Kigali', value: 120, unit: 'kPa', bgColor: 'bg-purple-100', textColor: 'text-purple-600', iconText: 'K' },
  ];

  const devices = [
    { id: 1, type: 'Esp32', total: 20000 },
    { id: 2, type: 'Lora', total: 40200 },
    { id: 3, type: 'Smart Valves', total: 40200 },
    { id: 4, type: 'Sensors', total: 40200 },
    { id: 5, type: 'Repeater', total: 40200 },
  ];

  const activities = [
    { time: '07:30 AM', text: 'Leakage detected at Nyarugenge', type: 'alert', icon: '🚨' },
    { time: '08:00 AM', text: 'Sudden rise in water flow at Kicukiro', type: 'warning', icon: '⚠️' },
    { time: '04:20 PM', text: 'Sudden rise in water flow at Kicukiro', type: 'info', icon: '💧' },
  ];

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Overview</h1>
        </div>

        {/* Regional Stats */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {regions.map((region) => (
            <Link to={`/monitor/${region.id}`} key={region.id}>
              <Card className={`${region.bgColor} border-0 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 ${region.iconBg} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-sm font-bold">{region.iconText}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{region.name}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">{region.value}</span>
                    <span className="text-sm text-gray-600 ml-1">{region.unit}</span>
                  </div>
                  <div className="text-sm text-gray-600">Total Water Flow</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Leakage Detection */}
          <Card className="col-span-5">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Leakage Detection</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Stats</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">Recent</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-gray-900">20</div>
                  <div className="text-sm text-gray-600">cm³</div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900">20</div>
                  <div className="text-sm text-gray-600">min</div>
                </div>
                <div className="text-sm text-gray-600 mb-1">Water lost</div>
                <div className="text-sm text-gray-600 mb-4">Time taken</div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Kigali, Kicukiro, kamatashi</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">Resolved</span>
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-4">
                See more
              </Button>

              <div className="space-y-3">
                {leakageData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                      <span className="text-sm font-medium">{item.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{item.count} leakages</span>
                      <ArrowRight className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pressure */}
          <Card className="col-span-3">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Pressure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {pressureData.map((item, index) => (
                  <div key={index} className={`${item.bgColor} rounded-lg p-4 text-center`}>
                    <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">{item.iconText}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-1">{item.value}</div>
                    <div className="text-xs text-gray-600">{item.unit}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Devices */}
          <Card className="col-span-4">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="text-sm font-medium text-gray-600 pb-3">N°</th>
                      <th className="text-sm font-medium text-gray-600 pb-3">Device Type</th>
                      <th className="text-sm font-medium text-gray-600 pb-3">Total number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device) => (
                      <tr key={device.id} className="border-t border-gray-100">
                        <td className="py-3 text-sm text-gray-900">{device.id}</td>
                        <td className="py-3 text-sm text-gray-900">{device.type}</td>
                        <td className="py-3 text-sm text-gray-900">{device.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity History */}
        <Card className="mt-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Activity History</CardTitle>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
                <Eye className="w-4 h-4" />
                See more
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                    <span className="text-sm">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-blue-600">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{activity.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
