
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

const ProvinceControl = () => {
  const { province } = useParams();
  
  const provinceData = {
    north: { name: 'North Province', districts: ['Gicumbi', 'Musanze', 'Gakenke', 'Rulindo', 'Burera'] },
    south: { name: 'South Province', districts: ['Nyanza', 'Gisagara', 'Nyaruguru', 'Huye', 'Nyamagabe', 'Ruhango', 'Muhanga', 'Kamonyi'] },
    east: { name: 'East Province', districts: ['Rwamagana', 'Nyagatare', 'Gatsibo', 'Kayonza', 'Kirehe', 'Ngoma', 'Bugesera'] },
    west: { name: 'West Province', districts: ['Nyabihu', 'Karongi', 'Ngororero', 'Nyamasheke', 'Rubavu', 'Rusizi', 'Rutsiro'] },
    kigali: { name: 'Kigali City', districts: ['Nyarugenge', 'Gasabo', 'Kicukiro'] }
  };

  const currentProvince = provinceData[province as keyof typeof provinceData];

  const [valves, setValves] = useState(
    currentProvince?.districts.flatMap((district, districtIndex) => 
      Array.from({ length: 3 }, (_, valveIndex) => ({
        id: `valve-${districtIndex}-${valveIndex}`,
        name: `Valve ${district}-${valveIndex + 1}`,
        district,
        isOpen: Math.random() > 0.5,
        flowRate: Math.floor(Math.random() * 100) + 50,
        pressure: Math.floor(Math.random() * 50) + 30,
        status: Math.random() > 0.1 ? 'active' : 'maintenance'
      }))
    ) || []
  );

  const toggleValve = (valveId: string) => {
    setValves(prev => prev.map(valve => 
      valve.id === valveId ? { ...valve, isOpen: !valve.isOpen } : valve
    ));
  };

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/control">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentProvince?.name} Control</h1>
              <p className="text-gray-600">Manage water flow and valve operations</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Pause className="w-4 h-4" />
              Emergency Stop
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset All
            </Button>
          </div>
        </div>

        {/* Control Overview */}
        <div className="grid grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {valves.filter(v => v.isOpen).length}
                </div>
                <div className="text-sm text-gray-600">Open Valves</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {valves.filter(v => v.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Active Systems</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {Math.round(valves.reduce((sum, v) => sum + v.flowRate, 0) / valves.length)}
                </div>
                <div className="text-sm text-gray-600">Avg Flow (L/s)</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(valves.reduce((sum, v) => sum + v.pressure, 0) / valves.length)}
                </div>
                <div className="text-sm text-gray-600">Avg Pressure (kPa)</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Valve Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Valve Control Panel</CardTitle>
            <p className="text-sm text-gray-500">Control individual valves in {currentProvince?.name}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {valves.map((valve) => (
                <Card key={valve.id} className={`border-2 ${valve.isOpen ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{valve.name}</h4>
                        <p className="text-sm text-gray-500">{valve.district}</p>
                      </div>
                      <Switch
                        checked={valve.isOpen}
                        onCheckedChange={() => toggleValve(valve.id)}
                        disabled={valve.status === 'maintenance'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Flow Rate:</span>
                        <span className="font-medium">{valve.flowRate} L/s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pressure:</span>
                        <span className="font-medium">{valve.pressure} kPa</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${valve.status === 'active' ? 'text-green-600' : 'text-orange-600'}`}>
                          {valve.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Play className="w-3 h-3 mr-1" />
                          Test
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProvinceControl;
