import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SidebarNav from './SidebarNav';
import Header from './Header';
import Footer from './Footer';
import NotificationsPanel, { initialNotifications } from '../ui/NotificationsPanel';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(
    initialNotifications.filter(n => n.new).length
  );
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} unreadCount={unreadCount} onShowNotifications={() => setShowNotifications(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 pt-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
          {children}
        </main>
        <Footer />
        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} onChangeUnread={setUnreadCount} />
        )}
      </div>
    </div>
  );
};

export default MainLayout;
