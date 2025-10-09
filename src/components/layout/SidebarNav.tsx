import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Monitor, Cpu, Settings, Users, Sliders, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import SmartenLogo from '../ui/SmartenLogo';

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        'flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 group dark-mode-transition',
        isActive && 'text-primary bg-accent font-medium'
      )}
    >
      <div className={cn(
        'transition-transform duration-200 group-hover:scale-110',
        isActive && 'scale-110'
      )}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </Link>
  );
};

const SidebarNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/dashboard' && currentPath === '/dashboard') return true;
    if (path !== '/dashboard' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border shadow-sm dark-mode-transition">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center">
          <div className="flex items-center" style={{ marginRight: '0px', position: 'relative', top: '-4px' }}>
            <SmartenLogo className="w-12 h-12" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#0052a9] dark:text-blue-400" style={{ fontWeight: 900, position: 'relative', top: '0px', letterSpacing: '-0.5px' }}>SMARTEN</span>
        </Link>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 px-4 mb-3 uppercase tracking-wider">MAIN</p>
          <div className="space-y-1">
            <NavItem to="/dashboard" icon={<Home size={18} />} label="Home" isActive={isActive('/dashboard')} />
            <NavItem to="/monitor" icon={<Monitor size={18} />} label="Monitor" isActive={isActive('/monitor')} />
            <NavItem to="/device" icon={<Cpu size={18} />} label="Device" isActive={isActive('/device')} />
            <NavItem to="/control" icon={<Sliders size={18} />} label="Control" isActive={isActive('/control')} />
            <NavItem to="/leakage" icon={<Droplets size={18} />} label="Leakage" isActive={isActive('/leakage')} />
            <NavItem to="/users" icon={<Users size={18} />} label="Users" isActive={isActive('/users')} />
            <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" isActive={isActive('/settings')} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;