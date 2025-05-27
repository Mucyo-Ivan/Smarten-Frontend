import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, MapPin, Droplets, Calendar } from 'lucide-react';

const UserDetail = () => {
  const { userId } = useParams();
  
  // Mock user data
  const userData = {
    "1": {
      id: 1,
      name: 'Uwera Liza',
      location: 'North > Rulindo > Base > Cyahoha > Mushongi',
      avatar: '/lovable-uploads/ea6fad60-2654-48de-9268-b834ecf28b43.png',
      totalUsers: 5398,
      totalLiters: 92482,
      esp32Count: 1900,
      dailyConsumption: 1900,
      monthlyConsumption: 1900,
      leakageDaily: 60,
      leakageMonthly: 100,
      leakageDates: {
        daily: '01/02/2025',
        monthly: '01/02/2025'
      }
    }
  };

  const user = userData[userId as keyof typeof userData] || userData["1"];

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/users">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">North</h1>
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">1.Rulindo</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{user.totalUsers.toLocaleString()}</span>
                <span className="text-gray-500">Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{user.totalLiters.toLocaleString()}</span>
                <span className="text-gray-500">liters</span>
              </div>
            </div>
          </div>
          <div className="text-gray-500">
            {user.esp32Count} esp32
          </div>
        </div>

        {/* Base Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Base</h3>
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{user.esp32Count} esp32</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-xl font-semibold mb-4">{user.name}</h4>

              {/* Consumption Data */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-semibold mb-3">Consumed Water</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily</span>
                      <span className="font-medium">{user.dailyConsumption} litres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly</span>
                      <span className="font-medium">{user.monthlyConsumption} litres</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-3">Leakage</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{user.leakageDates.daily}</span>
                      <span className="font-medium">{user.leakageDaily} litres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{user.leakageDates.monthly}</span>
                      <span className="font-medium">{user.leakageMonthly} litres</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h5 className="font-semibold mb-3">Location</h5>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">N</span>
                  </div>
                  <span>North</span>
                  <span>→</span>
                  <span>Rulindo</span>
                  <span>→</span>
                  <span>Base</span>
                  <span>→</span>
                  <span>Cyahoha</span>
                  <span>→</span>
                  <span>Mushongi</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table continues below */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">N°</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Names</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Location</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">Consumed</th>
                    <th className="text-left text-sm font-medium text-gray-500 px-4 py-3">More</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.from({ length: 10 }, (_, i) => (
                    <tr key={i + 2} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{i + 2}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {['Mugisha Patrick', 'Kaliza Joannah', 'Cyubahiro Yvan', 'Umwari Vanessa', 'Kimenyi Yves', 'Uwase Honorine', 'Muvunyi Guillain', 'Keza Louange', 'Bigwi Aloys'][i] || `User ${i + 2}`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>Cyahoha</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div>
                          <div className="font-medium">20k</div>
                          <div className="text-xs text-gray-500">litres/month</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                          View more
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 p-4 border-t">
              <Button variant="ghost" size="sm" disabled>
                &lt;
              </Button>
              <Button variant="default" size="sm" className="bg-blue-500">
                1
              </Button>
              <Button variant="ghost" size="sm">
                2
              </Button>
              <Button variant="ghost" size="sm">
                3
              </Button>
              <Button variant="ghost" size="sm">
                &gt;
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UserDetail;
