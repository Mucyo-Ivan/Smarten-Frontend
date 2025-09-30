import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { getInvestigatingLeaks } from '@/services/api.js';

const InvestigatedLeaks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const province = params.get('province') || 'Northern';

  const [investigatingLeaks, setInvestigatingLeaks] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalInvestigating, setTotalInvestigating] = useState(0);

  // Pagination state for full page (keep page size 10 for full list)
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(investigatingLeaks.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedRows = useMemo(() => investigatingLeaks.slice(startIndex, endIndex), [investigatingLeaks, startIndex, endIndex]);

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
      const res = await getInvestigatingLeaks(province);
      const rows = (res.data?.leaks || []).map((leak: any) => ({
        id: leak.leak_id,
        time: formatDateTime(leak.occurred_at),
        location: leak.location,
        waterLost: `${leak.water_lost_litres.toFixed(2)}L`,
        status: mapStatus(leak.status),
        description: `Leakage detected in ${leak.location}`,
        severity: leak.severity,
      }));
      setInvestigatingLeaks(rows);
      setTotalInvestigating(res.data?.total_leaks || rows.length);
      setPage(1);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch investigating leaks');
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
                <span className="font-semibold text-base">Investigated Leaks</span>
                {totalInvestigating > 0 && (
                  <span className="text-xs text-gray-500">({totalInvestigating} leaks)</span>
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
            ) : investigatingLeaks.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[120px] text-gray-400">
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path dName="M8 12h8M12 8v8" /></svg>
                <span className="mt-2">No investigating leaks available for {province}.</span>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4 mt-2">
                  {paginatedRows.map((item, idx) => (
                    <div key={item.id} className="flex items-start gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex flex-col items-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        {idx !== paginatedRows.length - 1 && <div className="h-6 w-0.5 bg-blue-200 mx-auto mt-1"></div>}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{item.time}</p>
                        <p className="text-sm text-gray-900">{item.description}</p>
                        <p className="text-xs text-gray-600 mt-1">Location: {item.location}</p>
                        <p className="text-xs text-gray-600">Water Lost: {item.waterLost}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Investigating' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                          {item.status}
                        </span>
                        <Button variant="link" className="text-blue-500 text-xs px-0 py-0 h-auto">Resolve</Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {investigatingLeaks.length > PAGE_SIZE && (
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

            <div className="mt-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/leakage')}
                className="text-sm text-blue-500 px-2 py-1 h-auto"
              >
                ← Back to Leakage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InvestigatedLeaks;
