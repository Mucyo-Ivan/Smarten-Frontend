
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { ChevronDown, AlertCircle, CheckCircle, Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAllLeaks, getInvestigatingLeaks, resolveLeakage, getRecentLeakageProvince } from '@/services/api.js';
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
  { id: 'north', name: 'Northern', icon: NorthIcon, color: '#FCD34D' },
  { id: 'south', name: 'Southern', icon: SouthIcon, color: '#60A5FA' },
  { id: 'east', name: 'Eastern', icon: EastIcon, color: '#FB923C' },
  { id: 'west', name: 'Western', icon: WestIcon, color: '#22C55E' },
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
      pressureDrop: 20,
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
      pressureDrop: 15,
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
      pressureDrop: 10,
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
      pressureDrop: 25,
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
      pressureDrop: 30,
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


const Leakage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState('north');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [status, setStatus] = useState('Investigating');
  const [editResolved, setEditResolved] = useState(false);
  const [showResolvedForm, setShowResolvedForm] = useState(false);
  const [resolvedForm, setResolvedForm] = useState({
    date: '',
    plumber: '',
    note: '',
  });
  const [resolvedData, setResolvedData] = useState({
    date: '',
    plumber: '',
    note: '',
  });
  const [resolvedErrors, setResolvedErrors] = useState({ date: '', plumber: '', note: '' });
  const [resolvedFeedback, setResolvedFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLeakResolved, setIsLeakResolved] = useState(false);
  const [showResolvePopup, setShowResolvePopup] = useState(false);
  const [selectedLeakForResolve, setSelectedLeakForResolve] = useState(null);

  // Get the province name for the API call
  const getProvinceName = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    return region?.name || 'Northern';
  };

  // State for leakage data (following control page pattern)
  const [leakageData, setLeakageData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalLeaks, setTotalLeaks] = useState(0);
  // History pagination (6 per page)
  const [historyPage, setHistoryPage] = useState(1);
  const HISTORY_PAGE_SIZE = 6;
  const totalHistoryPages = Math.max(1, Math.ceil(leakageData.length / HISTORY_PAGE_SIZE));
  const historyStartIndex = (historyPage - 1) * HISTORY_PAGE_SIZE;
  const historyEndIndex = historyStartIndex + HISTORY_PAGE_SIZE;
  const paginatedHistory = leakageData.slice(historyStartIndex, historyEndIndex);

  // State for investigating leaks data
  const [investigatingLeaks, setInvestigatingLeaks] = useState([]);
  const [investigatingLoading, setInvestigatingLoading] = useState(false);
  const [investigatingError, setInvestigatingError] = useState('');
  const [totalInvestigating, setTotalInvestigating] = useState(0);

  // Pagination state for investigated leaks
  const [investigatedPage, setInvestigatedPage] = useState(1);
  const INVESTIGATED_PAGE_SIZE = 4;
  const totalInvestigatedPages = Math.max(1, Math.ceil(investigatingLeaks.length / INVESTIGATED_PAGE_SIZE));
  const investigatedStartIndex = (investigatedPage - 1) * INVESTIGATED_PAGE_SIZE;
  const investigatedEndIndex = investigatedStartIndex + INVESTIGATED_PAGE_SIZE;
  const paginatedInvestigated = investigatingLeaks.slice(investigatedStartIndex, investigatedEndIndex);

  // State for main leakage detection card (real-time data)
  const [mainLeakageData, setMainLeakageData] = useState({
    date: '',
    time: '',
    waterLoss: 0,
    location: '',
    severity: '',
    action: false,
    status: 'Investigating'
  });
  // Currently selected leak details (to show in main card)
  const [selectedLeak, setSelectedLeak] = useState<{ id?: number; date?: string; time?: string; waterLoss?: number; location?: string; severity?: string; status?: string } | null>(null);
  const [selectedLeakId, setSelectedLeakId] = useState<number | null>(null);

  // Helper: format yyyy-mm-dd to dd-mm-yyyy
  const formatToDDMMYYYY = (value: string) => {
    if (!value) return '';
    const [yyyy, mm, dd] = value.split('-');
    return `${dd}-${mm}-${yyyy}`;
  };

  // Helper: apply a leak to the main left card UI
  const applyLeakToMainCard = (leak: any) => {
    if (!leak) {
      // Reset to default state if no leak provided
      setMainLeakageData({
        date: '',
        time: '',
        waterLoss: 0,
        location: '',
        severity: '',
        action: false,
        status: 'Investigating'
      });
      setSelectedLeakId(null);
      return;
    }
    
    const [d, t, period] = leak.time.split(' ');
    setMainLeakageData({
      date: d,
      time: `${t} ${period || ''}`.trim(),
      waterLoss: Number(leak.waterLost),
      location: leak.location,
      severity: leak.severity === 'HIGH' ? 'High' : leak.severity === 'LOW' ? 'Low' : 'Medium',
      action: true, // Set to true when a leak is detected
      status: 'Investigating'
    });
    setSelectedLeakId(leak.id);
  };

  // Handle resolve button click
  const handleResolveClick = (leak: any, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the row click event
    setSelectedLeakForResolve(leak);
    setShowResolvePopup(true);
  };
  // Fetch leakage data (following control page pattern)
  useEffect(() => {
    const fetchLeakageData = async () => {
      try {
        setDataLoading(true);
        setError('');
        const res = await getAllLeaks(getProvinceName(selectedRegion));
        console.log("Received Leakage Data ", res.data);
        
        // Process the data to match frontend format
        const processedData = res.data.leaks.map(leak => ({
          id: leak.leak_id,
          time: formatDateTime(leak.occurred_at),
          location: leak.location,
          waterLost: `${leak.water_lost_litres.toFixed(2)}L`,
          status: mapStatus(leak.status),
          severity: leak.severity,
          occurredAt: leak.occurred_at,
          district: leak.esp_device.district,
          village: leak.esp_device.village
        }));
        
        setLeakageData(processedData);
        setTotalLeaks(res.data.total_leaks);
        
        // Don't update main card here - let the recent leakage fetch handle it
      } catch (err) {
        setError(err.message || 'Failed to fetch leakage data');
        console.log("Failed to fetch leakage data", err.message);
        // Set mock data as fallback
        setLeakageData(getMockLeakageData(selectedRegion));
        setTotalLeaks(getMockLeakageData(selectedRegion).length);
      } finally {
        setDataLoading(false);
      }
    };
    
    fetchLeakageData();
  }, [selectedRegion]);

  // Fetch recent leakage for the selected province
  useEffect(() => {
    const fetchRecentLeakageProvince = async () => {
      try {
        const res = await getRecentLeakageProvince(getProvinceName(selectedRegion));
        console.log("Received Recent Leakage Province Data ", res.data);
        
        if (res.data.leak) {
          const leak = res.data.leak;
          const occurredDate = new Date(leak.occurred_at);
          const [day, month, year] = occurredDate.toLocaleDateString('en-GB').split('/');
          const time = occurredDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
          
          setMainLeakageData({
            date: `${day}/${month}/${year}`,
            time: time,
            waterLoss: leak.water_lost_litres,
            location: leak.location,
            severity: leak.severity === 'HIGH' ? 'High' : leak.severity === 'LOW' ? 'Low' : 'Medium',
            action: true,
            status: mapStatus(leak.status)
          });
          
          setSelectedLeakId(leak.leak_id);
          setStatus(mapStatus(leak.status));
          setIsLeakResolved(mapStatus(leak.status) === 'Resolved');
        } else {
          // No leakage found for this province - reset to default state
          setMainLeakageData({
            date: '',
            time: '',
            waterLoss: 0,
            location: '',
            severity: '',
            action: false,
            status: ''
          });
          setSelectedLeakId(null);
          setStatus('Investigating');
          setIsLeakResolved(false);
        }
      } catch (err) {
        console.log("Failed to fetch recent leakage province data", err.message);
        // Reset to default state on error
        setMainLeakageData({
          date: '',
          time: '',
          waterLoss: 0,
          location: '',
          severity: '',
          action: false,
          status: ''
        });
        setSelectedLeakId(null);
        setStatus('Investigating');
        setIsLeakResolved(false);
        // Keep current data or use fallback
      }
    };
    
    fetchRecentLeakageProvince();
  }, [selectedRegion]);

  // Fetch investigating leaks data
  useEffect(() => {
    const fetchInvestigatingLeaks = async () => {
      try {
        setInvestigatingLoading(true);
        setInvestigatingError('');
        const res = await getInvestigatingLeaks(getProvinceName(selectedRegion));
        console.log("Received Investigating Leaks Data ", res.data);
        
        if (res.data.leaks) {
          // Process the data to match frontend format
          const processedData = res.data.leaks.map(leak => ({
            id: leak.leak_id,
            time: formatDateTime(leak.occurred_at),
            description: `Leakage detected in ${leak.esp_device.district}`,
            location: leak.location,
            waterLost: leak.water_lost_litres.toFixed(2),
            severity: leak.severity,
            occurredAt: leak.occurred_at,
            district: leak.esp_device.district,
            village: leak.esp_device.village
          }));
          
          setInvestigatingLeaks(processedData);
          setTotalInvestigating(res.data.total_leaks);
        }
      } catch (err) {
        setInvestigatingError(err.message || 'Failed to fetch investigating leaks data');
        console.log("Failed to fetch investigating leaks data", err.message);
        // Set mock data as fallback
        setInvestigatingLeaks(getMockInvestigatingData(selectedRegion));
        setTotalInvestigating(getMockInvestigatingData(selectedRegion).length);
      } finally {
        setInvestigatingLoading(false);
      }
    };
    
    fetchInvestigatingLeaks();
  }, [selectedRegion]);

  // Format datetime for display
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return `${day}/${month}/${year} ${displayHours}:${minutes} ${period}`;
  };

  // Map backend status to frontend status
  const mapStatus = (status) => {
    switch (status.toUpperCase()) {
      case 'INVESTIGATING':
        return 'Investigating';
      case 'RESOLVED':
        return 'Resolved';
      case 'PENDING':
        return 'Pending';
      default:
        return 'Investigating';
    }
  };

  // Mock data fallback
  const getMockLeakageData = (regionId) => {
    const mockData = {
      north: [
        {
          id: 1001,
          time: '20/09/2025 1:25 PM',
          location: 'Inshuti, Bibare, Muko, Musanze, Northern',
          waterLost: '0.08L',
          status: 'Investigating',
          severity: 'HIGH',
          occurredAt: '2025-09-20T13:25:48Z',
          district: 'Musanze',
          village: 'Inshuti'
        }
      ],
      south: [],
      east: [],
      west: [],
      kigali: []
    };
    return mockData[regionId] || [];
  };

  // Mock investigating leaks data fallback
  const getMockInvestigatingData = (regionId) => {
    const mockData = {
      north: [
        {
          id: 1001,
          time: '20/09/2025 1:25 PM',
          description: 'Leakage detected in Musanze',
          location: 'Inshuti, Bibare, Muko, Musanze, Northern',
          waterLost: '0.08L',
          severity: 'HIGH',
          occurredAt: '2025-09-20T13:25:48Z',
          district: 'Musanze',
          village: 'Inshuti'
        },
        {
          id: 1002,
          time: '20/09/2025 1:20 PM',
          description: 'Leakage detected in Nyabihu',
          location: 'Nyabihu, Western',
          waterLost: '0.05L',
          severity: 'MEDIUM',
          occurredAt: '2025-09-20T13:20:00Z',
          district: 'Nyabihu',
          village: 'Nyabihu'
        }
      ],
      south: [],
      east: [],
      west: [],
      kigali: []
    };
    return mockData[regionId] || [];
  };

  // Refetch function
  const refetch = async () => {
    // Fetch recent leakage for main card
    try {
      const res = await getRecentLeakageProvince(getProvinceName(selectedRegion));
      console.log("Refetch - Received Recent Leakage Province Data ", res.data);
      
      if (res.data.leak) {
        const leak = res.data.leak;
        const occurredDate = new Date(leak.occurred_at);
        const [day, month, year] = occurredDate.toLocaleDateString('en-GB').split('/');
        const time = occurredDate.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });
        
        setMainLeakageData({
          date: `${day}/${month}/${year}`,
          time: time,
          waterLoss: leak.water_lost_litres,
          location: leak.location,
          severity: leak.severity === 'HIGH' ? 'High' : leak.severity === 'LOW' ? 'Low' : 'Medium',
          action: true,
          status: mapStatus(leak.status)
        });
        
        setSelectedLeakId(leak.leak_id);
        setStatus(mapStatus(leak.status));
        setIsLeakResolved(mapStatus(leak.status) === 'Resolved');
      } else {
        // No leakage found for this province - reset to default state
        setMainLeakageData({
          date: '',
          time: '',
          waterLoss: 0,
          location: '',
          severity: '',
          action: false,
          status: ''
        });
        setSelectedLeakId(null);
        setStatus('Investigating');
        setIsLeakResolved(false);
      }
    } catch (err) {
      console.log("Failed to refetch recent leakage province data", err.message);
    }

    // Fetch history data
    const fetchLeakageData = async () => {
      try {
        setDataLoading(true);
        setError('');
        const res = await getAllLeaks(getProvinceName(selectedRegion));
        console.log("Received Leakage Data ", res.data);
        
        const processedData = res.data.leaks.map(leak => ({
          id: leak.leak_id,
          time: formatDateTime(leak.occurred_at),
          location: leak.location,
          waterLost: `${leak.water_lost_litres.toFixed(2)}L`,
          status: mapStatus(leak.status),
          severity: leak.severity,
          occurredAt: leak.occurred_at,
          district: leak.esp_device.district,
          village: leak.esp_device.village
        }));
        
        setLeakageData(processedData);
        setTotalLeaks(res.data.total_leaks);
      } catch (err) {
        setError(err.message || 'Failed to fetch leakage data');
        console.log("Failed to fetch leakage data", err.message);
      } finally {
        setDataLoading(false);
      }
    };
    
    await fetchLeakageData();
  };

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

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    if (newStatus === 'Resolved') {
      setShowResolvedForm(true);
      setEditResolved(false);
    } else {
      setShowResolvedForm(false);
      setEditResolved(false);
    }
  };

  const handleResolvedFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = { date: '', plumber: '', note: '' };
    if (!resolvedForm.date) errors.date = 'Date is required';
    if (!resolvedForm.plumber) errors.plumber = 'Plumber name is required';
    if (!resolvedForm.note) errors.note = 'Resolved note is required';
    setResolvedErrors(errors);
    if (errors.date || errors.plumber || errors.note) return;

    try {
      setLoading(true);
      // Determine current investigating leak id to resolve: use popup selected leak, then selected leak, then most recent
      const leakId = selectedLeakForResolve?.id || selectedLeakId || investigatingLeaks[0]?.id || leakageData[0]?.id;
      if (!leakId) throw new Error('No leakage selected to resolve');

      const payload = {
        leakage: leakId,
        resolved_date: formatToDDMMYYYY(resolvedForm.date),
        plumber_name: resolvedForm.plumber,
        resolved_note: resolvedForm.note,
      };
      const res = await resolveLeakage(payload);
      console.log('Resolved leak response', res.data);

      // Update UI immediately
      setResolvedData({
        date: payload.resolved_date,
        plumber: payload.plumber_name,
        note: payload.resolved_note,
      });
      toast({ title: 'Leak resolved', description: 'Resolved note saved successfully.' });
      setShowResolvedForm(false);
      setEditResolved(false);
      setStatus('Resolved');
      setIsLeakResolved(true);
      setResolvedForm({ date: '', plumber: '', note: '' });
      
      // Close the popup if it's open
      setShowResolvePopup(false);
      setSelectedLeakForResolve(null);
      
      // Update main leakage data to show resolved status
      setMainLeakageData(prev => ({
        ...prev,
        status: 'Resolved'
      }));

      // Refetch recent leakage province data and investigating leaks
      await Promise.all([
        (async () => {
          try {
            const res = await getRecentLeakageProvince(getProvinceName(selectedRegion));
            if (res.data.leak) {
              const leak = res.data.leak;
              const occurredDate = new Date(leak.occurred_at);
              const [day, month, year] = occurredDate.toLocaleDateString('en-GB').split('/');
              const time = occurredDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              });
              
              setMainLeakageData({
                date: `${day}/${month}/${year}`,
                time: time,
                waterLoss: leak.water_lost_litres,
                location: leak.location,
                severity: leak.severity === 'HIGH' ? 'High' : leak.severity === 'LOW' ? 'Low' : 'Medium',
                action: true,
                status: mapStatus(leak.status)
              });
              
              setSelectedLeakId(leak.leak_id);
              setStatus(mapStatus(leak.status));
            }
          } catch (err) {
            console.log("Failed to refetch recent leakage province data", err.message);
          }
        })(),
        (async () => {
          try {
            setInvestigatingLoading(true);
            const resInv = await getInvestigatingLeaks(getProvinceName(selectedRegion));
            if (resInv.data.leaks) {
              const processed = resInv.data.leaks.map((leak: any) => ({
                id: leak.leak_id,
                time: formatDateTime(leak.occurred_at),
                description: `Leakage detected in ${leak.esp_device.district}`,
                location: leak.location,
                waterLost: leak.water_lost_litres.toFixed(2),
                severity: leak.severity,
                occurredAt: leak.occurred_at,
                district: leak.esp_device.district,
                village: leak.esp_device.village
              }));
              setInvestigatingLeaks(processed);
              setTotalInvestigating(resInv.data.total_leaks);
            }
          } finally {
            setInvestigatingLoading(false);
          }
        })(),
        (async () => refetch())()
      ]);
    } catch (err) {
      console.error('Failed to save resolved leak', err);
      toast({ title: 'Failed to save', description: 'Please try again.', variant: 'destructive' as any });
    } finally {
      setLoading(false);
    }
  };

  const handleEditResolved = () => {
    setEditResolved(true);
    setShowResolvedForm(false);
    // Pre-fill form with current data
    setResolvedForm({
      date: resolvedData.date,
      plumber: resolvedData.plumber,
      note: resolvedData.note,
    });
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-32">
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
                  {/* Date and time centered - show structure always */}
                  <div className="flex flex-col items-center justify-center mb-2" style={{margin: '0 auto'}}>
                    <div className="text-xs font-semibold text-black">{mainLeakageData.date || '--'}</div>
                    <div className="text-xs text-gray-400 -mt-1 mb-2">{mainLeakageData.time || '--'}</div>
                  </div>
                  {/* Water loss centered */}
                  <div className="flex flex-col items-center justify-center mb-2" style={{margin: '0 auto'}}>
                    <div className="flex items-end gap-1">
                      <div className="text-3xl font-bold">{mainLeakageData.waterLoss || 0}</div>
                      <span className="text-base font-normal align-top mb-1">cm³</span>
                    </div>
                    <div className="text-xs text-gray-400">water lost</div>
                  </div>
                  
                  {/* Divider */}
                  <hr className="border-t border-gray-200 my-2 w-full max-w-xs mx-auto" />
                  {/* Location - show structure always */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{mainLeakageData.location || '--'}</span>
                  </div>
                  {/* Severity - show structure always */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <img src={AlertIcon} alt="Severity" className="w-4 h-4" />
                    <span className="font-medium">Severity:</span>
                    <span className="text-black font-semibold">{mainLeakageData.severity || '--'}</span>
                  </div>
                  
                  {/* Action */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <CheckCircle size={16} className="text-black" />
                    <span className="font-medium">Action:</span>
                    <span className="text-black">{mainLeakageData.action ? 'Yes' : 'No'}</span>
                  </div>
                  
                  {/* Status - show structure always */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                    <Activity size={16} className="text-black" />
                    <span className="font-medium">Status</span>
                    {mainLeakageData.status ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mainLeakageData.status === 'Resolved' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {mainLeakageData.status}
                      </span>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                </div>
                {/* Right side: Ongoing Analysis or Resolved Leakage */}
                <div className="flex-1 flex flex-col items-center justify-center p-0 relative" style={{ minWidth: 0, minHeight: 300 }}>
                  <div className={`w-full h-full transition-all duration-300 ${(status === 'Investigating' && mainLeakageData.date) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none absolute'}`}
                    style={{ position: (status === 'Investigating' && mainLeakageData.date) ? 'relative' : 'absolute' }}>
                    {(status === 'Investigating' && mainLeakageData.date) && (
                      <div className="bg-[#3B82F6] rounded-xl flex flex-col items-center justify-center mx-auto my-6 animate-fade-in" style={{maxWidth: 340, minHeight: 240, width: '100%', display: 'flex'}}>
                        <span className="text-white text-lg font-semibold mb-2 mt-8 text-center">Ongoing Analysis of<br/>Detected Leakage</span>
                        <img src={HouseSearchingCuate} alt="Ongoing Analysis" className="w-56 h-44 object-contain mb-8" />
                      </div>
                    )}
                  </div>
                  <div className={`w-full h-full transition-all duration-300 ${(status === 'Resolved' && mainLeakageData.date) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none absolute'}`}
                    style={{ position: (status === 'Resolved' && mainLeakageData.date) ? 'relative' : 'absolute' }}>
                    {(status === 'Resolved' && mainLeakageData.date && showResolvedForm) && (
                      <div className="bg-[#3B82F6] rounded-xl flex flex-col items-center justify-center mx-auto my-6 p-6 relative animate-fade-in" style={{maxWidth: 400, minHeight: 260, width: '100%', display: 'flex'}}>
                        <span className="text-white text-lg font-semibold mb-4">Resolved leakage</span>
                        <form onSubmit={handleResolvedFormSubmit} className="flex flex-col w-full gap-4 items-center">
                          <div className="flex w-full gap-4">
                            <div className="flex flex-col flex-1">
                              <label className="text-white text-sm mb-1">Date</label>
                              <input 
                                type="date" 
                                value={resolvedForm.date}
                                onChange={(e) => setResolvedForm(prev => ({ ...prev, date: e.target.value }))}
                                className="rounded-lg px-3 py-2 outline-none border-none w-full" 
                                style={{ color: resolvedForm.date ? 'white' : '#9CA3AF' }}
                                required
                              />
                              {resolvedErrors.date && <span className="text-red-300 text-xs mt-1">{resolvedErrors.date}</span>}
                            </div>
                            <div className="flex flex-col flex-1">
                              <label className="text-white text-sm mb-1">Plumber</label>
                              <input 
                                type="text" 
                                placeholder="Plumber name" 
                                value={resolvedForm.plumber}
                                onChange={(e) => setResolvedForm(prev => ({ ...prev, plumber: e.target.value }))}
                                className="rounded-lg px-3 py-2 outline-none border-none w-full" 
                                required
                              />
                              {resolvedErrors.plumber && <span className="text-red-300 text-xs mt-1">{resolvedErrors.plumber}</span>}
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <label className="text-white text-sm mb-1">Resolved note</label>
                            <textarea 
                              placeholder="Write text here..." 
                              value={resolvedForm.note}
                              onChange={(e) => setResolvedForm(prev => ({ ...prev, note: e.target.value }))}
                              className="rounded-lg px-3 py-2 outline-none border-none w-full min-h-[80px]" 
                              required
                            />
                            {resolvedErrors.note && <span className="text-red-300 text-xs mt-1">{resolvedErrors.note}</span>}
                          </div>
                          <button type="submit" className="bg-[#0EA5E9] text-white font-semibold rounded-lg px-8 py-2 mt-2 self-center">Save</button>
                        </form>
                      </div>
                    )}
                    {(status === 'Resolved' && mainLeakageData.date && !showResolvedForm && !editResolved) && (
                      <div className="bg-[#338CF5] rounded-xl p-6 pb-14 relative flex flex-col gap-3 w-full max-w-md mx-auto animate-fade-in" style={{minHeight: 240, marginTop: 24, marginBottom: 24}}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-base font-semibold">Resolved leakage</span>
                          <button
                            className="h-8 w-8 p-0 flex items-center justify-center hover:bg-blue-400 rounded-full transition"
                            onClick={handleEditResolved}
                            title="Edit"
                          >
                            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                          </button>
                        </div>
                        <div className="flex flex-row gap-8 mb-4">
                          <div>
                            <div className="text-xs text-white font-semibold">Date</div>
                            <div className="text-base text-black">{resolvedData.date}</div>
                          </div>
                          <div>
                            <div className="text-xs text-white font-semibold">Plumber</div>
                            <div className="text-base text-white/80">{resolvedData.plumber}</div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <div className="text-xs text-white font-semibold mb-1">Resolved note</div>
                          <div className="text-sm leading-snug text-white/80">{resolvedData.note}</div>
                        </div>
                        <div className="absolute bottom-3 right-4 flex items-center gap-2 opacity-25 select-none pointer-events-none">
                          <img src={SuccessIcon} alt="Success" className="h-8 w-auto" />
                          <span className="text-white text-4xl font-extrabold tracking-wide">Success</span>
                        </div>
                      </div>
                    )}
                    {(status === 'Resolved' && mainLeakageData.date && editResolved) && (
                      <div className="bg-[#3B82F6] rounded-xl flex flex-col items-center justify-center mx-auto my-6 p-6 relative animate-fade-in" style={{maxWidth: 400, minHeight: 260, width: '100%', display: 'flex'}}>
                        <span className="text-white text-lg font-semibold mb-4">Resolved leakage</span>
                        <form onSubmit={handleResolvedFormSubmit} className="flex flex-col w-full gap-4 items-center">
                          <div className="flex w-full gap-4">
                            <div className="flex flex-col flex-1">
                              <label className="text-white text-sm mb-1">Date</label>
                              <input 
                                type="date" 
                                value={resolvedForm.date}
                                onChange={(e) => setResolvedForm(prev => ({ ...prev, date: e.target.value }))}
                                className="rounded-lg px-3 py-2 outline-none border-none w-full" 
                                style={{ color: resolvedForm.date ? 'white' : '#9CA3AF' }}
                                required
                              />
                              {resolvedErrors.date && <span className="text-red-300 text-xs mt-1">{resolvedErrors.date}</span>}
                            </div>
                            <div className="flex flex-col flex-1">
                              <label className="text-white text-sm mb-1">Plumber</label>
                              <input 
                                type="text" 
                                placeholder="Plumber name" 
                                value={resolvedForm.plumber}
                                onChange={(e) => setResolvedForm(prev => ({ ...prev, plumber: e.target.value }))}
                                className="rounded-lg px-3 py-2 outline-none border-none w-full" 
                                required
                              />
                              {resolvedErrors.plumber && <span className="text-red-300 text-xs mt-1">{resolvedErrors.plumber}</span>}
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <label className="text-white text-sm mb-1">Resolved note</label>
                            <textarea 
                              placeholder="Write text here..." 
                              value={resolvedForm.note}
                              onChange={(e) => setResolvedForm(prev => ({ ...prev, note: e.target.value }))}
                              className="rounded-lg px-3 py-2 outline-none border-none w-full min-h-[80px]" 
                              required
                            />
                            {resolvedErrors.note && <span className="text-red-300 text-xs mt-1">{resolvedErrors.note}</span>}
                          </div>
                          <button type="submit" className="bg-[#0EA5E9] text-white font-semibold rounded-lg px-8 py-2 mt-2 self-center">Save</button>
                        </form>
                      </div>
                    )}
                  </div>
                  
                  {/* No Leakage State - Only show when there's no active leakage */}
                  <div className={`w-full h-full transition-all duration-300 ${(!mainLeakageData.action || mainLeakageData.status === '' || !mainLeakageData.date) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none absolute'}`}
                    style={{ position: (!mainLeakageData.action || mainLeakageData.status === '' || !mainLeakageData.date) ? 'relative' : 'absolute' }}>
                    {(!mainLeakageData.action || mainLeakageData.status === '' || !mainLeakageData.date) && (
                      <div className="bg-[#3B82F6] rounded-xl flex flex-col items-center justify-center mx-auto my-6 animate-fade-in" style={{maxWidth: 340, minHeight: 240, width: '100%', display: 'flex'}}>
                        <span className="text-white text-lg font-semibold mb-2 mt-8 text-center">No Leakage Detected<br/>in {getProvinceName(selectedRegion)}</span>
                        <img 
                          src="/Smarten Assets/assets/No data-cuate.svg" 
                          alt="No leakage detected" 
                          className="w-48 h-36 object-contain mb-8" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* History full-width, Investigated leaks below full-width */}
          <div className="w-full max-w-5xl mx-auto mt-8 flex flex-col gap-6">
          <div className="w-full">
            <div className="bg-white rounded-xl shadow p-6 w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base">History</span>
                  {totalLeaks > 0 && (
                    <span className="text-xs text-gray-500">({totalLeaks} leaks)</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={refetch}
                    disabled={dataLoading}
                    className="text-sm text-blue-500 px-2 py-1 h-auto"
                  >
                    <RefreshCw className={`w-4 h-4 mr-1 ${dataLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  {/* Reset to page 1 on manual refresh */}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setHistoryPage(1);
                      const provinceName = getProvinceName(selectedRegion);
                      navigate(`/leakage/history?province=${encodeURIComponent(provinceName)}`);
                    }}
                    className="text-sm text-blue-500 px-2 py-1 h-auto"
                  >
                    See more
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
                  <span className="text-sm">Failed to load data</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={refetch}
                    className="mt-2"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              ) : leakageData.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[120px] text-gray-400">
                  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                  <span className="mt-2">No leakage history available for {getProvinceName(selectedRegion)}.</span>
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
                  {paginatedHistory.map((row, i) => (
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
              )}
              {/* Pagination controls */}
              {leakageData.length > HISTORY_PAGE_SIZE && (
                <div className="flex items-center justify-center gap-3 mt-4 select-none">
                  <button
                    className={`px-2 py-1 text-sm ${historyPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                    onClick={() => historyPage > 1 && setHistoryPage(1)}
                    disabled={historyPage === 1}
                    aria-label="First page"
                  >
                    «
                  </button>
                  <button
                    className={`px-2 py-1 text-sm ${historyPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                    onClick={() => historyPage > 1 && setHistoryPage(historyPage - 1)}
                    disabled={historyPage === 1}
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalHistoryPages }).slice(0, 5).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === historyPage;
                    return (
                      <button
                        key={pageNum}
                        className={`min-w-[28px] h-7 rounded-md text-sm font-medium ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setHistoryPage(pageNum)}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    className={`px-2 py-1 text-sm ${historyPage === totalHistoryPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                    onClick={() => historyPage < totalHistoryPages && setHistoryPage(historyPage + 1)}
                    disabled={historyPage === totalHistoryPages}
                    aria-label="Next page"
                  >
                    ›
                  </button>
                  <button
                    className={`px-2 py-1 text-sm ${historyPage === totalHistoryPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                    onClick={() => historyPage < totalHistoryPages && setHistoryPage(totalHistoryPages)}
                    disabled={historyPage === totalHistoryPages}
                    aria-label="Last page"
                  >
                    »
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="bg-white rounded-xl shadow p-6 min-h-[260px] flex flex-col w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base">Investigated leaks</span>
                <span className="text-xs text-gray-500">{totalInvestigating}</span>
              </div>
              {investigatingLoading ? (
                <div className="flex items-center justify-center min-h-[100px]">
                  <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                </div>
              ) : investigatingError ? (
                <div className="flex flex-col items-center justify-center min-h-[100px] text-red-400">
                  <AlertCircle className="w-8 h-8 mb-2" />
                  <span className="text-sm">Failed to load data</span>
                </div>
              ) : investigatingLeaks.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[100px] text-gray-400">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
                  <span className="mt-2">No investigating leaks for {getProvinceName(selectedRegion)}.</span>
                </div>
              ) : (
                <div className="flex flex-col gap-4 mt-2 overflow-y-auto" style={{maxHeight: 220}}>
                  {paginatedInvestigated.map((item, idx) => (
                    <div key={item.id} className="flex items-start gap-2 cursor-pointer" onClick={() => {
                      setSelectedLeakId(item.id);
                      // Populate main card from clicked investigated leak
                      setStatus('Investigating');
                      setShowResolvedForm(false);
                      setEditResolved(false);
                      // Map details to the left card data
                      const [d, t, period] = item.time.split(' ');
                      currentData.leakageData.date = d;
                      currentData.leakageData.time = `${t} ${period || ''}`.trim();
                      currentData.leakageData.waterLoss = Number(item.waterLost);
                      currentData.leakageData.location = item.location;
                      currentData.leakageData.severity = item.severity === 'HIGH' ? 'High' : item.severity === 'LOW' ? 'Low' : 'Medium';
                      currentData.leakageData.status = 'Investigating';
                    }}>
                      <div className="flex flex-col items-center mr-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        {idx !== paginatedInvestigated.length - 1 && <div className="h-6 w-0.5 bg-blue-200 mx-auto mt-1"></div>}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{item.time}</p>
                        <p className="text-sm text-gray-900">{item.description}</p>
                      </div>
                      {item.status === 'Investigating' && (
                        <Button 
                          variant="link" 
                          className="text-blue-500 text-xs px-0 py-0 h-auto ml-2"
                          onClick={(e) => handleResolveClick(item, e)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {investigatingLeaks.length > INVESTIGATED_PAGE_SIZE && (
                <div className="flex items-center justify-center gap-3 mt-4 select-none">
                  <button
                    className={`px-2 py-1 text-sm ${investigatedPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                    onClick={() => investigatedPage > 1 && setInvestigatedPage(1)}
                    disabled={investigatedPage === 1}
                    aria-label="First page"
                  >
                    «
                  </button>
                  <button
                    className={`px-2 py-1 text-sm ${investigatedPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                    onClick={() => investigatedPage > 1 && setInvestigatedPage(investigatedPage - 1)}
                    disabled={investigatedPage === 1}
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalInvestigatedPages }).slice(0, 7).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === investigatedPage;
                    return (
                      <button
                        key={pageNum}
                        className={`min-w-[28px] h-7 rounded-md text-sm font-medium ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setInvestigatedPage(pageNum)}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    className={`px-2 py-1 text-sm ${investigatedPage === totalInvestigatedPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                    onClick={() => investigatedPage < totalInvestigatedPages && setInvestigatedPage(investigatedPage + 1)}
                    disabled={investigatedPage === totalInvestigatedPages}
                    aria-label="Next page"
                  >
                    ›
                  </button>
                  <button
                    className={`px-2 py-1 text-sm ${investigatedPage === totalInvestigatedPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-black'}`}
                    onClick={() => investigatedPage < totalInvestigatedPages && setInvestigatedPage(totalInvestigatedPages)}
                    disabled={investigatedPage === totalInvestigatedPages}
                    aria-label="Last page"
                  >
                    »
                  </button>
                </div>
              )}
              {investigatingLeaks.length > INVESTIGATED_PAGE_SIZE && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setInvestigatedPage(1);
                    const provinceName = getProvinceName(selectedRegion);
                    navigate(`/leakage/investigated?province=${encodeURIComponent(provinceName)}`);
                  }}
                  className="text-sm text-blue-500 px-2 py-1 h-auto"
                >
                  See more
                </Button>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Resolve Popup Modal */}
      {showResolvePopup && selectedLeakForResolve && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Resolve Leakage</h3>
              <button
                onClick={() => setShowResolvePopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Leakage Details */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Time:</span>
                  <p className="text-gray-900">{selectedLeakForResolve.time}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Location:</span>
                  <p className="text-gray-900">{selectedLeakForResolve.location}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Water Lost:</span>
                  <p className="text-gray-900">{selectedLeakForResolve.waterLost}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Severity:</span>
                  <p className="text-gray-900">{selectedLeakForResolve.severity}</p>
                </div>
              </div>
            </div>

            {/* Resolve Form */}
            <form onSubmit={handleResolvedFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resolved Date
                </label>
                <input
                  type="date"
                  value={resolvedForm.date}
                  onChange={(e) => setResolvedForm({...resolvedForm, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {resolvedErrors.date && <p className="text-red-500 text-xs mt-1">{resolvedErrors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plumber Name
                </label>
                <input
                  type="text"
                  value={resolvedForm.plumber}
                  onChange={(e) => setResolvedForm({...resolvedForm, plumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter plumber name"
                  required
                />
                {resolvedErrors.plumber && <p className="text-red-500 text-xs mt-1">{resolvedErrors.plumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resolved Note
                </label>
                <textarea
                  value={resolvedForm.note}
                  onChange={(e) => setResolvedForm({...resolvedForm, note: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter resolution details"
                  required
                />
                {resolvedErrors.note && <p className="text-red-500 text-xs mt-1">{resolvedErrors.note}</p>}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowResolvePopup(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Resolving...' : 'Resolve Leakage'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Leakage;