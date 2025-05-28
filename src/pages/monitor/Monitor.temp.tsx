import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

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
    // Update the current time every minute
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
  
  // Generate sinusoidal data to match the design exactly
  const getChartData = () => {
    const points = 12; // Number of data points for x-axis
    
    if (timeRange === 'D') {
      const data = [];
      // Generate sinusoidal data for water flow and pressure
      for (let i = 0; i < points; i++) {
        const hour = i * 2;
        const hourLabel = `${hour}h`;
        const waterFlow = Math.round(24 + 12 * Math.sin((i / points) * Math.PI * 4));
        const pressure = Math.round(44 + 10 * Math.cos((i / points) * Math.PI * 3));
        data.push({
          name: hourLabel,
          'water flow': waterFlow,
          pressure: pressure,
        });
      }
      return data;
    } else if (timeRange === 'M') {
      const data = [
        { name: 'Week 1', 'water flow': 24, pressure: 44 },
        { name: 'Week 2', 'water flow': 28, pressure: 46 },
        { name: 'Week 3', 'water flow': 22, pressure: 42 },
        { name: 'Week 4', 'water flow': 26, pressure: 44 },
      ];
      return data;
    } else {
      const data = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let i = 0; i < months.length; i++) {
        const waterFlow = Math.round(24 + 8 * Math.sin((i / months.length) * Math.PI * 2));
        const pressure = Math.round(44 + 6 * Math.cos((i / months.length) * Math.PI * 2));
        data.push({
          name: months[i],
          'water flow': waterFlow,
          pressure: pressure,
        });
      }
      return data;
    }
  };

  // Get current values based on time range
  const getCurrentValues = () => {
    return { flow: '24 cm³/h', pressure: '44 kpa' };
  };
  
  // Get past hour values
  const getPastHourValues = () => {
    return { flow: '22 cm³/h', pressure: '44 kpa' };
  };
  
  // Get average values
  const getAverageValues = () => {
    return { flow: '24 cm³/h', pressure: '44 kpa' };
  };
  
  // Provinces data for dropdown
  const provinces = [
    { id: 'north', name: 'North', color: 'bg-yellow-100', letter: 'N' },
    { id: 'south', name: 'South', color: 'bg-blue-100', letter: 'S' },
    { id: 'east', name: 'East', color: 'bg-green-100', letter: 'E' },
    { id: 'west', name: 'West', color: 'bg-purple-100', letter: 'W' },
    { id: 'kigali', name: 'Kigali', color: 'bg-red-100', letter: 'K' },
  ];
  
  // Get active province
  const getActiveProvince = () => {
    return provinces.find(p => p.name === selectedProvince) || provinces[0];
  };

  const chartData = getChartData();
  const currentValues = getCurrentValues();
  const pastHourValues = getPastHourValues();
  const averageValues = getAverageValues();
  const activeProvince = getActiveProvince();

  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setShowProvinceDropdown(false);
  };

  return (
    <MainLayout title={selectedProvince}>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Main Chart */}
          <div className="md:col-span-2">
            {/* Header with Province Selection and Time Period Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 cursor-pointer relative" onClick={() => setShowProvinceDropdown(!showProvinceDropdown)}>
                <div className={`flex items-center justify-center ${activeProvince.color} rounded-full h-8 w-8`}>
                  <span className="text-lg font-semibold">{activeProvince.letter}</span>
                </div>
                <h2 className="text-lg font-semibold">{activeProvince.name}</h2>
                <ChevronDown className="h-4 w-4 text-gray-500" />
                
                {/* Province Dropdown */}
                {showProvinceDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-40 bg-white shadow-lg rounded-md z-10">
                    {provinces.map(province => (
                      <div 
                        key={province.id}
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleProvinceSelect(province.name)}
                      >
                        <div className={`flex items-center justify-center ${province.color} rounded-full h-6 w-6 mr-2`}>
                          <span className="text-sm font-semibold">{province.letter}</span>
                        </div>
                        <span className="text-sm">{province.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Real Time Monitoring Chart Card */}
            <Card className="mb-6 shadow-sm border border-gray-100">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">Real time monitoring</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{currentTime}</span>
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pb-4 px-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-4 items-center">
                    <div className="text-xs text-gray-500">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span> water flow
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span> pressure
                    </div>
                  </div>
                  
                  <div className="flex items-center bg-gray-100 rounded-md">
                    <button
                      onClick={() => setTimeRange('D')}
                      className={`px-3 py-1 text-xs font-medium ${
                        timeRange === 'D' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-700'
                      }`}
                    >
                      D
                    </button>
                    <button
                      onClick={() => setTimeRange('M')}
                      className={`px-3 py-1 text-xs font-medium ${
                        timeRange === 'M' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-700'
                      }`}
                    >
                      M
                    </button>
                    <button
                      onClick={() => setTimeRange('Y')}
                      className={`px-3 py-1 text-xs font-medium ${
                        timeRange === 'Y' ? 'bg-blue-500 text-white rounded-md' : 'text-gray-700'
                      }`}
                    >
                      Y
                    </button>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="w-full h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#888' }}
                      />
                      <YAxis 
                        hide={true}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="water flow" 
                        stroke="#3b82f6" 
                        strokeWidth={1.5} 
                        dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
                        activeDot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pressure" 
                        stroke="#22c55e" 
                        strokeWidth={1.5} 
                        dot={{ r: 3, fill: '#22c55e', strokeWidth: 0 }}
                        activeDot={{ r: 5, fill: '#22c55e', strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Past Hour and Average */}
          <div>
            {/* Past Hour Card */}
            <Card className="mb-6 shadow-sm border border-gray-100">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Past Hour</CardTitle>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">{currentTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2 pb-4">
                <div className="flex items-center justify-center gap-6 py-2">
                  {/* Water Flow Circle */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-1">
                      <span className="text-sm font-medium">{pastHourValues.flow}</span>
                    </div>
                  </div>
                  
                  {/* Pressure Circle */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-1">
                      <span className="text-sm font-medium">{pastHourValues.pressure}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mt-2">
                  <StatusBadge status="normal" />
                </div>
              </CardContent>
            </Card>
            
            {/* Average Card */}
            <Card className="shadow-sm border border-gray-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Average</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 pb-4">
                <div className="flex items-center justify-center gap-6 py-2">
                  {/* Water Flow Circle */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-1">
                      <span className="text-sm font-medium">{averageValues.flow}</span>
                    </div>
                  </div>
                  
                  {/* Pressure Circle */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-1">
                      <span className="text-sm font-medium">{averageValues.pressure}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Monitor;
