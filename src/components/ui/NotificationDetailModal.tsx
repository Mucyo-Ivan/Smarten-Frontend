import React, { useState } from 'react';
import { X, MapPin, BookOpen, Play, AlertTriangle } from 'lucide-react';
import NorthIcon from '../../../Smarten Assets/assets/North.svg';
import SouthIcon from '../../../Smarten Assets/assets/South.svg';
import EastIcon from '../../../Smarten Assets/assets/East.svg';
import WestIcon from '../../../Smarten Assets/assets/West.svg';
import KigaliIcon from '../../../Smarten Assets/assets/Kigali.svg';

interface NotificationDetailModalProps {
  notification: {
    id: number;
    type: string;
    title: string;
    time: string;
    date: string;
    new: boolean;
    icon: string;
  };
  onClose: () => void;
}

const NotificationDetailModal = ({ notification, onClose }: NotificationDetailModalProps) => {
  const [switchState, setSwitchState] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('resolved');

  const getLocationData = () => {
    // Extract location from title or use default based on notification type
    if (notification.title.includes('Musanze')) {
      return {
        province: 'Northern',
        district: 'Musanze', 
        sector: 'Kinigi'
      };
    } else if (notification.title.includes('Nyabihu')) {
      return {
        province: 'Western',
        district: 'Nyabihu',
        sector: 'Rutare'
      };
    } else if (notification.title.includes('Rwamagana')) {
      return {
        province: 'Eastern',
        district: 'Rwamagana',
        sector: 'Gishari'
      };
    } else if (notification.title.includes('Kigali')) {
      return {
        province: 'Kigali',
        district: 'Kicukiro',
        sector: 'Kamashashi'
      };
    }
    return {
      province: 'Northern',
      district: 'Musanze',
      sector: 'Kinigi'
    };
  };

  const location = getLocationData();

  const getProvinceIcon = (province: string) => {
    switch (province.toLowerCase()) {
      case 'kigali':
        return KigaliIcon;
      case 'northern':
        return NorthIcon;
      case 'southern':
        return SouthIcon;
      case 'eastern':
        return EastIcon;
      case 'western':
        return WestIcon;
      default:
        return NorthIcon;
    }
  };

  const getProvinceColor = (province: string) => {
    switch (province.toLowerCase()) {
      case 'kigali':
        return '#8B5CF6'; // Purple
      case 'northern':
        return '#FCD34D'; // Yellow
      case 'southern':
        return '#3B82F6'; // Blue
      case 'eastern':
        return '#F59E0B'; // Orange
      case 'western':
        return '#10B981'; // Green
      default:
        return '#FCD34D'; // Default yellow
    }
  };

  const handleSwitchToggle = () => {
    setSwitchState(!switchState);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-center p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black">Leakage Detected</h2>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Readings Section */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Readings</span>
            </div>
            <div className="text-3xl font-bold text-black mb-1 flex items-center justify-center gap-1">
              <span>20</span>
              <span>cm³</span>
            </div>
            <div className="text-sm text-gray-500">water lost</div>
          </div>

          {/* Location Section */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Location</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src={getProvinceIcon(location.province)} 
                  alt={location.province} 
                  className="w-8 h-8" 
                />
              </div>
              <span className="text-sm font-medium text-gray-900">{location.province}</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">{location.district}</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">{location.sector}</span>
            </div>
          </div>

          {/* Take Action Section */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Play className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Take Action</span>
            </div>
            <div className="flex justify-center">
              <div
                className={`relative w-[120px] h-[60px] rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer`}
                onClick={handleSwitchToggle}
                style={{ background: switchState ? '#D4FFE0' : '#E0E8F7' }}
              >
                <div
                  className={`absolute w-[52px] h-[52px] rounded-full flex items-center justify-center font-bold text-lg transition-transform duration-300 shadow-md ${
                    switchState ? 'translate-x-[34px]' : 'translate-x-[-34px]'
                  }`}
                  style={{
                    background: '#333333',
                    color: switchState ? '#388E3C' : '#60A5FA',
                    border: `3px solid ${switchState ? '#388E3C' : '#60A5FA'}`,
                  }}
                >
                  {switchState ? 'ON' : 'OFF'}
                </div>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Status</span>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleStatusChange('resolved')}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedStatus === 'resolved' 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-gray-300'
                }`}></div>
                <span className={`text-sm ${
                  selectedStatus === 'resolved' 
                    ? 'font-medium text-gray-900' 
                    : 'text-gray-500'
                }`}>Resolved</span>
              </div>
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleStatusChange('investigating')}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedStatus === 'investigating' 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-gray-300'
                }`}></div>
                <span className={`text-sm ${
                  selectedStatus === 'investigating' 
                    ? 'font-medium text-gray-900' 
                    : 'text-gray-500'
                }`}>Investigating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailModal;
