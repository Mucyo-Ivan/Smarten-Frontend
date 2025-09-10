import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SmartenLogo from '@/components/ui/SmartenLogo';

const RegisterESP = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    province: '',
    district: '',
    sector: '',
    cell: '',
    village: '',
    macAddress: '',
    deviceType: 'Smart Valve',
    deviceCount: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/device/register-esp/success');
    }, 2000);
  };

  const provinces = [
    'North',
    'South', 
    'East',
    'West',
    'Kigali'
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Form */}
      <div className="w-1/2 bg-white flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <SmartenLogo className="w-8 h-8" />
            <span className="text-2xl font-bold text-blue-600">SMARTEN</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 px-12 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h1 
                style={{
                  color: '#0E9CFF',
                  fontSize: 25,
                  fontWeight: '600',
                  wordWrap: 'break-word',
                  marginBottom: '8px'
                }}
              >
                Connect to Esp32
              </h1>
              <p className="text-gray-500 text-sm">Please provide accurate device credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src="/assets/star-frame.svg" alt="star" className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-black">Location</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="text-black text-sm font-medium">
                      Country*
                    </Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="e.g Rwanda"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="province" className="text-black text-sm font-medium">
                      Province*
                    </Label>
                    <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                      <SelectTrigger className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="e.g North" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="district" className="text-black text-sm font-medium">
                      District*
                    </Label>
                    <Input
                      id="district"
                      type="text"
                      placeholder="e.g Kicukiro"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sector" className="text-black text-sm font-medium">
                      Sector*
                    </Label>
                    <Input
                      id="sector"
                      type="text"
                      placeholder="e.g Kimironko"
                      value={formData.sector}
                      onChange={(e) => handleInputChange('sector', e.target.value)}
                      className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cell" className="text-black text-sm font-medium">
                      Cell*
                    </Label>
                    <Input
                      id="cell"
                      type="text"
                      placeholder="e.g Kamashashi"
                      value={formData.cell}
                      onChange={(e) => handleInputChange('cell', e.target.value)}
                      className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="village" className="text-black text-sm font-medium">
                      Village*
                    </Label>
                    <Input
                      id="village"
                      type="text"
                      placeholder="e.g Kibaya"
                      value={formData.village}
                      onChange={(e) => handleInputChange('village', e.target.value)}
                      className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ESP32 Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src="/assets/star-frame.svg" alt="star" className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-black">ESP32</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="macAddress" className="text-black text-sm font-medium">
                      Mac Address*
                    </Label>
                    <Input
                      id="macAddress"
                      type="text"
                      placeholder="e.g 01:AB:2C:AA:AA:AA"
                      value={formData.macAddress}
                      onChange={(e) => handleInputChange('macAddress', e.target.value)}
                      className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label className="text-black text-sm font-medium">
                      Select*
                    </Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="sensor"
                          name="deviceType"
                          value="Sensor"
                          checked={formData.deviceType === 'Sensor'}
                          onChange={(e) => handleInputChange('deviceType', e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor="sensor" className="text-black">Sensor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="smartValve"
                          name="deviceType"
                          value="Smart Valve"
                          checked={formData.deviceType === 'Smart Valve'}
                          onChange={(e) => handleInputChange('deviceType', e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <Label htmlFor="smartValve" className="text-black">Smart Valve</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="deviceCount" className="text-black text-sm font-medium">
                      No of Sensors/Smart valve
                    </Label>
                    <Input
                      id="deviceCount"
                      type="text"
                      placeholder="e.g 2"
                      value={formData.deviceCount}
                      onChange={(e) => handleInputChange('deviceCount', e.target.value)}
                      className="mt-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Connect Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connecting...' : 'Connect'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/closeup-industrial-pipelines.png)'
          }}
        />
        
        {/* Figma Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 104, 190, 0.50) 0%, rgba(255, 255, 255, 0.70) 100%)'
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-8" style={{ paddingTop: '18%' }}>
          <div className="text-white">
            <div 
              style={{
                width: '100%',
                color: 'white',
                fontSize: 30,
                fontFamily: 'Climate Crisis',
                fontWeight: '900',
                wordWrap: 'break-word',
                marginBottom: '2px'
              }}
            >
              SMART WATER MONITORING
            </div>
            <div 
              style={{
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontSize: 30,
                fontFamily: 'Climate Crisis',
                fontWeight: '900',
                wordWrap: 'break-word',
                marginBottom: '24px'
              }}
            >
              SMART LIVES
            </div>
            <div 
              style={{
                width: '100%',
                color: 'white',
                fontSize: 16,
                fontFamily: 'Poppins',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}
            >
              Connect your ESP32 to our system for an immersive experience in revolutionizing water management with smart, sustainable technology!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterESP;
