import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SmartenLogo from '@/components/ui/SmartenLogo';

const RegisterESPSuccess = () => {
  const navigate = useNavigate();

  const handleBackToDevices = () => {
    navigate('/device');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo - Top Left */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <SmartenLogo className="w-8 h-8" />
          <span className="text-2xl font-bold text-blue-600">SMARTEN</span>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Success Illustration */}
        <div className="mb-8">
          <img 
            src="/assets/sucessful.png" 
            alt="Success" 
            className="w-80 h-80 object-contain"
          />
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Connected Successfully</h1>
          <p className="text-lg text-gray-600">Congratulations to you. You are now connected to the device.</p>
        </div>

        {/* Back Button */}
        <Button
          onClick={handleBackToDevices}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
        >
          Back to Devices
        </Button>
      </div>
    </div>
  );
};

export default RegisterESPSuccess;
