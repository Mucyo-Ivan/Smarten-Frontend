import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, CheckCircle, Activity, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { resolveLeakage, getLeakageById } from '@/services/api';
import HouseSearchingCuate from '../../../Smarten Assets/assets/House searching-cuate 1.svg';

interface LeakageResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  leakageData: any;
  onResolved: () => void;
}

const LeakageResolutionModal: React.FC<LeakageResolutionModalProps> = ({
  isOpen,
  onClose,
  leakageData,
  onResolved
}) => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<'investigating' | 'resolved'>('investigating');
  const [showResolvedForm, setShowResolvedForm] = useState(false);
  const [resolvedForm, setResolvedForm] = useState({
    date: '',
    plumber: '',
    note: '',
  });
  const [resolvedErrors, setResolvedErrors] = useState({ date: '', plumber: '', note: '' });
  const [loading, setLoading] = useState(false);
  const [detailedLeakageData, setDetailedLeakageData] = useState(null);

  // Fetch detailed leakage data when modal opens
  useEffect(() => {
    if (isOpen && leakageData?.id) {
      const fetchDetailedData = async () => {
        try {
          const response = await getLeakageById(leakageData.id);
          if (response && response.leakage) {
            setDetailedLeakageData(response.leakage);
          }
        } catch (error) {
          console.error('Failed to fetch detailed leakage data:', error);
        }
      };
      fetchDetailedData();
    }
  }, [isOpen, leakageData?.id]);

  // Handle status change
  const handleStatusChange = (status: 'investigating' | 'resolved') => {
    setSelectedStatus(status);
    if (status === 'resolved') {
      setShowResolvedForm(true);
    } else {
      setShowResolvedForm(false);
    }
  };

  // Handle resolved form submission
  const handleResolvedFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors = { date: '', plumber: '', note: '' };
    if (!resolvedForm.date) errors.date = 'Date is required';
    if (!resolvedForm.plumber.trim()) errors.plumber = 'Plumber name is required';
    if (!resolvedForm.note.trim()) errors.note = 'Resolution note is required';
    
    setResolvedErrors(errors);
    
    if (Object.values(errors).some(error => error)) {
      return;
    }

    try {
      setLoading(true);
      
      const resolutionData = {
        leakage_id: leakageData.id,
        resolved_date: resolvedForm.date,
        plumber_name: resolvedForm.plumber,
        resolution_note: resolvedForm.note,
        status: 'RESOLVED'
      };

      await resolveLeakage(resolutionData);
      
      toast({
        title: "Leakage Resolved",
        description: "The leakage has been successfully resolved.",
      });

      // Reset form
      setResolvedForm({ date: '', plumber: '', note: '' });
      setShowResolvedForm(false);
      setSelectedStatus('resolved');
      
      // Call the callback to refresh data
      onResolved();
      
      // Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 1000);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to resolve leakage.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return 'Date not available';
    try {
      const date = new Date(dateTimeString);
      return {
        date: date.toLocaleDateString('en-US', { 
          month: '2-digit', 
          day: '2-digit', 
          year: 'numeric' 
        }),
        time: date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      };
    } catch (error) {
      return { date: 'Date not available', time: 'Time not available' };
    }
  };

  if (!isOpen) return null;

  const displayData = detailedLeakageData || leakageData;
  const dateTime = formatDateTime(displayData?.occurredAt || displayData?.time || '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex">
          {/* Left side - Details */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Leakage Detection</h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">{dateTime.date}</p>
                <p className="text-sm text-gray-600">{dateTime.time}</p>
              </div>
            </div>

            {/* Water Lost */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-gray-900">
                {displayData?.water_lost_litres ? Number(displayData.water_lost_litres).toFixed(1) : 
                 displayData?.waterLost ? parseFloat(displayData.waterLost.replace('L', '')).toFixed(1) : '0.0'}
              </p>
              <p className="text-sm text-gray-600">Water Lost (L)</p>
            </div>

            {/* Location */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Location</span>
              </div>
              <p className="text-lg text-gray-900">
                {displayData?.location || 'Location not available'}
              </p>
            </div>

            {/* Severity */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-700">Severity</span>
              </div>
              <p className="text-lg font-bold text-red-600">
                {displayData?.severity || 'HIGH'}
              </p>
            </div>

            {/* Action */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Action</span>
              </div>
              <p className="text-lg text-gray-900">Yes</p>
            </div>

            {/* Status */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Status</span>
              </div>
              
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="resolved"
                    checked={selectedStatus === 'resolved'}
                    onChange={() => handleStatusChange('resolved')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Resolved</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="investigating"
                    checked={selectedStatus === 'investigating'}
                    onChange={() => handleStatusChange('investigating')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Investigating</span>
                </label>
              </div>
            </div>

            {/* Resolved Form */}
            {showResolvedForm && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Resolved Note Registration Details</h3>
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
                      onClick={() => setShowResolvedForm(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? 'Resolving...' : 'Save Resolution'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right side - Illustration */}
          <div className="w-80 bg-blue-600 rounded-r-3xl flex flex-col items-center justify-center p-8">
            <h3 className="text-white text-xl font-semibold mb-6 text-center">
              Ongoing Analysis of Detected Leakage
            </h3>
            <img 
              src={HouseSearchingCuate} 
              alt="Leakage Analysis" 
              className="w-full h-auto max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeakageResolutionModal;
