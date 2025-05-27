
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import RegionIcon from '@/components/ui/RegionIcon';
import FlowCircle from '@/components/ui/FlowCircle';
import StatusBadge from '@/components/ui/StatusBadge';

const Control = () => {
  const [selectedRegion, setSelectedRegion] = useState<'north' | 'south' | 'east' | 'west' | 'kigali'>('north');
  const [switchState, setSwitchState] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  
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
      <div className="flex items-center gap-2 mb-6">
        <RegionIcon region={selectedRegion} />
        <h2 className="text-2xl font-semibold">{selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}</h2>
        <button className="ml-1 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div>
          <SectionHeader title="Control" />
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 flex flex-col items-center">
            <div className="mb-4">
              <ToggleSwitch 
                isOn={switchState} 
                onChange={setSwitchState} 
                onLabel="ON" 
                offLabel="OFF"
              />
            </div>
            
            <div className="w-full mt-4 flex items-center gap-2 justify-center">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                <span className="text-sm">24 cm³/h</span>
              </span>
              <span className="flex items-center gap-1 ml-4">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span className="text-sm">44 kpa</span>
              </span>
            </div>
            
            <div className="w-full mt-4 flex items-center gap-2 justify-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
              <div className={`px-2 py-1 text-xs rounded-full ${switchState ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`}>
                {switchState ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <SectionHeader title="History">
              <span className="text-sm text-gray-500 dark:text-gray-400">(past hour)</span>
            </SectionHeader>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Location</th>
                      <th>Command</th>
                      <th>Situation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.location}</td>
                        <td>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.command === 'ON' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                            {item.command}
                          </span>
                        </td>
                        <td>
                          <StatusBadge status={item.situation as any} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Link
                  to="/control/history"
                  className="btn-primary text-sm"
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
              className="flex items-center gap-1 bg-smarten-blue text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add
            </button>
          </SectionHeader>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 min-h-[400px]">
            {showScheduleForm ? (
              <div className="p-6 border dark:border-gray-800 rounded-lg">
                <h3 className="text-lg font-medium mb-4 text-center">Make your control schedule</h3>
                
                <form onSubmit={handleSubmitSchedule}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Location*
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g North"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Command*
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g North"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date
                      </label>
                      <input 
                        type="text" 
                        placeholder="DD/MM/YY"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-800"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Time*
                      </label>
                      <input 
                        type="text" 
                        placeholder="07:00AM"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="pt-4 flex justify-center">
                      <button 
                        type="submit" 
                        className="bg-smarten-blue hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
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
                      <p className="text-sm">
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
            
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
                <FlowCircle 
                  value={20} 
                  unit="cmd" 
                  color="bg-yellow-100 dark:bg-yellow-900/20" 
                  textColor="text-yellow-600 dark:text-yellow-400"
                />
                <FlowCircle 
                  value={40} 
                  unit="cmd" 
                  color="bg-blue-100 dark:bg-blue-900/20" 
                  textColor="text-blue-600 dark:text-blue-400"
                />
                <FlowCircle 
                  value={90} 
                  unit="cmd" 
                  color="bg-orange-100 dark:bg-orange-900/20" 
                  textColor="text-orange-600 dark:text-orange-400"
                />
                <FlowCircle 
                  value={100} 
                  unit="cmd" 
                  color="bg-green-100 dark:bg-green-900/20" 
                  textColor="text-green-600 dark:text-green-400"
                />
                <FlowCircle 
                  value={120} 
                  unit="cmd" 
                  color="bg-purple-100 dark:bg-purple-900/20" 
                  textColor="text-purple-600 dark:text-purple-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Control;
