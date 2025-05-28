
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SmartenLogo from '@/components/ui/SmartenLogo';

const Index = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Main Content */}
      <div className={`text-center z-10 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-2">
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center" style={{ marginRight: '-2px' }}>
              <SmartenLogo className="w-14 h-14" />
            </div>
            <span className="text-3xl font-extrabold tracking-tight text-[#0052a9]" style={{ fontWeight: 900, letterSpacing: '-0.5px', position: 'relative', top: '1px' }}>SMARTEN</span>
          </div>
          
          {/* Title and Subtitle */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">Smart Water Management</p>
            <p className="text-sm text-gray-600">Smart Lives</p>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-8">
          <Button 
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 text-sm rounded-md transition-all duration-300 ease-out"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Wave Background - Exact match from Figma */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="#e6f2ff" 
            d="M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,261.3C672,267,768,245,864,240C960,235,1056,245,1152,245.3C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path 
            fill="#b3d9ff" 
            d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,186.7C672,192,768,192,864,186.7C960,181,1056,171,1152,176C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <path 
            fill="#60a5fa"
            d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,218.7C672,213,768,235,864,240C960,245,1056,235,1152,224C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Index;
