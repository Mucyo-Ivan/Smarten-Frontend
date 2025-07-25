import { ReactNode, useState } from 'react';
import SidebarNav from './SidebarNav';
import Header from './Header';
import Footer from './Footer';
import NotificationsPanel from '../ui/NotificationsPanel';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} onShowNotifications={() => setShowNotifications(true)} />
        <main className="flex-1 overflow-y-auto">
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

export default MainLayout;
