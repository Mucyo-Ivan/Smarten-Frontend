import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ChevronDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
// Import the SVG icon
import GroupIcon from '../../../Smarten Assets/assets/Group.svg';

// StatusBadge component
const StatusBadge = ({ status }: { status: 'normal' | 'warning' | 'critical' }) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'normal':
        return { color: 'bg-green-500', text: 'normal' };
      case 'warning':
        return { color: 'bg-yellow-500', text: 'warning' };
      case 'critical':
        return { color: 'bg-red-500', text: 'critical' };
      default:
        return { color: 'bg-gray-500', text: 'unknown' };
    }
  };

  const { color, text } = getStatusDetails();

  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-md px-2 py-1 text-xs font-medium text-white ${color}`}>
        {text}
      </div>
    </div>
  );
};

const Monitor = () => {
  const [selectedProvince, setSelectedProvince] = useState('North');
  const [timeRange, setTimeRange] = useState<'D' | 'M' | 'Y'>('D');
  const [currentTime, setCurrentTime] = useState('16:00 PM');
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  
  useEffect(() => {
    // Update current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const period = hours >= 12 ? 'PM' : 'AM';
    setCurrentTime(`${formattedHours}:${formattedMinutes} ${period}`);
  }, []);

  // Provinces data with icons
  const provinces = [
    { name: 'North', icon: 'north.png' },
    { name: 'South', icon: 'south.png' },
    { name: 'East', icon: 'east.png' },
    { name: 'West', icon: 'west.png' },
    { name: 'Kigali', icon: 'kigali.png' },
  ];

  // Generate chart data based on time range and province
  const generateChartData = () => {
    const dataPoints = timeRange === 'D' ? 24 : timeRange === 'M' ? 30 : 12;
    const data = [];
    
    for (let i = 1; i <= dataPoints; i++) {
      // Using sine and cosine to generate realistic-looking oscillating data
      const flow = 20 + 10 * Math.sin(i / 2) + Math.random() * 4;
      
      data.push({
        time: timeRange === 'D' ? `${i}h` : timeRange === 'M' ? `Day ${i}` : `Month ${i}`,
        flow: Math.round(flow),
      });
    }
    
    return data;
  };

  const chartData = generateChartData();
  
  // Function to get current values
  const getCurrentValues = () => {
    // For demo purposes, just take the last data point
    const lastData = chartData[chartData.length - 1];
    return {
      flow: `${lastData.flow} cm³/h`,
    };
  };
  
  // Past hour and average values
  const pastHourValues = getCurrentValues();
  const averageValues = {
    flow: `${Math.round(chartData.reduce((sum, item) => sum + item.flow, 0) / chartData.length)} cm³/h`,
  };

  // Toggle province dropdown
  const toggleProvinceDropdown = () => {
    setShowProvinceDropdown(!showProvinceDropdown);
  };

  // Select province
  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setShowProvinceDropdown(false);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Province Selector and Title */}
        <div className="flex flex-col space-y-4 mb-6">
          <div className="relative inline-block">
            <button
              className="flex items-center bg-white rounded-md px-3 py-2 shadow-sm w-40"
              onClick={toggleProvinceDropdown}
            >
              <img
                src={`/provinces/${provinces.find(p => p.name === selectedProvince)?.icon}`}
                alt={selectedProvince}
                className="w-6 h-6 mr-2"
              />
              <span className="font-medium">{selectedProvince}</span>
              <ChevronDown className="w-4 h-4 ml-auto text-gray-500" />
            </button>
            
            {showProvinceDropdown && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white shadow-md rounded-md overflow-hidden z-20">
                {provinces.map((province) => (
                  <div
                    key={province.name}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProvinceSelect(province.name)}
                  >
                    <img src={`/provinces/${province.icon}`} alt={province.name} className="w-6 h-6 mr-2" />
                    <span>{province.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <h1 className="text-xl font-semibold">Real time monitoring</h1>
        </div>
        
        {/* Time Period Controls */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
              timeRange === 'D' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setTimeRange('D')}
          >
            D
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
              timeRange === 'M' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setTimeRange('M')}
          >
            M
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
              timeRange === 'Y' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setTimeRange('Y')}
          >
            Y
          </div>
        </div>
        
        {/* Chart and Data Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line 
                    type="monotone" 
                    dataKey="flow" 
                    stroke="#0095ff" 
                    strokeWidth={2} 
                    dot={{ r: 0 }}
                    activeDot={{ r: 6 }}
                  />
                  <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
                  <XAxis dataKey="time" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">water flow</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Past Hour and Average */}
          <div>
            {/* Past Hour Card */}
            <div className="bg-white mb-6 rounded-lg shadow-sm">
              <div className="p-4">
                <div className="flex flex-col mb-2">
                  <div className="text-base font-medium mb-1">Past Hour</div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="text-xs text-gray-400">{currentTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center my-2 relative">
                  {/* Blue Circle */}
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white z-10">
                    <div className="text-center">
                      <span className="text-base font-medium">{pastHourValues.flow}</span>
                    </div>
                  </div>
                  
                  {/* Connecting Line */}
                  <div className="absolute w-8 h-4 bg-blue-400 z-0"></div>
                  
                </div>
                
                <div className="flex items-center justify-center mt-3">
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 mr-1 text-gray-600" />
                    <span className="mr-1 text-xs font-bold text-gray-600">Status</span>
                    <div className="bg-green-500 text-white text-xs px-3 py-0.5 rounded-full">
                      normal
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
                  {/* Blue Circle */}
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white z-10">
                    <div className="text-center">
                      <span className="text-base font-medium">{averageValues.flow}</span>
                    </div>
                  </div>
                  
                  {/* Connecting Line */}
                  <div className="absolute w-8 h-4 bg-blue-400 z-0"></div>
                  
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
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">1</td>
                  <td className="py-3 px-4 text-sm">Gicumbi</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4">
                    <div className="bg-green-500 text-white text-xs px-3 py-0.5 rounded-full inline-block">
                      normal
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">2</td>
                  <td className="py-3 px-4 text-sm">Musanze</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4">
                    <div className="bg-yellow-500 text-white text-xs px-3 py-0.5 rounded-full inline-block">
                      underflow
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">3</td>
                  <td className="py-3 px-4 text-sm">Gasabo</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4">
                    <div className="bg-red-500 text-white text-xs px-3 py-0.5 rounded-full inline-block">
                      overflow
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">4</td>
                  <td className="py-3 px-4 text-sm">Rulindo</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4">
                    <div className="bg-green-500 text-white text-xs px-3 py-0.5 rounded-full inline-block">
                      normal
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">5</td>
                  <td className="py-3 px-4 text-sm">Burera</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4">
                    <div className="bg-yellow-500 text-white text-xs px-3 py-0.5 rounded-full inline-block">
                      underflow
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Critical Readings Section */}
        <div className="mt-8 mb-6">
          <h2 className="text-lg font-medium mb-4">Critical readings</h2>
          
          <div className="space-y-4">
            {/* Critical Item 1 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <img src={GroupIcon} alt="Group Icon" className="w-5 h-5 mr-2" />
                <span className="font-medium">North/Rulindo/Base</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">24 cm³/h</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Activity className="w-3 h-3 mr-1 text-gray-400" />
                  <span className="mr-1 text-xs text-gray-400">Status</span>
                  <div className="bg-yellow-500 text-white text-xs px-3 py-0.5 rounded-full">
                    underflow
                  </div>
                </div>
              </div>
            </div>
            
            {/* Critical Item 2 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <img src={GroupIcon} alt="Group Icon" className="w-5 h-5 mr-2" />
                <span className="font-medium">Kigali/Kicukiro/Kamagashye</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">24 cm³/h</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Activity className="w-3 h-3 mr-1 text-gray-400" />
                  <span className="mr-1 text-xs text-gray-400">Status</span>
                  <div className="bg-red-500 text-white text-xs px-3 py-0.5 rounded-full">
                    overflow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Monitor;
