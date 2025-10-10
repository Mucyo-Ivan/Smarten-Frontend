
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SmartenLogo from '../ui/SmartenLogo';
import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background dark-mode-transition">
      <div className="py-6 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <SmartenLogo className="w-8 h-8" />
          <span className="text-xl font-bold text-[#0052a9] dark:text-blue-400">SMARTEN</span>
        </Link>
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg shadow-sm dark-mode-transition">
          <div>
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <h2 className="text-center text-2xl font-bold text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
      
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>© SMARTEN {new Date().getFullYear()}. All rights reserved.</p>
      </footer>

      {/* Water waves for decoration */}
      <div className="fixed bottom-0 left-0 w-full overflow-hidden z-[-1]">
        <div className="splash-wave"></div>
        <div className="splash-wave"></div>
        <div className="splash-wave"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
