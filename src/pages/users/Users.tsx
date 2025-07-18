
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LineChart from '@/components/ui/LineChart';
import RegionIcon from '@/components/ui/RegionIcon';
import { Search, Users as UsersIcon, TrendingUp, UserPlus } from 'lucide-react';
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';

const Users = () => {
  const [selectedRegion, setSelectedRegion] = useState('north');
  const [searchTerm, setSearchTerm] = useState('');

  const regions = [
    { id: 'north', name: 'North', users: '20,000', growth: '+12%', color: 'bg-yellow-50', iconBg: 'bg-yellow-500', buttonColor: 'bg-yellow-500 hover:bg-yellow-600' },
    { id: 'south', name: 'South', users: '59,000', growth: '+8%', color: 'bg-blue-50', iconBg: 'bg-blue-500', buttonColor: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'east', name: 'East', users: '100,000', growth: '+15%', color: 'bg-orange-50', iconBg: 'bg-orange-500', buttonColor: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'west', name: 'West', users: '420,000', growth: '+10%', color: 'bg-green-50', iconBg: 'bg-green-500', buttonColor: 'bg-green-500 hover:bg-green-600' },
    { id: 'kigali', name: 'Kigali', users: '120,000', growth: '+18%', color: 'bg-purple-50', iconBg: 'bg-purple-500', buttonColor: 'bg-purple-500 hover:bg-purple-600' },
  ];

  const chartData = [
    { name: '00:00', value: 15000 },
    { name: '04:00', value: 18000 },
    { name: '08:00', value: 25000 },
    { name: '12:00', value: 30000 },
    { name: '16:00', value: 28000 },
    { name: '20:00', value: 22000 },
    { name: '24:00', value: 20124 },
  ];

  const consumptionData = [
    { region: 'north', percentage: 60, consumed: 92482, efficiency: 'Good' },
    { region: 'south', percentage: 55, consumed: 87321, efficiency: 'Average' },
    { region: 'east', percentage: 68, consumed: 105673, efficiency: 'Excellent' },
    { region: 'west', percentage: 72, consumed: 298456, efficiency: 'Excellent' },
    { region: 'kigali', percentage: 58, consumed: 98234, efficiency: 'Good' },
  ];

  const recentUsers = [
    { id: 1, name: 'Jean Baptiste', email: 'jean@example.com', region: 'Kigali', joinDate: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Marie Claire', email: 'marie@example.com', region: 'North', joinDate: '2024-01-14', status: 'Active' },
    { id: 3, name: 'Paul Rwagasore', email: 'paul@example.com', region: 'South', joinDate: '2024-01-13', status: 'Pending' },
    { id: 4, name: 'Grace Uwimana', email: 'grace@example.com', region: 'East', joinDate: '2024-01-12', status: 'Active' },
    { id: 5, name: 'David Nkurunziza', email: 'david@example.com', region: 'West', joinDate: '2024-01-11', status: 'Active' },
  ];

  const regionAssets = {
    north: { icon: NorthIcon, color: '#FCD34D', btn: 'bg-yellow-200 hover:bg-yellow-300 text-yellow-800', text: 'text-yellow-500' },
    south: { icon: SouthIcon, color: '#60A5FA', btn: 'bg-blue-200 hover:bg-blue-300 text-blue-800', text: 'text-blue-500' },
    east: { icon: EastIcon, color: '#FB923C', btn: 'bg-orange-200 hover:bg-orange-300 text-orange-800', text: 'text-orange-500' },
    west: { icon: WestIcon, color: '#22C55E', btn: 'bg-green-200 hover:bg-green-300 text-green-800', text: 'text-green-500' },
    kigali: { icon: KigaliIcon, color: '#A855F7', btn: 'bg-purple-200 hover:bg-purple-300 text-purple-800', text: 'text-purple-500' },
  };

  return (
    <MainLayout title="User Management">
      <div className="p-0 bg-[#F8F9FA] min-h-screen">
        {/* Top region cards */}
        <div className="flex gap-4 px-8 pt-8">
          {regions.map(region => (
            <div key={region.id} className="flex-1 bg-white rounded-2xl shadow flex flex-col items-center py-4 px-2 min-w-[120px] max-w-[180px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: `${regionAssets[region.id].color}33` }}>
                  <img src={regionAssets[region.id].icon} alt={region.name} className="w-5 h-5" />
                </span>
                <span className={`font-semibold ${regionAssets[region.id].text}`}>{region.name}</span>
              </div>
              <div className="text-2xl font-bold text-black mb-1">{region.users.replace('k', 'k')}</div>
              <div className="text-xs text-gray-400 mb-2">Users</div>
              <button className={`rounded-full px-4 py-1 text-xs font-semibold text-white ${regionAssets[region.id].btn} transition`}>View users</button>
            </div>
          ))}
        </div>
        {/* Consumed water chart */}
        <div className="bg-white rounded-2xl shadow mt-8 mx-8 px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold">Consumed water</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold shadow-sm">D</button>
              <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold">M</button>
              <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold">Y</button>
            </div>
          </div>
          <div className="flex items-end gap-4 h-48 mt-4 mb-2 px-2" style={{minHeight: '180px'}}>
            {/* 12 bars for months Jan-Dec, all same style, value inside bar */}
            {[
              {label: 'Jan', value: 20},
              {label: 'Feb', value: 28},
              {label: 'Mar', value: 32},
              {label: 'Apr', value: 20},
              {label: 'May', value: 20},
              {label: 'Jun', value: 20},
              {label: 'Jul', value: 100},
              {label: 'Aug', value: 40},
              {label: 'Sep', value: 0},
              {label: 'Oct', value: 18},
              {label: 'Nov', value: 22},
              {label: 'Dec', value: 26},
            ].map((bar, idx) => (
              <div key={bar.label} className="flex flex-col items-center">
                <div className="relative flex items-end justify-center w-10" style={{height: `${bar.value * 1.2 + 30}px`}}>
                  <div className="w-10 h-full bg-blue-400 border border-white rounded-t-lg shadow-sm flex items-end justify-center" style={{minHeight: '40px'}}>
                    <span className="text-xs font-semibold text-white mb-2" style={{position: 'absolute', bottom: '8px', left: 0, right: 0, textAlign: 'center'}}>
                      {bar.value === 0 ? '0' : (bar.value === 100 ? '100k litres' : '20k litres')}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{bar.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <svg width="24" height="24" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C12 2 7 8.5 7 13a5 5 0 0 0 10 0c0-4.5-5-11-5-11z"/><circle cx="12" cy="17" r="1"/></svg>
            <span className="text-base font-semibold">1M litres</span>
            <span className="text-sm text-gray-500">consumed water</span>
          </div>
        </div>
        {/* Regional consumption breakdown */}
        <div className="bg-white rounded-2xl shadow mt-8 mx-8 px-8 py-6">
          <div className="flex items-center mb-6">
            <span className="text-lg font-semibold">Consumed water</span>
          </div>
          <div className="flex gap-4">
            {regions.map((region, idx) => (
              <div key={region.id} className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full" style={{ background: `${regionAssets[region.id].color}33` }}>
                    <img src={regionAssets[region.id].icon} alt={region.name} className="w-5 h-5" />
                  </span>
                  <span className={`font-semibold ${regionAssets[region.id].text}`}>{region.name}</span>
                </div>
                <div className="relative w-16 h-16 mb-2">
                  <svg width="64" height="64">
                    <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                    <circle cx="32" cy="32" r="28" stroke={regionAssets[region.id].color} strokeWidth="8" fill="none" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={(1 - 0.6) * 2 * Math.PI * 28} style={{ transition: 'stroke-dashoffset 0.5s' }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-black">60%</span>
                  </div>
                </div>
                <div className="text-lg font-bold text-black">92,482</div>
                <div className="text-xs text-gray-400">liters consumed</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
