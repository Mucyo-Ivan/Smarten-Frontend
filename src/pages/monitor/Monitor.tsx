import { useState, useEffect, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Activity, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';

// Import province icons
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';

// Import Group icon
import GroupIcon from '../../../Smarten Assets/assets/Group.svg';

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
        <div className="flex justify-center items-center text-xs text-gray-500 mb-1">
          <Clock className="w-3 h-3 mr-1" />
          <span>{label}</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>{payload[0]?.value} cm³/h</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const StatusBadge = ({ status }: { status: 'normal' | 'warning' | 'critical' }) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'normal':
        return { 
          textColor: 'text-green-700', 
          bgColor: 'rgba(52, 211, 153, 0.25)', 
          borderColor: 'rgba(52, 211, 153, 0.5)',
          text: 'normal' 
        };
      case 'warning':
        return { 
          textColor: 'text-orange-700', 
          bgColor: 'rgba(251, 146, 60, 0.25)', 
          borderColor: 'rgba(251, 146, 60, 0.5)',
          text: 'warning' 
        };
      case 'critical':
        return { 
          textColor: 'text-red-700', 
          bgColor: 'rgba(239, 68, 68, 0.25)', 
          borderColor: 'rgba(239, 68, 68, 0.5)',
          text: 'critical' 
        };
      default:
        return { 
          textColor: 'text-gray-700', 
          bgColor: 'rgba(156, 163, 175, 0.25)', 
          borderColor: 'rgba(156, 163, 175, 0.5)',
          text: 'unknown' 
        };
    }
  };

  const { textColor, bgColor, borderColor, text } = getStatusDetails();

  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${textColor}`} 
           style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}` }}>
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
  
  // Get province-specific data constants
  const getProvinceData = (provinceName: string) => {
    const provinceData = {
      'North': { baseFlow: 24, flowMultiplier: 1.0 },
      'South': { baseFlow: 28, flowMultiplier: 1.2 },
      'East': { baseFlow: 22, flowMultiplier: 0.9 },
      'West': { baseFlow: 26, flowMultiplier: 1.1 },
      'Kigali': { baseFlow: 30, flowMultiplier: 1.3 }
    };
    return provinceData[provinceName as keyof typeof provinceData] || provinceData['North'];
  };

  // Generate chart data based on selected province and time range
  const generateChartData = () => {
    // Get data for current province
    const { baseFlow, flowMultiplier } = getProvinceData(selectedProvince);
    
    // Add small random variation based on province name to make each province's data unique
    const provinceVariation = selectedProvince.charCodeAt(0) / 100;
    
    if (timeRange === 'D') {
      const data = [];
      // Start with 0h
      data.push({
        time: '0h',
        flow: Math.round(baseFlow + (12 * flowMultiplier) * Math.sin(provinceVariation))
      });
      
      // Generate data points for hours 2h through 22h
      for (let hour = 2; hour <= 22; hour += 2) {
        const i = hour / 2;
        const waterFlow = Math.round(baseFlow + (12 * flowMultiplier) * 
          Math.sin((i / 12) * Math.PI * (4 + provinceVariation)));
        data.push({
          time: `${hour}h`,
          flow: waterFlow
        });
      }
      
      // End with 24h
      data.push({
        time: '24h',
        flow: Math.round(baseFlow + (12 * flowMultiplier) * Math.sin(Math.PI * (4 + provinceVariation)))
      });
      
      return data;
    } else if (timeRange === 'M') {
      const data = [];
      
      // Add weeks instead of days
      const weeks = ['1st week', '2nd week', '3rd week', '4th week'];
      for (let i = 0; i < weeks.length; i++) {
        const waterFlow = Math.round(baseFlow + (10 * flowMultiplier) * 
          Math.sin((i / weeks.length) * Math.PI * (6 + provinceVariation)));
        data.push({
          time: weeks[i],
          flow: waterFlow
        });
      }
      
      return data;
    } else {
      // Year view (Y)
      const data = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      for (let i = 0; i < months.length; i++) {
        const waterFlow = Math.round(baseFlow + (8 * flowMultiplier) * 
          Math.sin((i / months.length) * Math.PI * (2 + provinceVariation)));
        data.push({
          time: months[i],
          flow: waterFlow
        });
      }
      
      return data;
    }
  };

  // Provinces data for dropdown with official icons
  const provinces = [
    { id: 'north', name: 'North', color: 'bg-[#F7D917]', letter: 'N', iconSrc: NorthIcon },
    { id: 'south', name: 'South', color: 'bg-[#396EB0]', letter: 'S', iconSrc: SouthIcon },
    { id: 'east', name: 'East', color: 'bg-[#FD7E14]', letter: 'E', iconSrc: EastIcon },
    { id: 'west', name: 'West', color: 'bg-[#22C55E]', letter: 'W', iconSrc: WestIcon },
    { id: 'kigali', name: 'Kigali', color: 'bg-[#AF52DE]', letter: 'K', iconSrc: KigaliIcon },
  ];

  // Get current values based on province and time range
  const getCurrentValues = () => {
    // Get data for current province
    const { baseFlow } = getProvinceData(selectedProvince);
    
    // Add variation based on time range
    let flowModifier = 0;
    
    if (timeRange === 'M') {
      flowModifier = 2;
    } else if (timeRange === 'Y') {
      flowModifier = 4;
    }
    
    return { 
      flow: `${baseFlow + flowModifier} cm³/h`
    };
  };
  
  // Get past hour values based on province
  const getPastHourValues = () => {
    // Get data for current province with slight variations
    const { baseFlow } = getProvinceData(selectedProvince);
    const pastHourFlow = baseFlow - 2; // Slightly lower than current
    
    return { 
      flow: `${pastHourFlow} cm³/h`
    };
  };
  
  // Get average values based on province and time range
  const getAverageValues = () => {
    // Get data for current province
    const { baseFlow } = getProvinceData(selectedProvince);
    
    // Average is usually close to base flow
    return { 
      flow: `${baseFlow} cm³/h`
    };
  };
  
  const getActiveProvince = () => {
    return provinces.find(p => p.name === selectedProvince) || provinces[0];
  };

  const chartData = generateChartData();
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
                <div className="h-8 w-8 flex items-center justify-center">
                  <img src={activeProvince.iconSrc} alt={activeProvince.name} className="h-8 w-8 object-contain" />
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
                        <div className="h-6 w-6 flex items-center justify-center mr-2">
                          <img src={province.iconSrc} alt={province.name} className="h-6 w-6 object-contain" />
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
                <div className="flex items-center justify-end mb-2">
                  
                  <div className="flex items-center justify-end gap-1 mb-4">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium cursor-pointer ${
                        timeRange === 'D' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => setTimeRange('D')}
                    >
                      D
                    </div>
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium cursor-pointer ${
                        timeRange === 'M' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => setTimeRange('M')}
                    >
                      M
                    </div>
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium cursor-pointer ${
                        timeRange === 'Y' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => setTimeRange('Y')}
                    >
                      Y
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="w-full h-56 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
                      {/* Define gradients for the lines */}
                      <defs>
                        <linearGradient id="flowLineGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0095ff" />
                          <stop offset="100%" stopColor="#0095ff" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="time" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 9, fill: '#888' }}
                        interval={0}
                        tickFormatter={(value) => value}
                        padding={{ left: 30, right: 30 }}
                      />
                      <YAxis hide />
                      <Tooltip 
                        content={<CustomTooltip />}
                        cursor={{ stroke: '#ccc', strokeWidth: 1 }}
                        allowEscapeViewBox={{ x: true, y: true }}
                        wrapperStyle={{ zIndex: 100 }}
                      />
                      <Line 
                        type="monotone"
                        dataKey="flow" 
                        stroke="url(#flowLineGradient)" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 4, fill: '#fff', stroke: '#0095ff', strokeWidth: 2 }}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  {/* Legend indicator positioned at the bottom of the chart */}
                  <div className="flex items-center justify-end space-x-6 absolute bottom-[-15px] right-4">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-xs text-gray-600">water flow</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                  {/* Blue Circle for Flow */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white z-10 mb-1">
                      <div className="text-center">
                        <span className="text-base font-medium">{pastHourValues.flow}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">Water Flow</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mt-3">
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 mr-1 text-black" />
                    <span className="mr-1 text-xs font-bold text-black">Status</span>
                    <div className="text-green-700 text-xs px-3 py-1 rounded-full font-medium" style={{backgroundColor: 'rgba(52, 211, 153, 0.25)', border: '1px solid rgba(52, 211, 153, 0.5)'}}>
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
                  {/* Blue Circle for Flow */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white z-10 mb-1">
                      <div className="text-center">
                        <span className="text-base font-medium">{averageValues.flow}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">Water Flow</span>
                  </div>
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
                    <div className="text-green-700 text-xs px-3 py-1 rounded-full inline-block font-medium" style={{backgroundColor: 'rgba(52, 211, 153, 0.25)', border: '1px solid rgba(52, 211, 153, 0.5)'}}>
                      normal
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">2</td>
                  <td className="py-3 px-4 text-sm">Musanze</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4">
                    <div className="text-orange-700 text-xs px-3 py-1 rounded-full inline-block font-medium" style={{backgroundColor: 'rgba(251, 146, 60, 0.25)', border: '1px solid rgba(251, 146, 60, 0.5)'}}>
                      underflow
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">3</td>
                  <td className="py-3 px-4 text-sm">Gasabo</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4">
                    <div className="text-red-700 text-xs px-3 py-1 rounded-full inline-block font-medium" style={{backgroundColor: 'rgba(239, 68, 68, 0.25)', border: '1px solid rgba(239, 68, 68, 0.5)'}}>
                      overflow
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">4</td>
                  <td className="py-3 px-4 text-sm">Rulindo</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4">
                    <div className="text-green-700 text-xs px-3 py-1 rounded-full inline-block font-medium" style={{backgroundColor: 'rgba(52, 211, 153, 0.25)', border: '1px solid rgba(52, 211, 153, 0.5)'}}>
                      normal
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm">5</td>
                  <td className="py-3 px-4 text-sm">Burera</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4">
                    <div className="text-orange-700 text-xs px-3 py-1 rounded-full inline-block font-medium" style={{backgroundColor: 'rgba(251, 146, 60, 0.25)', border: '1px solid rgba(251, 146, 60, 0.5)'}}>
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
                  <Activity className="w-3 h-3 mr-1 text-black" />
                  <span className="mr-1 text-xs font-bold text-black">Status</span>
                  <div className="text-orange-700 text-xs px-4 py-2 rounded-full font-medium" style={{backgroundColor: 'rgba(251, 146, 60, 0.5)', border: '1px solid rgba(251, 146, 60, 0.8)', opacity: 0.9}}>
                    underflow
                  </div>
                </div>
              </div>
            </div>
            
            {/* Critical Item 2 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <img src={GroupIcon} alt="Group Icon" className="w-5 h-5 mr-2" />
                <span className="font-medium">Kigali/Kicukiro/Kamashashi</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">24 cm³/h</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Activity className="w-3 h-3 mr-1 text-black" />
                  <span className="mr-1 text-xs font-bold text-black">Status</span>
                  <div className="text-red-700 text-xs px-4 py-2 rounded-full font-medium" style={{backgroundColor: 'rgba(239, 68, 68, 0.5)', border: '1px solid rgba(239, 68, 68, 0.8)', opacity: 0.9}}>
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
