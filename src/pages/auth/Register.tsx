
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {registerCompany} from '@/services/api.js';
import SmartenLogo from '@/components/ui/SmartenLogo';


interface FormData {
  name: string;
  email: string;
  registration_number: string;
  password: string;
  phone:number;
  
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
      name : "",
      email:"",
      registration_number:"",
      password:"",
      phone:0,
  })

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
  
    try {
    const res = await registerCompany(formData);
    setSuccess("✅ Registered successfully! Please check your email.");
    console.log("Response:", res.data);
    toast({
      title: "Account created",
      description: "Your account has been created successfully",
    });
   
    setTimeout(() => {
      navigate("/login");
    }, 1000);

    }
    catch (error) {
      setError(error.response?.data?.message || "❌ Registration failed");
      toast({
        title: "Registration failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }
    finally {
      setIsLoading(false);
    }



  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-start mb-6">
          <div className="flex items-center" style={{ marginRight: '4px' }}>
            <SmartenLogo className="w-8 h-8" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#0052a9]" style={{ fontWeight: 900, letterSpacing: '-0.5px', position: 'relative', top: '1px' }}>SMARTEN</span>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-blue-500 mb-1">Register</h1>
          <p className="text-sm text-gray-600">Please provide your credentials</p>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button variant="outline" className="flex items-center justify-center gap-2 h-10 border-gray-300 rounded-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-xs">Sign up with Google</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2 h-10 border-gray-300 rounded-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="black">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="text-xs">Sign up with apple</span>
          </Button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">
              Business Name*
            </label>
            <Input
              id="BusinessName"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="WASAC"
              className="w-full h-10 px-3 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
              Business email*
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="e.g. wasac@gmail.com"
              className="w-full h-10 px-3 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
              Business phone Number*
            </label>
            <Input
              id="phone"
              type="tel"
              name="phone"
              onChange={handleChange}
              placeholder="e.g. +250 7XXXXXXXX"
              className="w-full h-10 px-3 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="birthdate" className="block text-xs font-medium text-gray-700 mb-1">
              Business Registration Number*
            </label>
            <Input
              id="registration_number"
              type="text"
              name="registration_number"
              onChange={handleChange}
              // placeholder="DD/MM/YY"
              className="w-full h-10 px-3 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>


          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
              Password*
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name='password'
                onChange={handleChange}
                className="w-full h-10 px-3 pr-10 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
           
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md text-sm"
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Have an account?{' '}
            <Link to="/login" className="text-xs font-medium text-gray-900 hover:text-gray-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
