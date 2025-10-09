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
    <div className="min-h-screen bg-background flex flex-col dark-mode-transition">
      {/* Logo - Top Left */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <SmartenLogo className="w-8 h-8" />
          <span className="text-2xl font-extrabold" style={{ color: '#0052A9' }}>SMARTEN</span>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Success Illustration */}
        <div className="mb-6">
          <img 
            src="/assets/sucessful.png" 
            alt="Success" 
            className="w-72 h-72 object-contain"
          />
        </div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-foreground mb-3">Connected Successfully</h1>
          <p className="text-sm text-muted-foreground">Congratulations to you. You are now connected to the device.</p>
        </div>

        {/* Back Button */}
        <Button
          onClick={handleBackToDevices}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
        >
          Back to Devices
        </Button>
      </div>
    </div>
  );
};

export default RegisterESPSuccess;
