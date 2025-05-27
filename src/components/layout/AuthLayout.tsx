
import { ReactNode } from 'react';
import SmartenLogo from '../ui/SmartenLogo';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <div className="py-6 px-6">
        <Link to="/" className="flex items-center gap-2">
          <SmartenLogo className="w-8 h-8" />
          <span className="text-xl font-bold text-smarten-blue">SMARTEN</span>
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
          <div>
            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
      
      <footer className="py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
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
