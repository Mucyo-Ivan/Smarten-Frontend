import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Monitor, Cpu, Settings, Users, Sliders, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';
import SmartenLogo from '../ui/SmartenLogo';

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isActive, isCollapsed }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        'flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 group dark-mode-transition',
        isActive && 'text-primary bg-accent font-medium',
        isCollapsed && 'justify-center px-2'
      )}
      title={isCollapsed ? label : undefined}
    >
      <div className={cn(
        'transition-transform duration-200 group-hover:scale-110',
        isActive && 'scale-110'
      )}>
        {icon}
      </div>
      <span className={cn(
        'text-sm transition-all duration-200',
        isCollapsed && 'opacity-0 w-0 overflow-hidden'
      )}>
        {label}
      </span>
    </Link>
  );
};

const SidebarNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isCollapsed } = useSidebar();

  const isActive = (path: string) => {
    if (path === '/dashboard' && currentPath === '/dashboard') return true;
    if (path !== '/dashboard' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className={cn(
      "min-h-screen bg-sidebar border-r border-sidebar-border shadow-sm dark-mode-transition transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className={cn("transition-all duration-300", isCollapsed ? "p-2" : "p-6")}>
        <Link to="/dashboard" className={cn(
          "flex items-center transition-all duration-300",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="flex items-center" style={{ marginRight: '0px', position: 'relative', top: '-4px' }}>
            <SmartenLogo className="w-12 h-12" />
          </div>
          <span className={cn(
            "text-2xl font-extrabold tracking-tight text-[#0052a9] dark:text-blue-400 transition-all duration-300",
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )} style={{ fontWeight: 900, position: 'relative', top: '0px', letterSpacing: '-0.5px' }}>
            SMARTEN
          </span>
        </Link>
      </div>
      
      <div className={cn("transition-all duration-300", isCollapsed ? "p-2" : "p-4")}>
        <div className="mb-6">
          <p className={cn(
            "text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider transition-all duration-300",
            isCollapsed ? "opacity-0 w-0 overflow-hidden px-2" : "opacity-100 px-4"
          )}>
            MAIN
          </p>
          <div className="space-y-1">
            <NavItem to="/dashboard" icon={<Home size={18} />} label="Home" isActive={isActive('/dashboard')} isCollapsed={isCollapsed} />
            <NavItem to="/monitor" icon={<Monitor size={18} />} label="Monitor" isActive={isActive('/monitor')} isCollapsed={isCollapsed} />
            <NavItem to="/device" icon={<Cpu size={18} />} label="Device" isActive={isActive('/device')} isCollapsed={isCollapsed} />
            <NavItem to="/control" icon={<Sliders size={18} />} label="Control" isActive={isActive('/control')} isCollapsed={isCollapsed} />
            <NavItem to="/leakage" icon={<Droplets size={18} />} label="Leakage" isActive={isActive('/leakage')} isCollapsed={isCollapsed} />
            <NavItem to="/users" icon={<Users size={18} />} label="Users" isActive={isActive('/users')} isCollapsed={isCollapsed} />
            <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" isActive={isActive('/settings')} isCollapsed={isCollapsed} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;