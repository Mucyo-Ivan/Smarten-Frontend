import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import StatusBadge from '@/components/ui/StatusBadge';
import { ChevronDown, Droplets, Zap, Plus } from 'lucide-react';

// Import SVG icons
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';

const Control = () => {
  const [selectedRegion, setSelectedRegion] = useState<'north' | 'south' | 'east' | 'west' | 'kigali'>('north');
  const [switchState, setSwitchState] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const regions = [
    { id: 'north', name: 'North', icon: NorthIcon, color: '#FCD34D' },
    { id: 'south', name: 'South', icon: SouthIcon, color: '#60A5FA' },
    { id: 'east', name: 'East', icon: EastIcon, color: '#FB923C' },
    { id: 'west', name: 'West', icon: WestIcon, color: '#22C55E' },
    { id: 'kigali', name: 'Kigali', icon: KigaliIcon, color: '#A855F7' },
  ];
  
  // History data
  const historyData = [
    { id: 1, location: 'Burera', command: 'ON', situation: 'normal' },
    { id: 2, location: 'Gicumbi', command: 'OFF', situation: 'leakage' },
    { id: 3, location: 'Musanze', command: 'OFF', situation: 'normal' },
    { id: 4, location: 'Gakenke', command: 'ON', situation: 'leakage' },
    { id: 5, location: 'Rulindo', command: 'ON', situation: 'leakage' },
  ];
  
  // Scheduled controls
  const scheduledControls = [
    {
      time: '07:00 AM',
      action: 'Turn on water in Musanze',
    },
    {
      time: '08:00 AM',
      action: 'Turn off water in Nyabihu',
    },
    {
      time: '09:00 AM',
      action: 'Turn on water in Base sector',
    },
    {
      time: '09:00 AM',
      action: 'Turn off water in Karongi sector',
    },
  ];

  const handleSubmitSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setShowScheduleForm(false);
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32">
        <div style={{ margin: 0, padding: 0 }}>
          {/* Header - Province Dropdown */}
          <div className="flex items-center gap-2" style={{ marginBottom: 0, paddingBottom: 0 }}>
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-base font-semibold focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ minWidth: 120 }}
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full" style={{ background: `${regions.find(r => r.id === selectedRegion)?.color}33` }}>
                  <img src={regions.find(r => r.id === selectedRegion)?.icon} alt={regions.find(r => r.id === selectedRegion)?.name} className="w-4 h-4" />
                </span>
                <span style={{ color: regions.find(r => r.id === selectedRegion)?.color, fontWeight: 700 }}>
                  {regions.find(r => r.id === selectedRegion)?.name}
                </span>
                <ChevronDown className={`ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} size={18} />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-20 border border-gray-100 flex flex-col" ref={dropdownRef}>
                  {regions.map(region => (
                    <button
                      key={region.id}
                      className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-xl text-left"
                      onClick={() => {
                        setSelectedRegion(region.id as Parameters<typeof setSelectedRegion>[0]);
                        setDropdownOpen(false);
                      }}
                      style={{ width: '100%' }}
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-full" style={{ background: `${region.color}33` }}>
                        <img src={region.icon} alt={region.name} className="w-4 h-4" />
                      </span>
                      <span style={{ color: region.color, fontWeight: 700 }}>{region.name}</span>
        </button>
                  ))}
                </div>
              )}
            </div>
      </div>
          {/* Grid with toggle and controls - remove negative margin, add small marginTop if needed */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 max-w-5xl mx-auto" style={{ marginTop: '16px' }}>
        {/* Control Panel */}
            <div className="lg:col-span-5">
          <SectionHeader title="Control" />
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 flex flex-col items-center">
                {/* Custom Toggle Switch */}
                <div
                  className={`relative w-[460px] h-[200px] rounded-full flex items-center transition-colors duration-300 cursor-pointer`}
                  onClick={() => setSwitchState(!switchState)}
                  style={{ background: switchState ? '#D4FFE0' : '#E0E8F7' }}
                >
                  <div
                    className={`absolute left-4 top-4 w-[168px] h-[168px] rounded-full flex items-center justify-center font-bold text-6xl transition-transform duration-300 shadow-md ${switchState ? 'translate-x-[284px]' : ''}`}
                    style={{
                      background: '#333333',
                      color: switchState ? '#388E3C' : '#60A5FA',
                      border: `4px solid ${switchState ? '#388E3C' : '#60A5FA'}`,
                    }}
                  >
                    {switchState ? 'ON' : 'OFF'}
            </div>
            </div>
            
                <div className="w-full mt-6 flex items-center justify-between text-gray-500 dark:text-gray-400 px-4">
                  <span className="flex items-center gap-2 text-sm">
                    <Zap size={16} className="text-gray-500 dark:text-gray-400" />
                    <span>Status</span>
              <div className={`px-2 py-1 text-xs rounded-full ${switchState ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`}>
                {switchState ? 'Online' : 'Offline'}
              </div>
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <Droplets size={16} className="text-blue-500" />
                    <span>24 cm³/h</span>
                  </span>
            </div>
          </div>
          
          <div className="mt-6">
            <SectionHeader title="History">
              <span className="text-sm text-gray-500 dark:text-gray-400">(past hour)</span>
            </SectionHeader>
            
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 min-h-[350px]">
              <div className="overflow-x-auto">
                    <table className="data-table w-full">
                  <thead>
                    <tr>
                          <th className="text-left py-2">N°</th>
                          <th className="text-left py-2">Location</th>
                          <th className="text-left py-2">Command</th>
                          <th className="text-left py-2">Situation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((item) => (
                          <tr key={item.id} className="border-t border-gray-100 dark:border-gray-700">
                            <td className="py-2">{item.id}</td>
                            <td className="py-2">{item.location}</td>
                            <td className="py-2">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.command === 'ON' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {item.command}
                          </span>
                        </td>
                            <td className="py-2">
                          <StatusBadge status={item.situation as any} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
                  <div className="mt-4 flex justify-end">
                <Link
                  to="/control/history"
                      className="text-sm text-blue-500 hover:underline"
                >
                  See more
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scheduled Controls */}
        <div className="lg:col-span-2">
          <SectionHeader title="Scheduled Controls">
            <button
              onClick={() => setShowScheduleForm(true)}
                  className="flex items-center gap-1 bg-blue-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
            >
                  <Plus className="w-4 h-4" />
              Add
            </button>
          </SectionHeader>
          
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 min-h-[350px]">
            {showScheduleForm ? (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative">
                      <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={() => setShowScheduleForm(false)}
                      >
                        &times;
                      </button>
                      <h3 className="text-lg font-medium mb-4 text-center text-gray-900 dark:text-white">Make your control schedule</h3>
                
                <form onSubmit={handleSubmitSchedule}>
                  <div className="space-y-4">
                    <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Location*
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g North"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Command*
                      </label>
                      <input 
                        type="text" 
                              placeholder="e.g ON / OFF"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Date
                      </label>
                      <input 
                        type="text" 
                        placeholder="DD/MM/YY"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Time*
                      </label>
                      <input 
                        type="text" 
                              placeholder="07:00 AM"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-center">
                      <button 
                        type="submit" 
                              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
                    </div>
              </div>
            ) : scheduledControls.length > 0 ? (
              <div className="space-y-4">
                {scheduledControls.map((schedule, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <div className="h-full w-0.5 bg-blue-200 dark:bg-blue-900/30 mx-auto mt-1"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {schedule.time}
                      </p>
                          <p className="text-sm text-gray-900 dark:text-white">
                        {schedule.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                No Scheduled Controls
              </div>
            )}
          </div>
          
          {/* Stats */}
          <div className="mt-6">
            <SectionHeader title="Stats" />
            
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 min-h-[350px]">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex justify-center gap-4">
                      {regions.slice(0, 3).map((region) => (
                        <div key={region.id} className="flex flex-col items-center justify-center p-2 rounded-full" style={{ background: `${region.color}33`, width: '100px', height: '100px' }}>
                          <img src={region.icon} alt={region.name} className="w-14 h-14" />
                          <span className="text-xs text-black font-bold">20cmd</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-4">
                      {regions.slice(3, 5).map((region) => (
                        <div key={region.id} className="flex flex-col items-center justify-center p-2 rounded-full" style={{ background: `${region.color}33`, width: '100px', height: '100px' }}>
                          <img src={region.icon} alt={region.name} className="w-14 h-14" />
                          <span className="text-xs text-black font-bold">20cmd</span>
                        </div>
                      ))}
                    </div>
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

export default Control;
