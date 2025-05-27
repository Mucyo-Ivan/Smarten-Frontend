
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RegionIcon from '@/components/ui/RegionIcon';
import { ArrowUpRight } from 'lucide-react';

interface LeakageSummary {
  region: 'north' | 'south' | 'east' | 'west' | 'kigali';
  name: string;
  count: number;
  details: {
    district: string;
    status: 'normal' | 'underflow' | 'overflow';
    lastDetected: string;
  }[];
}

const Leakage = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const leakageSummaries: LeakageSummary[] = [
    { 
      region: 'north', 
      name: 'North', 
      count: 20, 
      details: [
        { district: 'Musanze', status: 'underflow', lastDetected: '2 hours ago' },
        { district: 'Burera', status: 'overflow', lastDetected: '1 day ago' },
        { district: 'Gakenke', status: 'normal', lastDetected: '3 days ago' }
      ]
    },
    { 
      region: 'south', 
      name: 'South', 
      count: 100, 
      details: [
        { district: 'Huye', status: 'overflow', lastDetected: '5 hours ago' },
        { district: 'Nyanza', status: 'normal', lastDetected: '12 hours ago' },
        { district: 'Gisagara', status: 'underflow', lastDetected: '2 days ago' }
      ]
    },
    { 
      region: 'east', 
      name: 'East', 
      count: 150, 
      details: [
        { district: 'Rwamagana', status: 'underflow', lastDetected: '3 hours ago' },
        { district: 'Kayonza', status: 'normal', lastDetected: '1 day ago' },
        { district: 'Kirehe', status: 'overflow', lastDetected: '4 days ago' }
      ]
    },
    { 
      region: 'west', 
      name: 'West', 
      count: 400, 
      details: [
        { district: 'Karongi', status: 'overflow', lastDetected: '6 hours ago' },
        { district: 'Rubavu', status: 'underflow', lastDetected: '8 hours ago' },
        { district: 'Rusizi', status: 'normal', lastDetected: '2 days ago' }
      ]
    },
    { 
      region: 'kigali', 
      name: 'Kigali', 
      count: 400, 
      details: [
        { district: 'Kicukiro', status: 'overflow', lastDetected: '4 hours ago' },
        { district: 'Gasabo', status: 'underflow', lastDetected: '1 day ago' },
        { district: 'Nyarugenge', status: 'normal', lastDetected: '3 days ago' }
      ]
    }
  ];

  const filteredSummaries = selectedStatus
    ? leakageSummaries.map(summary => ({
        ...summary,
        details: summary.details.filter(detail => 
          selectedStatus === 'all' || detail.status === selectedStatus
        )
      })).filter(summary => summary.details.length > 0)
    : leakageSummaries;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'normal': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'underflow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'overflow': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <MainLayout title="Leakage Management">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">All Leakages</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={selectedStatus === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus(null)}
              className={selectedStatus === null ? 'bg-smarten-blue' : ''}
            >
              All
            </Button>
            <Button
              variant={selectedStatus === 'overflow' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('overflow')}
              className={selectedStatus === 'overflow' ? 'bg-red-500 hover:bg-red-600' : ''}
            >
              Overflow
            </Button>
            <Button
              variant={selectedStatus === 'underflow' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('underflow')}
              className={selectedStatus === 'underflow' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
            >
              Underflow
            </Button>
            <Button
              variant={selectedStatus === 'normal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus('normal')}
              className={selectedStatus === 'normal' ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              Normal
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredSummaries.map((summary) => (
            <Card key={summary.region} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                  <RegionIcon region={summary.region} />
                  <CardTitle className="text-lg font-medium">{summary.name}</CardTitle>
                  <span className="ml-2 text-sm text-gray-500">{summary.count} leakages</span>
                </div>
                <Link to={`/leakage/${summary.region}`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    View Details
                    <ArrowUpRight size={14} />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <table className="w-full mt-3">
                  <thead>
                    <tr className="text-xs text-gray-500">
                      <th className="text-left py-2">District</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Last Detected</th>
                      <th className="text-right py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.details.map((detail, idx) => (
                      <tr key={idx} className="border-t border-gray-100 dark:border-gray-800">
                        <td className="py-3">{detail.district}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(detail.status)}`}>
                            {detail.status.charAt(0).toUpperCase() + detail.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">{detail.lastDetected}</td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm" className="h-8 text-smarten-blue hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            View Report
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Leakage;
