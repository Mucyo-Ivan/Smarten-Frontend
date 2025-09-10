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
    espId: '',
    espName: '',
    location: '',
    province: 'Kigali City',
    latitude: '',
    longitude: ''
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
    'Kigali City',
    'Northern Province',
    'Southern Province', 
    'Eastern Province',
    'Western Province'
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/closeup-industrial-pipelines.png)'
        }}
      />
      
      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2">
              <SmartenLogo className="w-8 h-8" />
              <span className="text-2xl font-bold text-white">SMARTEN</span>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Register ESP</h1>
              <div className="w-full h-px bg-white bg-opacity-30"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ESP ID */}
              <div>
                <Label htmlFor="espId" className="text-white text-sm font-medium">
                  ESP ID
                </Label>
                <Input
                  id="espId"
                  type="text"
                  placeholder="Enter ESP ID"
                  value={formData.espId}
                  onChange={(e) => handleInputChange('espId', e.target.value)}
                  className="mt-1 bg-white bg-opacity-90 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* ESP Name */}
              <div>
                <Label htmlFor="espName" className="text-white text-sm font-medium">
                  ESP Name
                </Label>
                <Input
                  id="espName"
                  type="text"
                  placeholder="Enter ESP Name"
                  value={formData.espName}
                  onChange={(e) => handleInputChange('espName', e.target.value)}
                  className="mt-1 bg-white bg-opacity-90 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-white text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter Location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="mt-1 bg-white bg-opacity-90 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Province */}
              <div>
                <Label htmlFor="province" className="text-white text-sm font-medium">
                  Province
                </Label>
                <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                  <SelectTrigger className="mt-1 bg-white bg-opacity-90 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select Province" />
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

              {/* Latitude */}
              <div>
                <Label htmlFor="latitude" className="text-white text-sm font-medium">
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  type="text"
                  placeholder="Enter Latitude"
                  value={formData.latitude}
                  onChange={(e) => handleInputChange('latitude', e.target.value)}
                  className="mt-1 bg-white bg-opacity-90 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Longitude */}
              <div>
                <Label htmlFor="longitude" className="text-white text-sm font-medium">
                  Longitude
                </Label>
                <Input
                  id="longitude"
                  type="text"
                  placeholder="Enter Longitude"
                  value={formData.longitude}
                  onChange={(e) => handleInputChange('longitude', e.target.value)}
                  className="mt-1 bg-white bg-opacity-90 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register ESP'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterESP;
