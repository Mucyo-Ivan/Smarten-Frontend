import { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SidebarNav from './SidebarNav';
import Header from './Header';
import Footer from './Footer';
import NotificationsPanel from '../ui/NotificationsPanel';
import { useNotificationContext } from '@/pages/NotificationContext';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayoutInner = ({ children, title }: MainLayoutProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { unreadCount } = useNotificationContext();
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultRootPaths = ['/dashboard', '/monitor', '/device', '/control', '/leakage', '/users', '/settings', '/'];
  const hideBackButton = defaultRootPaths.includes(location.pathname);
  
  return (
    <div className="flex h-screen bg-background dark-mode-transition">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Header title={title} unreadCount={unreadCount} onShowNotifications={() => setShowNotifications(true)} />
        {/* Unified horizontal line */}
        <div className="h-px bg-border w-full"></div>
        <main className="flex-1 overflow-y-auto">
          {!hideBackButton && (
            <div className="px-4 pt-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          )}
          {children}
        </main>
        <Footer />
        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </div>
  );
};

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <MainLayoutInner title={title}>
        {children}
      </MainLayoutInner>
    </SidebarProvider>
  );
};

export default MainLayout;
