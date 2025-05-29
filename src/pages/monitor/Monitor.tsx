import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ChevronDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
// Import the SVG icon
import GroupIcon from '../../../Smarten Assets/assets/Group.svg';

// StatusBadge component
const StatusBadge = ({ status }: { status: 'normal' | 'warning' | 'critical' }) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'normal':
        return { color: 'bg-green-500', text: 'normal' };
      case 'warning':
        return { color: 'bg-orange-500', text: 'warning' };
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
  
  // Generate chart data based on selected time range
  const generateChartData = () => {
    if (timeRange === 'D') {
      const data = [];
      // Start with 0h
      data.push({
        time: '0h',
        flow: Math.round(24 + 12 * Math.sin(0)),
        pressure: Math.round(44 + 10 * Math.cos(0)),
      });
      
      // Generate data points for hours 2h through 22h
      for (let hour = 2; hour <= 22; hour += 2) {
        const i = hour / 2;
        const waterFlow = Math.round(24 + 12 * Math.sin((i / 12) * Math.PI * 4));
        const pressure = Math.round(44 + 10 * Math.cos((i / 12) * Math.PI * 3));
        data.push({
          time: `${hour}h`,
          flow: waterFlow,
          pressure: pressure,
        });
      }
      
      // End with 24h
      data.push({
        time: '24h',
        flow: Math.round(24 + 12 * Math.sin(Math.PI * 4)),
        pressure: Math.round(44 + 10 * Math.cos(Math.PI * 3)),
      });
      
      return data;
    } else if (timeRange === 'M') {
      const data = [];
      
      // Add weeks instead of days
      const weeks = ['1st week', '2nd week', '3rd week', '4th week'];
      for (let i = 0; i < weeks.length; i++) {
        const waterFlow = Math.round(24 + 10 * Math.sin((i / weeks.length) * Math.PI * 6));
        const pressure = Math.round(44 + 12 * Math.cos((i / weeks.length) * Math.PI * 5));
        data.push({
          time: weeks[i],
          flow: waterFlow,
          pressure: pressure,
        });
      }
      
      return data;
    } else {
      const data = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      for (let i = 0; i < months.length; i++) {
        const waterFlow = Math.round(24 + 8 * Math.sin((i / months.length) * Math.PI * 2));
        const pressure = Math.round(44 + 6 * Math.cos((i / months.length) * Math.PI * 2));
        data.push({
          time: months[i],
          flow: waterFlow,
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
    { id: 'north', name: 'North', color: 'bg-yellow-100', letter: 'N', iconSrc: '/Smarten Assets/assets/North.svg' },
    { id: 'south', name: 'South', color: 'bg-blue-100', letter: 'S', iconSrc: '/Smarten Assets/assets/South.svg' },
    { id: 'east', name: 'East', color: 'bg-green-100', letter: 'E', iconSrc: '/Smarten Assets/assets/East.svg' },
    { id: 'west', name: 'West', color: 'bg-purple-100', letter: 'W', iconSrc: '/Smarten Assets/assets/West.svg' },
    { id: 'kigali', name: 'Kigali', color: 'bg-red-100', letter: 'K', iconSrc: '/Smarten Assets/assets/Kigali.svg' },
  ];
  
  // Get active province
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
                        <linearGradient id="pressureLineGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                        <linearGradient id="tooltipGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0095ff" />
                          <stop offset="50%" stopColor="#7bb8ff" />
                          <stop offset="100%" stopColor="#10b981" />
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
                      <Tooltip 
                        position={{ y: 60 }}
                        coordinate={{ x: 100, y: 140 }}
                        allowEscapeViewBox={{ x: false, y: true }}
                        content={(props) => {
                          const { active, payload, label } = props || {};
                          if (active && payload && payload.length >= 2) {
                            try {
                              // Convert hour format (e.g., "8h") to time format (e.g., "8:00 AM")
                              let formattedTime = currentTime;
                              if (label) {
                                const hourMatch = label.match(/^(\d+)h$/);
                                if (hourMatch) {
                                  const hour = parseInt(hourMatch[1]);
                                  const ampm = hour >= 12 ? 'PM' : 'AM';
                                  const hour12 = hour % 12 || 12;
                                  formattedTime = `${hour12}:00 ${ampm}`;
                                }
                              }
                              
                              return (
                                <div className="bg-white p-2 shadow-md rounded-md border border-gray-100">
                                  <div className="flex justify-center items-center text-xs text-gray-500 mb-1">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span>{formattedTime}</span>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1 text-xs">
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                      <span>{payload[0]?.value || 0} cm³/h</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <span>{payload[1]?.value || 0} kpa</span>
                                    </div>
                                    <div className="h-1 w-full mt-1 rounded-full" style={{ background: 'linear-gradient(to right, #0095ff, #7bb8ff, #10b981)' }}></div>
                                  </div>
                                </div>
                              );
                            } catch (e) {
                              console.error(e);
                              return null;
                            }
                          }
                          return null;
                        }}
                        wrapperStyle={{ zIndex: 100 }}
                      />
                      <Line 
                        type="natural"
                        dataKey="flow" 
                        stroke="url(#flowLineGradient)" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 4, fill: '#fff', stroke: '#0095ff', strokeWidth: 2 }}
                        isAnimationActive={false}
                        strokeOpacity={0.9}
                      />
                      <Line 
                        type="natural"
                        dataKey="pressure" 
                        stroke="url(#pressureLineGradient)" 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 4, fill: '#fff', stroke: '#10b981', strokeWidth: 2 }}
                        isAnimationActive={false}
                        strokeOpacity={0.9}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  
                  {/* Legend indicators positioned at the bottom of the chart */}
                  <div className="flex items-center justify-end space-x-6 absolute bottom-[-15px] right-4">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-xs text-gray-600">water flow</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs text-gray-600">pressure</span>
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
                  {/* Blue Circle */}
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 text-white z-10">
                    <div className="text-center">
                      <span className="text-base font-medium">{pastHourValues.flow}</span>
                    </div>
                  </div>
                  
                  {/* Connecting Line */}
                  <div className="absolute w-8 h-4 z-0" style={{ background: 'linear-gradient(to right, #0095ff, #10b981)' }}></div>
                  
                  {/* Green Circle */}
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500 text-white ml-6 z-10">
                    <div className="text-center">
                      <span className="text-base font-medium">{pastHourValues.pressure}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center mt-3">
                  <div className="flex items-center">
                    <Activity className="w-4 h-4 mr-1 text-black" />
                    <span className="mr-1 text-xs font-bold text-black">Status</span>
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
                  <div className="absolute w-8 h-4 z-0" style={{ background: 'linear-gradient(to right, #0095ff, #10b981)' }}></div>
                  
                  {/* Green Circle */}
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500 text-white ml-6 z-10">
                    <div className="text-center">
                      <span className="text-base font-medium">{averageValues.pressure}</span>
                    </div>
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
                  <th className="py-3 px-4 text-left text-sm font-medium">Pressure</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">1</td>
                  <td className="py-3 px-4 text-sm">Gicumbi</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4 text-sm">20kpa</td>
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
                  <td className="py-3 px-4 text-sm">20kpa</td>
                  <td className="py-3 px-4">
                    <div className="bg-orange-500 text-white text-xs px-3 py-0.5 rounded-full inline-block">
                      underflow
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm">3</td>
                  <td className="py-3 px-4 text-sm">Gasabo</td>
                  <td className="py-3 px-4 text-sm">200cm³/s</td>
                  <td className="py-3 px-4 text-sm">20kpa</td>
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
                  <td className="py-3 px-4 text-sm">20kpa</td>
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
                  <td className="py-3 px-4 text-sm">20kpa</td>
                  <td className="py-3 px-4">
                    <div className="bg-orange-500 text-white text-xs px-3 py-0.5 rounded-full inline-block">
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
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">44 kpa</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Activity className="w-3 h-3 mr-1 text-black" />
                  <span className="mr-1 text-xs font-bold text-black">Status</span>
                  <div className="bg-orange-500 text-white text-xs px-3 py-0.5 rounded-full">
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
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">44 kpa</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Activity className="w-3 h-3 mr-1 text-black" />
                  <span className="mr-1 text-xs font-bold text-black">Status</span>
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
