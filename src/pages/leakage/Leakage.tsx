
import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ChevronDown, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Import SVG icons
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';
import HouseSearchingCuate from '../../../Smarten Assets/assets/House searching-cuate 1.svg';
import SuccessIcon from '../../../Smarten Assets/assets/Success.png';
import AlertIcon from '../../../Smarten Assets/assets/Alert.svg';

const regions = [
  { id: 'north', name: 'North', icon: NorthIcon, color: '#FCD34D' },
  { id: 'south', name: 'South', icon: SouthIcon, color: '#60A5FA' },
  { id: 'east', name: 'East', icon: EastIcon, color: '#FB923C' },
  { id: 'west', name: 'West', icon: WestIcon, color: '#22C55E' },
  { id: 'kigali', name: 'Kigali', icon: KigaliIcon, color: '#A855F7' },
];

const provinceLeakageData = {
  north: {
    leakageData: {
      date: '06/04/2025',
      time: '12:00 AM',
      waterLoss: 20,
      location: 'Kigali, Kicukiro,Kamashahi',
      severity: 'High',
      action: true,
      status: 'Investigating',
    },
    history: [
      { time: '06/04/2025 12:00 AM', location: 'Gicumbi', waterLost: '200cm³/s', status: 'Investigating' },
      { time: '06/04/2025 12:00 AM', location: 'Musanze', waterLost: '200cm³/s', status: 'Investigating' },
      { time: '06/04/2025 12:00 AM', location: 'Gakenke', waterLost: '200cm³/s', status: 'Investigating' },
      { time: '06/04/2025 12:00 AM', location: 'Rulindo', waterLost: '200cm³/s', status: 'Resolved' },
      { time: '06/04/2025 12:00 AM', location: 'Burera', waterLost: '200cm³/s', status: 'Resolved' },
    ],
    investigatedLeaks: [
      { date: '06/04/2025 12:00 AM', desc: 'Leakage detected in Musanze' },
      { date: '06/04/2025 12:00 AM', desc: 'Leakage detected in Nyabihu' },
      { date: '06/04/2025 12:00 AM', desc: 'Leakage detected in Karongi' },
    ],
  },
  east: {
    leakageData: {
      date: '07/04/2025',
      time: '01:00 AM',
      waterLoss: 15,
      location: 'Ngoma, Kibungo',
      severity: 'Medium',
      action: false,
      status: 'Resolved',
    },
    history: [
      { time: '07/04/2025 01:00 AM', location: 'Ngoma', waterLost: '150cm³/s', status: 'Resolved' },
      { time: '07/04/2025 01:00 AM', location: 'Kirehe', waterLost: '120cm³/s', status: 'Investigating' },
      { time: '07/04/2025 01:00 AM', location: 'Bugesera', waterLost: '110cm³/s', status: 'Investigating' },
    ],
    investigatedLeaks: [
      { date: '07/04/2025 01:00 AM', desc: 'Leakage detected in Ngoma' },
      { date: '07/04/2025 01:00 AM', desc: 'Leakage detected in Kirehe' },
    ],
  },
  south: {
    leakageData: {
      date: '08/04/2025',
      time: '02:00 AM',
      waterLoss: 10,
      location: 'Huye, Tumba',
      severity: 'Low',
      action: true,
      status: 'Investigating',
    },
    history: [
      { time: '08/04/2025 02:00 AM', location: 'Huye', waterLost: '100cm³/s', status: 'Investigating' },
      { time: '08/04/2025 02:00 AM', location: 'Nyanza', waterLost: '90cm³/s', status: 'Resolved' },
    ],
    investigatedLeaks: [
      { date: '08/04/2025 02:00 AM', desc: 'Leakage detected in Huye' },
    ],
  },
  west: {
    leakageData: {
      date: '09/04/2025',
      time: '03:00 AM',
      waterLoss: 25,
      location: 'Rubavu, Gisenyi',
      severity: 'High',
      action: false,
      status: 'Investigating',
    },
    history: [
      { time: '09/04/2025 03:00 AM', location: 'Rubavu', waterLost: '250cm³/s', status: 'Investigating' },
      { time: '09/04/2025 03:00 AM', location: 'Karongi', waterLost: '200cm³/s', status: 'Resolved' },
    ],
    investigatedLeaks: [
      { date: '09/04/2025 03:00 AM', desc: 'Leakage detected in Rubavu' },
    ],
  },
  kigali: {
    leakageData: {
      date: '10/04/2025',
      time: '04:00 AM',
      waterLoss: 30,
      location: 'Gasabo, Remera',
      severity: 'Medium',
      action: true,
      status: 'Resolved',
    },
    history: [
      { time: '10/04/2025 04:00 AM', location: 'Gasabo', waterLost: '300cm³/s', status: 'Resolved' },
      { time: '10/04/2025 04:00 AM', location: 'Kicukiro', waterLost: '280cm³/s', status: 'Investigating' },
    ],
    investigatedLeaks: [
      { date: '10/04/2025 04:00 AM', desc: 'Leakage detected in Gasabo' },
    ],
  },
};

