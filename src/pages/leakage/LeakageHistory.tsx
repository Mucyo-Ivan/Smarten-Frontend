import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { getAllLeaks } from '@/services/api.js';

const LeakageHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const province = params.get('province') || 'Northern';

  const [leakageData, setLeakageData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalLeaks, setTotalLeaks] = useState(0);

  // Pagination state for full page (keep page size 10 for full list)
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(leakageData.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedRows = useMemo(() => leakageData.slice(startIndex, endIndex), [leakageData, startIndex, endIndex]);

  const mapStatus = (status: string) => {
    switch ((status || '').toUpperCase()) {
      case 'INVESTIGATING':
        return 'Investigating';
      case 'RESOLVED':
        return 'Resolved';
      default:
        return 'Investigating';
    }
  };

  const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const displayHours = hours.toString().padStart(2, '0');
    return `${day}/${month}/${year} ${displayHours}:${minutes} ${period}`;
  };

  const refetch = async () => {
    try {
      setDataLoading(true);
      setError('');
      const res = await getAllLeaks(province);
      const rows = (res.data?.leaks || []).map((leak: any) => ({
        id: leak.leak_id,
        time: formatDateTime(leak.occurred_at),
        location: leak.location,
        waterLost: `${leak.water_lost_litres.toFixed(2)}L`,
        status: mapStatus(leak.status),
      }));
      setLeakageData(rows);
      setTotalLeaks(res.data?.total_leaks || rows.length);
      setPage(1);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leakage history');
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province]);

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32">
        <div className="max-w-5xl mx-auto w-full mt-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">Leakage History</span>
                {totalLeaks > 0 && (
                  <span className="text-xs text-gray-500">({totalLeaks} leaks)</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => { setPage(1); refetch(); }}
                  className="text-sm text-blue-500 px-2 py-1 h-auto"
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${dataLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {dataLoading ? (
              <div className="flex items-center justify-center min-h-[120px]">
                <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center min-h-[120px] text-red-400">
                <AlertCircle className="w-8 h-8 mb-2" />
                <span className="text-sm">{error}</span>
              </div>
            ) : leakageData.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[120px] text-gray-400">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path dName="M8 12h8M12 8v8" /></svg>
                <span className="mt-2">No leakage history available for {province}.</span>
              </div>
            ) : (
              <>
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
                    {paginatedRows.map((row) => (
                      <tr key={row.id} className="border-t border-gray-100">
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

                {/* Pagination */}
                {leakageData.length > PAGE_SIZE && (
                  <div className="flex items-center justify-center gap-3 mt-4 select-none">
                    <button
                      className={`px-2 py-1 text-sm ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                      onClick={() => page > 1 && setPage(1)}
                      disabled={page === 1}
                      aria-label="First page"
                    >
                      «
                    </button>
                    <button
                      className={`px-2 py-1 text-sm ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                      onClick={() => page > 1 && setPage(page - 1)}
                      disabled={page === 1}
                      aria-label="Previous page"
                    >
                      ‹
                    </button>
                    {Array.from({ length: totalPages }).slice(0, 7).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = pageNum === page;
                      return (
                        <button
                          key={pageNum}
                          className={`min-w-[28px] h-7 rounded-md text-sm font-medium ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                          onClick={() => setPage(pageNum)}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      className={`px-2 py-1 text-sm ${page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                      onClick={() => page < totalPages && setPage(page + 1)}
                      disabled={page === totalPages}
                      aria-label="Next page"
                    >
                      ›
                    </button>
                    <button
                      className={`px-2 py-1 text-sm ${page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                      onClick={() => page < totalPages && setPage(totalPages)}
                      disabled={page === totalPages}
                      aria-label="Last page"
                    >
                      »
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LeakageHistory;


