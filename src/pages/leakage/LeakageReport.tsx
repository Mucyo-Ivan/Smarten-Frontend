
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import RegionIcon from '@/components/ui/RegionIcon';
import { ChevronDown, CheckCircle, Search, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const regionColors = {
  north: '#FCD34D',
  south: '#60A5FA',
  east: '#FB923C',
  west: '#22C55E',
  kigali: '#A855F7',
};

const LeakageReport = () => {
  const { regionId } = useParams();
  const region = regionId || 'north';
  const regionName = region.charAt(0).toUpperCase() + region.slice(1);
  const regionColor = regionColors[region as keyof typeof regionColors];

  // Mock data for demonstration
  const leakageData = {
    date: '06/04/2025',
    time: '12:00 AM',
    waterLoss: 20,
    pressureDrop: 20,
    location: 'Kigali, Kicukiro, Kamashahi',
    severity: 'High',
    action: true,
    status: 'Investigating', // Change to 'Resolved' to see resolved state
    plumber: 'Nshimiyumukiza Aimable',
    resolvedDate: '06/04/2025',
    resolvedNote: 'There was a massive leakage that damaged the pipe in a great amount, but it has been fixed and water is flowing again.',
  };

  // Mock history and investigated leaks
  const history = [
    { time: '06/04/2025 12:00 AM', location: 'Gicumbi', waterLost: '200cm³/s', status: 'Investigating' },
    { time: '06/04/2025 12:00 AM', location: 'Musanze', waterLost: '200cm³/s', status: 'Investigating' },
    { time: '06/04/2025 12:00 AM', location: 'Gakenke', waterLost: '200cm³/s', status: 'Investigating' },
    { time: '06/04/2025 12:00 AM', location: 'Rulindo', waterLost: '200cm³/s', status: 'Resolved' },
    { time: '06/04/2025 12:00 AM', location: 'Burera', waterLost: '200cm³/s', status: 'Resolved' },
  ];
  const investigatedLeaks = [
    { date: '06/04/2025 12:00 AM', desc: 'Leakage detected in Musanze' },
    { date: '06/04/2025 12:00 AM', desc: 'Leakage detected in Nyabihu' },
    { date: '06/04/2025 12:00 AM', desc: 'Leakage detected in Karongi' },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-[#F8F9FA] px-0 pt-0">
        {/* Province Dropdown */}
        <div className="flex items-center gap-2 mt-6 ml-6">
          <span className="w-7 h-7 flex items-center justify-center rounded-full" style={{ background: `${regionColor}33` }}>
            <RegionIcon region={region as any} />
          </span>
          <span style={{ color: regionColor, fontWeight: 700, fontSize: 18 }}>{regionName}</span>
          <ChevronDown size={18} className="ml-1 text-gray-500" />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 max-w-5xl mx-auto w-full mt-6">
          {/* Left: Main Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Leakage Detection Card */}
            <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-xs text-gray-500">{leakageData.date}</div>
                  <div className="text-xs text-gray-500">{leakageData.time}</div>
                </div>
                <div className="flex gap-8 mt-2 md:mt-0">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#222]">{leakageData.waterLoss}</span>
                    <span className="text-xs text-gray-500">cm³</span>
                    <span className="text-xs text-gray-400 mt-1">water lost</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-[#222]">{leakageData.pressureDrop}</span>
                    <span className="text-xs text-gray-500">kpa</span>
                    <span className="text-xs text-gray-400 mt-1">pressure drop</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-sm">{leakageData.location}</span>
                </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium">Severity:</span>
                <span className="text-sm text-red-500 font-semibold">{leakageData.severity}</span>
                </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium">Action:</span>
                <span className="text-sm">{leakageData.action ? 'Yes' : 'No'}</span>
                </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm font-medium">Status:</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" checked={leakageData.status === 'Resolved'} readOnly className="accent-blue-600 h-4 w-4" />
                    <span className="text-sm">Resolved</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" checked={leakageData.status === 'Investigating'} readOnly className="accent-blue-600 h-4 w-4" />
                    <span className="text-sm">Investigating</span>
                  </label>
                </div>
              </div>
            </div>

            {/* History Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base">History</span>
                <Button variant="ghost" className="text-sm text-blue-500 px-2 py-1 h-auto">See more</Button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500">
                    <th className="text-left py-2 font-normal">Time</th>
                    <th className="text-left py-2 font-normal">Location</th>
                    <th className="text-left py-2 font-normal">Water lost</th>
                    <th className="text-left py-2 font-normal">status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="py-2 text-xs text-gray-700">{row.time}</td>
                      <td className="py-2 text-xs text-gray-700">{row.location}</td>
                      <td className="py-2 text-xs text-gray-700">{row.waterLost}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Investigating' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Blue Card and Investigated Leaks */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Blue Card: Ongoing Analysis or Resolved Leakage */}
            {leakageData.status === 'Investigating' ? (
              <div className="bg-[#3B82F6] rounded-xl shadow p-6 flex flex-col items-center justify-center min-h-[260px]">
                <span className="text-white text-lg font-semibold mb-2">Ongoing Analysis of<br/>Detected Leakage</span>
                <img src="/ongoing-analysis.svg" alt="Ongoing Analysis" className="w-48 h-36 object-contain" />
              </div>
            ) : (
              <div className="bg-[#3B82F6] rounded-xl shadow p-6 flex flex-col min-h-[260px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-lg font-semibold">Resolved leakage</span>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Edit size={16} className="text-white" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-white text-sm mb-1">Date</div>
                    <div className="text-white text-base font-semibold">{leakageData.resolvedDate}</div>
                  </div>
                  <div>
                    <div className="text-white text-sm mb-1">Plumber</div>
                    <div className="text-white text-base font-semibold">{leakageData.plumber}</div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-white text-sm mb-1">Resolved note</div>
                  <div className="text-white text-base">{leakageData.resolvedNote}</div>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <svg width="120" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.0801V12.0001C21.9988 14.1565 21.3005 16.2548 20.0093 17.9819C18.7182 19.7091 16.9033 20.9726 14.8354 21.5839C12.7674 22.1952 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4882 2.02168 11.3364C2.16356 9.18467 2.99721 7.13643 4.39828 5.49718C5.79935 3.85793 7.69279 2.71549 9.79619 2.24025C11.8996 1.76502 14.1003 1.98245 16.07 2.86011" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  <span className="text-2xl font-bold text-white mt-2 mb-4">Success</span>
                </div>
              </div>
            )}

            {/* Investigated Leaks Card */}
            <div className="bg-white rounded-xl shadow p-6 min-h-[260px]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base">Investigated leaks</span>
                <span className="text-xs text-gray-500">7</span>
                </div>
              <div className="flex flex-col gap-4 mt-2">
                {investigatedLeaks.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="flex flex-col items-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      {idx !== investigatedLeaks.length - 1 && <div className="h-6 w-0.5 bg-blue-200 mx-auto mt-1"></div>}
                </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <p className="text-sm text-gray-900">{item.desc}</p>
                  </div>
                    <Button variant="link" className="text-blue-500 text-xs px-0 py-0 h-auto ml-2">Resolve</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LeakageReport;