// Add pressureDrop to each province's leakageData
// (add to each provinceLeakageData.leakageData: pressureDrop: 20, 15, etc. as appropriate)
// For brevity, only north is shown here, but you should add to all provinces in your real code
provinceLeakageData.north.leakageData.pressureDrop = 20;
provinceLeakageData.east.leakageData.pressureDrop = 15;
provinceLeakageData.south.leakageData.pressureDrop = 10;
provinceLeakageData.west.leakageData.pressureDrop = 25;
provinceLeakageData.kigali.leakageData.pressureDrop = 30;

const Leakage = () => {
  const [selectedRegion, setSelectedRegion] = useState('north');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [status, setStatus] = useState('Investigating');
  const [editResolved, setEditResolved] = useState(false);
  const [resolvedForm, setResolvedForm] = useState({
    date: '06/04/2025',
    plumber: 'Nshimiyumukiza Aimable',
    note: 'There was a massive leakage that damage the pipe in a great amount, but it has been fixed and water is flowing again',
  });
  const [resolvedErrors, setResolvedErrors] = useState({ date: '', plumber: '', note: '' });
  const [resolvedFeedback, setResolvedFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700); // Simulate loading
    return () => clearTimeout(timeout);
  }, [selectedRegion]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const region = regions.find(r => r.id === selectedRegion);
  const currentData = provinceLeakageData[selectedRegion];

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32 mt-6">
        {/* Province Dropdown */}
        <div className="flex items-center gap-2 mt-6 ml-6">
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-base font-semibold focus:outline-none transition hover:shadow-md active:scale-95"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ minWidth: 120 }}
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full" style={{ background: `${region.color}33` }}>
                <img src={region.icon} alt={region.name} className="w-4 h-4" />
              </span>
              <span style={{ color: region.color, fontWeight: 700 }}>{region.name}</span>
              <ChevronDown className={`ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} size={18} />
            </button>
            <div
              className={`absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-20 border border-gray-100 flex flex-col transition-all duration-200 origin-top scale-95 opacity-0 pointer-events-none ${dropdownOpen ? 'scale-100 opacity-100 pointer-events-auto' : ''}`}
              ref={dropdownRef}
              style={{ willChange: 'transform, opacity' }}
            >
              {dropdownOpen && regions.map(r => (
                <button
                  key={r.id}
                  className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-xl text-left transition active:scale-95"
                  onClick={() => {
                    setSelectedRegion(r.id);
                    setDropdownOpen(false);
                  }}
                  style={{ width: '100%' }}
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full" style={{ background: `${r.color}33` }}>
                    <img src={r.icon} alt={r.name} className="w-4 h-4" />
                  </span>
                  <span style={{ color: r.color, fontWeight: 700 }}>{r.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main card: Leakage Detection (left) + Ongoing Analysis (right) in a single card */}
        <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32 mt-6">
          <div className="bg-white rounded-xl shadow flex flex-row p-0 overflow-hidden" style={{ minHeight: 300 }}>
            {/* Loading spinner for main card */}
            {loading ? (
              <div className="flex-1 flex items-center justify-center min-h-[300px]">
                <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              </div>
            ) : (
              <>
                {/* Leakage Detection */}
                <div className="flex-1 flex flex-col justify-center px-8 py-8 gap-1" style={{ minWidth: 0 }}>
                  <span className="text-lg font-semibold mb-2">Leakage Detection</span>
                  {/* Date and time centered */}
                  <div className="flex flex-col items-center justify-center mb-2" style={{margin: '0 auto'}}>
                    <div className="text-xs font-semibold text-black">{currentData.leakageData.date}</div>
                    <div className="text-xs text-gray-400 -mt-1 mb-2">{currentData.leakageData.time}</div>
                  </div>
                  {/* Water loss centered */}
                  <div className="flex flex-col items-center justify-center mb-2" style={{margin: '0 auto'}}>
                    <div className="flex items-end gap-1">
                      <div className="text-3xl font-bold">{currentData.leakageData.waterLoss}</div>
                      <span className="text-base font-normal align-top mb-1">cm³</span>
                    </div>
                    <div className="text-xs text-gray-400">water lost</div>
                  </div>
                  {/* Divider */}
                  <hr className="border-t border-gray-200 my-2 w-full max-w-xs mx-auto" />
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{currentData.leakageData.location}</span>
                  </div>
                  {/* Severity */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <img src={AlertIcon} alt="Severity" className="w-4 h-4" />
                    <span className="font-medium">Severity:</span>
                    <span className="text-black font-semibold">{currentData.leakageData.severity}</span>
                  </div>
                  {/* Action */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <CheckCircle size={16} className="text-black" />
                    <span className="font-medium">Action:</span>
                    <span className="text-black">{currentData.leakageData.action ? 'Yes' : 'No'}</span>
                  </div>
                  {/* Status */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <Activity size={16} className="text-black" />
                    <span className="font-medium">Status</span>
                  </div>
                  {/* Status radio buttons */}
                  <div className="flex items-center gap-4 mt-1">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="status" value="Resolved" checked={status === 'Resolved'} onChange={() => setStatus('Resolved')} className="accent-blue-600 h-4 w-4" />
                      <span className="text-sm">Resolved</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input type="radio" name="status" value="Investigating" checked={status === 'Investigating'} onChange={() => setStatus('Investigating')} className="accent-blue-600 h-4 w-4" />
                      <span className="text-sm">Investigating</span>
                    </label>
                  </div>
                </div>
                {/* Right side: Ongoing Analysis or Resolved Leakage */}
                <div className="flex-1 flex flex-col items-center justify-center p-0 relative" style={{ minWidth: 0, minHeight: 300 }}>
                  <div className={`w-full h-full transition-all duration-300 ${status === 'Investigating' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none absolute'}`}
                    style={{ position: status === 'Investigating' ? 'relative' : 'absolute' }}>
                    {status === 'Investigating' && (
                      <div className="bg-[#3B82F6] rounded-xl flex flex-col items-center justify-center mx-auto my-6 animate-fade-in" style={{maxWidth: 340, minHeight: 240, width: '100%', display: 'flex'}}>
                        <span className="text-white text-lg font-semibold mb-2 mt-8 text-center">Ongoing Analysis of<br/>Detected Leakage</span>
                        <img src={HouseSearchingCuate} alt="Ongoing Analysis" className="w-56 h-44 object-contain mb-8" />
                      </div>
                    )}
                  </div>
                  <div className={`w-full h-full transition-all duration-300 ${status === 'Resolved' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none absolute'}`}
                    style={{ position: status === 'Resolved' ? 'relative' : 'absolute' }}>
                    {status === 'Resolved' && !editResolved && (
                      <div className="bg-[#3B82F6] rounded-xl flex flex-col items-center justify-center mx-auto my-6 p-6 relative animate-fade-in" style={{maxWidth: 400, minHeight: 240, width: '100%', display: 'flex'}}>
                        <div className="flex items-center justify-between w-full mb-2">
                          <span className="text-white text-lg font-semibold">Resolved leakage</span>
                          <button
                            className="h-8 w-8 p-0 flex items-center justify-center hover:bg-blue-400 rounded-full transition absolute top-6 right-6"
                            onClick={() => setEditResolved(true)}
                            title="Edit"
                          >
                            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                          </button>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                          <div className="text-white text-sm mb-1">Date</div>
                          <div className="text-white text-base font-semibold">{resolvedForm.date}</div>
                          <div className="text-white text-sm mb-1">Plumber</div>
                          <div className="text-white text-base font-semibold">{resolvedForm.plumber}</div>
                          <div className="text-white text-sm mb-1">Resolved note</div>
                          <div className="text-white text-base">{resolvedForm.note}</div>
                        </div>
                      </div>
                    )}
                    {status === 'Resolved' && editResolved && (
                      <div className="bg-[#3B82F6] rounded-xl flex flex-col items-center justify-center mx-auto my-6 p-6 relative animate-fade-in" style={{maxWidth: 400, minHeight: 260, width: '100%', display: 'flex'}}>
                        <span className="text-white text-lg font-semibold mb-4">Resolved leakage</span>
                        <form className="flex flex-col w-full gap-4 items-center">
                          <div className="flex w-full gap-4">
                            <div className="flex flex-col flex-1">
                              <label className="text-white text-sm mb-1">Date</label>
                              <input type="date" className="rounded-lg px-3 py-2 outline-none border-none w-full" />
                            </div>
                            <div className="flex flex-col flex-1">
                              <label className="text-white text-sm mb-1">Plumber</label>
                              <input type="text" placeholder="Plumber name" className="rounded-lg px-3 py-2 outline-none border-none w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <label className="text-white text-sm mb-1">Resolved note</label>
                            <textarea placeholder="Write text here..." className="rounded-lg px-3 py-2 outline-none border-none w-full min-h-[80px]" />
                          </div>
                          <button type="submit" className="bg-[#0EA5E9] text-white font-semibold rounded-lg px-8 py-2 mt-2 self-center">Save</button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* History and Investigated Leaks side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 max-w-5xl mx-auto w-full mt-6">
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base">History</span>
                <Button variant="ghost" className="text-sm text-blue-500 px-2 py-1 h-auto">See more</Button>
              </div>
              {loading ? (
                <div className="flex items-center justify-center min-h-[120px]">
                  <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                </div>
              ) : currentData.history.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[120px] text-gray-400">
                  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                  <span className="mt-2">No history available.</span>
                </div>
              ) : (
                <table className="w-full text-sm overflow-x-auto">
                  <thead>
                  <tr className="text-gray-500">
                    <th className="text-left py-2 font-normal">Time</th>
                    <th className="text-left py-2 font-normal">Location</th>
                    <th className="text-left py-2 font-normal">Water lost</th>
                    <th className="text-left py-2 font-normal">status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {currentData.history.map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="py-2 text-xs text-gray-700">
                        <div>{row.time.split(' ')[0]}</div>
                        <div className="text-[11px] text-gray-400 leading-tight">{row.time.split(' ').slice(1).join(' ')}</div>
                        </td>
                      <td className="py-2 text-xs text-gray-700">{row.location}</td>
                      <td className="py-2 text-xs text-gray-700">{row.waterLost}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Investigating' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6 min-h-[260px] flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base">Investigated leaks</span>
                <span className="text-xs text-gray-500">{currentData.investigatedLeaks.length}</span>
              </div>
              {loading ? (
                <div className="flex items-center justify-center min-h-[100px]">
                  <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                </div>
              ) : currentData.investigatedLeaks.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[100px] text-gray-400">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                  <span className="mt-2">No investigated leaks.</span>
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-2 overflow-y-auto" style={{maxHeight: 220}}>
                  {currentData.investigatedLeaks.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="flex flex-col items-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        {idx !== currentData.investigatedLeaks.length - 1 && <div className="h-6 w-0.5 bg-blue-200 mx-auto mt-1"></div>}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{item.date}</p>
                        <p className="text-sm text-gray-900">{item.desc}</p>
                      </div>
                      <Button variant="link" className="text-blue-500 text-xs px-0 py-0 h-auto ml-2">Resolve</Button>
                    </div>
                  ))}
                </div>
              )}
              {currentData.investigatedLeaks.length > 4 && (
                <Button variant="ghost" className="text-blue-500 text-xs mt-2 self-center" onClick={() => window.location.href = '/leakage/investigated-leaks'}>
                  See more
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leakage;
