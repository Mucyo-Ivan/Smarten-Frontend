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
      bgColor: 'bg-white', 
      textColor: 'text-black',
      iconBg: 'bg-yellow-500',
      iconText: 'N',
      iconSrc: '/Smarten Assets/assets/North.svg'
    },
    { 
      id: 'south', 
      name: 'South', 
      value: 59, 
      unit: 'cm³/h', 
      bgColor: 'bg-white', 
      textColor: 'text-black',
      iconBg: 'bg-blue-500',
      iconText: 'S',
      iconSrc: '/Smarten Assets/assets/South.svg'
    },
    { 
      id: 'east', 
      name: 'East', 
      value: 100, 
      unit: 'cm³/h', 
      bgColor: 'bg-white', 
      textColor: 'text-black',
      iconBg: 'bg-orange-500',
      iconText: 'E',
      iconSrc: '/Smarten Assets/assets/East.svg'
    },
    { 
      id: 'west', 
      name: 'West', 
      value: 420, 
      unit: 'cm³/h', 
      bgColor: 'bg-white',
      textColor: 'text-black', 
      iconBg: 'bg-green-500',
      iconText: 'W',
      iconSrc: '/Smarten Assets/assets/West.svg'
    },
    { 
      id: 'kigali', 
      name: 'Kigali', 
      value: 120, 
      unit: 'cm³/h', 
      bgColor: 'bg-white', 
      textColor: 'text-black',
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
      { region: 'North', count: 20, color: 'bg-yellow-100', textColor: 'text-yellow-500', iconSrc: '/Smarten Assets/assets/North.svg' },
      { region: 'South', count: 100, color: 'bg-blue-50', textColor: 'text-blue-400', iconSrc: '/Smarten Assets/assets/South.svg' },
      { region: 'East', count: 150, color: 'bg-orange-50', textColor: 'text-orange-400', iconSrc: '/Smarten Assets/assets/East.svg' },
      { region: 'West', count: 400, color: 'bg-green-50', textColor: 'text-green-400', iconSrc: '/Smarten Assets/assets/West.svg' },
      { region: 'Kigali', count: 400, color: 'bg-purple-50', textColor: 'text-purple-400', iconSrc: '/Smarten Assets/assets/Kigali.svg' },
    ]
  };

  const customerData = [
    { region: 'North', value: 20, unit: 'users', bgColor: 'bg-yellow-50', textColor: 'text-yellow-500', iconText: 'N', iconSrc: '/Smarten Assets/assets/North.svg' },
    { region: 'South', value: 20, unit: 'users', bgColor: 'bg-blue-50', textColor: 'text-blue-500', iconText: 'S', iconSrc: '/Smarten Assets/assets/South.svg' },
    { region: 'East', value: 20, unit: 'users', bgColor: 'bg-orange-50', textColor: 'text-orange-500', iconText: 'E', iconSrc: '/Smarten Assets/assets/East.svg' },
    { region: 'West', value: 20, unit: 'users', bgColor: 'bg-green-50', textColor: 'text-green-500', iconText: 'W', iconSrc: '/Smarten Assets/assets/West.svg' },
    { region: 'Kigali', value: 20, unit: 'users', bgColor: 'bg-purple-50', textColor: 'text-purple-500', iconText: 'K', iconSrc: '/Smarten Assets/assets/Kigali.svg' },
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
    <MainLayout>
      <div className="bg-white min-h-screen">
        <h1 className="text-xl font-semibold mb-2 ml-4 mt-1">Overview</h1>
        <div className="grid grid-cols-5 gap-4 px-4 mb-6">
          {regions.map((region) => (
            <Link to={`/monitor/${region.id}`} key={region.id} className="no-underline">
              <div className="bg-white rounded-xl p-5 cursor-pointer" style={{boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', background: `linear-gradient(to bottom right, white, ${region.id === 'north' ? '#fffbeb' : region.id === 'south' ? '#eff6ff' : region.id === 'east' ? '#fff7ed' : region.id === 'west' ? '#f0fdf4' : '#faf5ff'}`}}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 ${region.iconBg} rounded-full flex items-center justify-center shadow-sm`}>
                    <img src={region.iconSrc} alt={region.name} className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{region.name}</span>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-black leading-tight mb-1">{region.value}</div>
                  <div className="text-xs font-medium text-black">cm³/h</div>
                  <div className="text-xs font-medium text-black">Total water Flow</div>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      {/* Top arrow - pointing left */}
                      <line x1="4" y1="9" x2="20" y2="9" stroke="white" strokeWidth="2" />
                      <polyline points="8,5 4,9 8,13" stroke="white" strokeWidth="2" fill="none" />
                      
                      {/* Bottom arrow - pointing right */}
                      <line x1="4" y1="15" x2="20" y2="15" stroke="white" strokeWidth="2" />
                      <polyline points="16,11 20,15 16,19" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
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
                  <div key={index} className="flex items-center justify-between py-3 px-4 rounded-2xl shadow-sm" style={{backgroundColor: index === 0 ? 'rgba(254, 240, 138, 0.25)' : index === 1 ? 'rgba(191, 219, 254, 0.25)' : index === 2 ? 'rgba(253, 186, 116, 0.25)' : index === 3 ? 'rgba(167, 243, 208, 0.25)' : 'rgba(233, 213, 255, 0.25)'}}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-white bg-opacity-90 rounded-full flex items-center justify-center border" style={{borderColor: index === 0 ? 'rgba(250, 204, 21, 0.4)' : index === 1 ? 'rgba(96, 165, 250, 0.4)' : index === 2 ? 'rgba(251, 146, 60, 0.4)' : index === 3 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(192, 132, 252, 0.4)'}}>
                        <img src={stat.iconSrc} alt={stat.region} className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{stat.region}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700 mr-2">{stat.count} leakages</span>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{backgroundColor: index === 0 ? 'rgba(250, 204, 21, 0.6)' : index === 1 ? 'rgba(96, 165, 250, 0.6)' : index === 2 ? 'rgba(251, 146, 60, 0.6)' : index === 3 ? 'rgba(52, 211, 153, 0.6)' : 'rgba(192, 132, 252, 0.6)'}}>
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
              <CardTitle className="text-base font-semibold">Customers</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex justify-center gap-2 mb-2">
                {customerData.slice(0, 3).map((item, index) => (
                  <div key={index} className={`rounded-full p-1.5 text-center flex flex-col items-center justify-center aspect-square`} style={{width: '85px', height: '85px', backgroundColor: index === 0 ? 'rgba(254, 240, 138, 0.25)' : index === 1 ? 'rgba(191, 219, 254, 0.25)' : 'rgba(253, 186, 116, 0.25)'}}>
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center mb-0.5 border" style={{borderColor: index === 0 ? 'rgba(250, 204, 21, 0.4)' : index === 1 ? 'rgba(96, 165, 250, 0.4)' : 'rgba(251, 146, 60, 0.4)'}}>
                      <img src={item.iconSrc} alt={item.region} className="w-4 h-4" />
                    </div>
                    <div className="text-lg font-bold text-black">
                      {item.value}<span className="text-[10px] ml-0.5">{item.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                {customerData.slice(3, 5).map((item, index) => (
                  <div key={index} className={`rounded-full p-1.5 text-center flex flex-col items-center justify-center aspect-square`} style={{width: '85px', height: '85px', backgroundColor: index === 0 ? 'rgba(167, 243, 208, 0.25)' : 'rgba(233, 213, 255, 0.25)'}}>
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center mb-0.5 border" style={{borderColor: index === 0 ? 'rgba(52, 211, 153, 0.4)' : 'rgba(192, 132, 252, 0.4)'}}>
                      <img src={item.iconSrc} alt={item.region} className="w-4 h-4" />
                    </div>
                    <div className="text-lg font-bold text-black">
                      {item.value}<span className="text-[10px] ml-0.5">{item.unit}</span>
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
