import { useState, useEffect, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

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

// Custom tooltip component for line chart
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="text-gray-600 font-medium text-xs mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div style={{ backgroundColor: entry.color }} className="w-2 h-2 rounded-full" />
            <p style={{ color: entry.color }} className="text-sm font-medium">
              {entry.dataKey === 'water flow' ? (
                <span>{entry.value} cm³/h</span>
              ) : (
                <span>{entry.value} kpa</span>
              )}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Monitor = () => {
  const [selectedProvince, setSelectedProvince] = useState('North');
  const [timeRange, setTimeRange] = useState<'D' | 'M' | 'Y'>('D');
  const [currentTime, setCurrentTime] = useState('16:00 PM');
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [activeDataPoint, setActiveDataPoint] = useState<number | null>(null);
  const chartRef = useRef<any>(null);
  
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
  
  // Recalculate values when province or time range changes
  useEffect(() => {
    // Reset active data point when changing provinces or time range
    setActiveDataPoint(null);
  }, [selectedProvince, timeRange]);
  
  // Generate dynamic data based on province and time range
  const getChartData = () => {
    const points = 12; // Number of data points for x-axis
    
    // Province-specific base values and multipliers
    const provinceData = {
      'North': { baseFlow: 24, basePressure: 44, flowMultiplier: 1.0, pressureMultiplier: 1.0 },
      'South': { baseFlow: 28, basePressure: 42, flowMultiplier: 1.2, pressureMultiplier: 0.9 },
      'East': { baseFlow: 22, basePressure: 40, flowMultiplier: 0.9, pressureMultiplier: 0.85 },
      'West': { baseFlow: 26, basePressure: 46, flowMultiplier: 1.1, pressureMultiplier: 1.05 },
      'Kigali': { baseFlow: 30, basePressure: 48, flowMultiplier: 1.3, pressureMultiplier: 1.1 }
    };
    
    // Get values for current province
    const { baseFlow, basePressure, flowMultiplier, pressureMultiplier } = 
      provinceData[selectedProvince as keyof typeof provinceData];
    
    // Add small random variation based on province name to make each province's data unique
    const provinceVariation = selectedProvince.charCodeAt(0) / 100;
    
    if (timeRange === 'D') {
      const data = [];
      // Generate sinusoidal data for water flow and pressure
      for (let i = 0; i < points; i++) {
        const hour = i * 2;
        const hourLabel = `${hour}h`;
        
        // Different pattern for each province
        const waterFlow = Math.round(baseFlow + (12 * flowMultiplier) * 
          Math.sin((i / points) * Math.PI * (4 + provinceVariation)));
          
        const pressure = Math.round(basePressure + (10 * pressureMultiplier) * 
          Math.cos((i / points) * Math.PI * (3 + provinceVariation)));
          
        data.push({
          name: hourLabel,
          'water flow': waterFlow,
          pressure: pressure,
        });
      }
      return data;
    } else if (timeRange === 'M') {
      const data = [];
      const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      
      for (let i = 0; i < weeks.length; i++) {
        // Different pattern for each province
        const waterFlow = Math.round(baseFlow + (8 * flowMultiplier) * 
          Math.sin((i / weeks.length) * Math.PI * (2 + provinceVariation)));
          
        const pressure = Math.round(basePressure + (6 * pressureMultiplier) * 
          Math.cos((i / weeks.length) * Math.PI * (2 + provinceVariation)));
          
        data.push({
          name: weeks[i],
          'water flow': waterFlow,
          pressure: pressure,
        });
      }
      return data;
    } else {
      const data = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      for (let i = 0; i < months.length; i++) {
        // Different pattern for each province
        const waterFlow = Math.round(baseFlow + (8 * flowMultiplier) * 
          Math.sin((i / months.length) * Math.PI * (2 + provinceVariation)));
          
        const pressure = Math.round(basePressure + (6 * pressureMultiplier) * 
          Math.cos((i / months.length) * Math.PI * (2 + provinceVariation)));
          
        data.push({
          name: months[i],
          'water flow': waterFlow,
          pressure: pressure,
        });
      }
      return data;
    }
  };

  // Get current values based on province and time range
  const getCurrentValues = () => {
    // Province-specific base values
    const provinceData = {
      'North': { baseFlow: 24, basePressure: 44 },
      'South': { baseFlow: 28, basePressure: 42 },
      'East': { baseFlow: 22, basePressure: 40 },
      'West': { baseFlow: 26, basePressure: 46 },
      'Kigali': { baseFlow: 30, basePressure: 48 }
    };
    
    // Get base values for current province
    const { baseFlow, basePressure } = provinceData[selectedProvince as keyof typeof provinceData];
    
    // Add variation based on time range
    let flowModifier = 0;
    let pressureModifier = 0;
    
    if (timeRange === 'M') {
      flowModifier = 2;
      pressureModifier = 1;
    } else if (timeRange === 'Y') {
      flowModifier = 4;
      pressureModifier = 2;
    }
    
    return { 
      flow: `${baseFlow + flowModifier} cm³/h`, 
      pressure: `${basePressure + pressureModifier} kpa` 
    };
  };
  
  // Get past hour values based on province
  const getPastHourValues = () => {
    // Province-specific base values with slight variations
    const provinceData = {
      'North': { baseFlow: 22, basePressure: 43 },
      'South': { baseFlow: 26, basePressure: 41 },
      'East': { baseFlow: 20, basePressure: 39 },
      'West': { baseFlow: 24, basePressure: 45 },
      'Kigali': { baseFlow: 28, basePressure: 47 }
    };
    
    // Get base values for current province
    const { baseFlow, basePressure } = provinceData[selectedProvince as keyof typeof provinceData];
    
    // Add variation based on time range
    let flowModifier = 0;
    let pressureModifier = 0;
    
    if (timeRange === 'M') {
      flowModifier = 1;
      pressureModifier = 1;
    } else if (timeRange === 'Y') {
      flowModifier = 3;
      pressureModifier = 2;
    }
    
    return { 
      flow: `${baseFlow + flowModifier} cm³/h`, 
      pressure: `${basePressure + pressureModifier} kpa` 
    };
  };
  
  // Get average values based on province and time range
  const getAverageValues = () => {
    // Province-specific base values
    const provinceData = {
      'North': { baseFlow: 23, basePressure: 44 },
      'South': { baseFlow: 27, basePressure: 42 },
      'East': { baseFlow: 21, basePressure: 40 },
      'West': { baseFlow: 25, basePressure: 46 },
      'Kigali': { baseFlow: 29, basePressure: 48 }
    };
    
    // Get base values for current province
    const { baseFlow, basePressure } = provinceData[selectedProvince as keyof typeof provinceData];
    
    // Add variation based on time range
    let flowModifier = 0;
    let pressureModifier = 0;
    
    if (timeRange === 'M') {
      flowModifier = 2;
      pressureModifier = 1;
    } else if (timeRange === 'Y') {
      flowModifier = 3;
      pressureModifier = 2;
    }
    
    return { 
      flow: `${baseFlow + flowModifier} cm³/h`, 
      pressure: `${basePressure + pressureModifier} kpa` 
    };
  };
  
  // Provinces data for dropdown with official icons
  const provinces = [
    { id: 'north', name: 'North', color: 'bg-[#F7D917]', letter: 'N', icon: '/Smarten Assets/assets/North.svg' },
    { id: 'south', name: 'South', color: 'bg-[#396EB0]', letter: 'S', icon: '/Smarten Assets/assets/South.svg' },
    { id: 'east', name: 'East', color: 'bg-[#FD7E14]', letter: 'E', icon: '/Smarten Assets/assets/East.svg' },
    { id: 'west', name: 'West', color: 'bg-[#22C55E]', letter: 'W', icon: '/Smarten Assets/assets/West.svg' },
    { id: 'kigali', name: 'Kigali', color: 'bg-[#AF52DE]', letter: 'K', icon: '/Smarten Assets/assets/Kigali.svg' },
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
                <div className="flex items-center justify-center w-8 h-8">
                  <img src={activeProvince.icon} alt={activeProvince.name} className="w-7 h-7" />
                </div>
                <h2 className="text-lg font-semibold">{activeProvince.name}</h2>
                <ChevronDown className={`w-4 h-4 text-gray-500 ${showProvinceDropdown ? 'transform rotate-180' : ''}`} />
                
                {showProvinceDropdown && (
                  <div className="absolute top-10 left-0 bg-white shadow-md rounded-md z-10 min-w-[150px] py-1">
                    {provinces.map(province => (
                      <div
                        key={province.id}
                        className={`flex items-center px-3 py-2 hover:bg-gray-100 ${selectedProvince === province.name ? 'bg-gray-50' : ''}`}
                        onClick={() => handleProvinceSelect(province.name)}
                      >
                        <div className="flex items-center justify-center w-6 h-6 mr-2">
                          <img src={province.icon} alt={province.name} className="w-5 h-5" />
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
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart 
                      data={chartData} 
                      margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
                      ref={chartRef}
                      onMouseMove={(e) => {
                        if (e.activeTooltipIndex !== undefined) {
                          setActiveDataPoint(e.activeTooltipIndex);
                        }
                      }}
                      onMouseLeave={() => setActiveDataPoint(null)}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis 
                        dataKey="name"
                        stroke="#94a3b8"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        fontSize={10}
                        stroke="#94a3b8"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
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
