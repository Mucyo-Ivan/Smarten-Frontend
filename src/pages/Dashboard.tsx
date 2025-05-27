import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, CheckCircle, MapPin, Activity, Clock, Timer, Calendar, ArrowLeftRight, MoveHorizontal } from 'lucide-react';

const Dashboard = () => {
  const regions = [
    { 
      id: 'north', 
      name: 'North', 
      value: 20, 
      unit: 'cm³/h', 
      bgColor: 'bg-yellow-50', 
      textColor: 'text-yellow-500',
      iconBg: 'bg-yellow-500',
      iconText: 'N',
      iconSrc: '/Smarten Assets/assets/North.svg'
    },
    { 
      id: 'south', 
      name: 'South', 
      value: 59, 
      unit: 'cm³/h', 
      bgColor: 'bg-blue-50', 
      textColor: 'text-blue-500',
      iconBg: 'bg-blue-500',
      iconText: 'S',
      iconSrc: '/Smarten Assets/assets/South.svg'
    },
    { 
      id: 'east', 
      name: 'East', 
      value: 100, 
      unit: 'cm³/h', 
      bgColor: 'bg-orange-50', 
      textColor: 'text-orange-500',
      iconBg: 'bg-orange-500',
      iconText: 'E',
      iconSrc: '/Smarten Assets/assets/East.svg'
    },
    { 
      id: 'west', 
      name: 'West', 
      value: 420, 
      unit: 'cm³/h', 
      bgColor: 'bg-green-50',
      textColor: 'text-green-500', 
      iconBg: 'bg-green-500',
      iconText: 'W',
      iconSrc: '/Smarten Assets/assets/West.svg'
    },
    { 
      id: 'kigali', 
      name: 'Kigali', 
      value: 120, 
      unit: 'cm³/h', 
      bgColor: 'bg-purple-50', 
      textColor: 'text-purple-500',
      iconBg: 'bg-purple-500',
      iconText: 'K',
      iconSrc: '/Smarten Assets/assets/Kigali.svg'
    },
  ];

  const leakageData = {
    recent: {
      waterLost: 20,
      unit: 'cm³',
      timeTaken: 20,
      unit2: 'min',
      location: 'Kigali, Kicukiro-Kamabuye',
      status: 'Resolved'
    },
    stats: [
      { region: 'North', count: 20, color: 'bg-yellow-500', textColor: 'text-yellow-600', iconSrc: '/Smarten Assets/assets/North.svg' },
      { region: 'South', count: 100, color: 'bg-blue-500', textColor: 'text-blue-600', iconSrc: '/Smarten Assets/assets/South.svg' },
      { region: 'East', count: 150, color: 'bg-orange-500', textColor: 'text-orange-600', iconSrc: '/Smarten Assets/assets/East.svg' },
      { region: 'West', count: 400, color: 'bg-green-500', textColor: 'text-green-600', iconSrc: '/Smarten Assets/assets/West.svg' },
      { region: 'Kigali', count: 400, color: 'bg-purple-500', textColor: 'text-purple-600', iconSrc: '/Smarten Assets/assets/Kigali.svg' },
    ]
  };

  const pressureData = [
    { region: 'North', value: 20, unit: 'kPa', bgColor: 'bg-yellow-200', textColor: 'text-yellow-500', iconText: 'N', iconSrc: '/Smarten Assets/assets/North.svg' },
    { region: 'South', value: 40, unit: 'kPa', bgColor: 'bg-blue-200', textColor: 'text-blue-500', iconText: 'S', iconSrc: '/Smarten Assets/assets/South.svg' },
    { region: 'East', value: 90, unit: 'kPa', bgColor: 'bg-orange-200', textColor: 'text-orange-500', iconText: 'E', iconSrc: '/Smarten Assets/assets/East.svg' },
    { region: 'West', value: 100, unit: 'kPa', bgColor: 'bg-green-200', textColor: 'text-green-500', iconText: 'W', iconSrc: '/Smarten Assets/assets/West.svg' },
    { region: 'Kigali', value: 120, unit: 'kPa', bgColor: 'bg-purple-200', textColor: 'text-purple-500', iconText: 'K', iconSrc: '/Smarten Assets/assets/Kigali.svg' },
  ];

  const devices = [
    { id: 1, type: 'Esp32', total: 20000 },
    { id: 2, type: 'Lora', total: 40200 },
    { id: 3, type: 'Smart Valves', total: 40200 },
    { id: 4, type: 'Sensors', total: 40200 },
    { id: 5, type: 'Repeater', total: 40200 },
  ];

  const activities = [
    { time: '07:30 AM', text: 'Leakage detected at Nyarugenge', type: 'alert' },
    { time: '08:00 AM', text: 'Sudden rise in water flow at Kicukiro', type: 'warning' },
    { time: '04:20 PM', text: 'Sudden rise in water flow at Kicukiro', type: 'info' },
  ];

  return (
    <MainLayout title="Overview">
      <div className="p-6 bg-white min-h-screen">
        {/* Overview Region Stats */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {regions.map((region) => (
            <Link to={`/monitor/${region.id}`} key={region.id} className="no-underline">
              <div className={`${region.bgColor} rounded-xl shadow-sm p-3 cursor-pointer`}>
                <div className="flex items-center gap-1 mb-1">
                  <div className={`w-5 h-5 ${region.iconBg} rounded-full flex items-center justify-center`}>
                    <img src={region.iconSrc} alt={region.name} className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium">{region.name}</span>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-semibold ${region.textColor} leading-tight`}>{region.value}</div>
                  <div className="text-xs text-gray-500">cm³/h</div>
                  <div className="text-xs text-gray-500">Total water Flow</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Grid for Leakage, Stats and Pressure */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Leakage Detection */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-0">
              <CardTitle className="text-base font-semibold">Leakage Detection</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-sm text-gray-500 mb-4 text-center">Recent</div>
              <div className="flex justify-between px-2">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">20</span>
                    <span className="text-xs text-gray-500 ml-1">cm³</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">water lost</div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: '#1DA1F2'}}>
                    <img src="/Smarten Assets/assets/two-arrows.png" alt="two arrows" className="w-5 h-5" />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">20</span>
                    <span className="text-xs text-gray-500 ml-1">min</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Time taken</div>
                </div>
              </div>
              
              <div className="mt-5">
                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">Kigali, Kicukiro-Kamashahi</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">Resolved</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md w-32 py-2 mx-auto block" style={{fontSize: '12px'}}>
                  See more
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="border shadow-sm">
            <CardHeader className="py-2 px-4 flex justify-center">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-400 mr-1" />
                <CardTitle className="text-sm font-medium text-gray-700">stats</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2 p-2">
                {leakageData.stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between py-3 px-4 rounded-2xl shadow-sm" style={{backgroundColor: index === 0 ? '#FEF08A' : index === 1 ? '#BFDBFE' : index === 2 ? '#FDBA74' : index === 3 ? '#A7F3D0' : '#E9D5FF'}}>
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 ${stat.color} rounded-full flex items-center justify-center`}>
                        <img src={stat.iconSrc} alt={stat.region} className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{stat.region}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">{stat.count} leakages</span>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{backgroundColor: index === 0 ? '#FACC15' : index === 1 ? '#60A5FA' : index === 2 ? '#FB923C' : index === 3 ? '#34D399' : '#C084FC'}}>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pressure */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-semibold">Pressure</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex justify-center gap-2 mb-2">
                {pressureData.slice(0, 3).map((item, index) => (
                  <div key={index} className={`${item.bgColor} rounded-full p-1.5 text-center flex flex-col items-center justify-center aspect-square`} style={{width: '85px', height: '85px'}}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center mb-0.5" style={{backgroundColor: index === 0 ? '#FACC15' : index === 1 ? '#60A5FA' : '#FB923C'}}>
                      <img src={item.iconSrc} alt={item.region} className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-lg font-bold text-black">
                      {item.value}<span className="text-[10px]">kpa</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                {pressureData.slice(3, 5).map((item, index) => (
                  <div key={index} className={`${item.bgColor} rounded-full p-1.5 text-center flex flex-col items-center justify-center aspect-square`} style={{width: '85px', height: '85px'}}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center mb-0.5" style={{backgroundColor: index === 0 ? '#34D399' : '#C084FC'}}>
                      <img src={item.iconSrc} alt={item.region} className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-lg font-bold text-black">
                      {item.value}<span className="text-[10px]">kpa</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Devices Table */}
        <div className="mb-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-medium text-gray-500 pb-2">N°</th>
                      <th className="text-left text-xs font-medium text-gray-500 pb-2">Device Type</th>
                      <th className="text-left text-xs font-medium text-gray-500 pb-2">Total number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device) => (
                      <tr key={device.id} className="border-b border-gray-100">
                        <td className="py-2 text-sm text-gray-900">{device.id}</td>
                        <td className="py-2 text-sm text-gray-900">{device.type}</td>
                        <td className="py-2 text-sm text-gray-900">{device.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity History */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Activity History</CardTitle>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 h-8 rounded-md">
                See more
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="relative">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    {index < activities.length - 1 && (
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-blue-100"></div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-blue-500 font-medium mb-1">{activity.time}</div>
                    <div className="text-sm text-gray-700">{activity.text}</div>
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
