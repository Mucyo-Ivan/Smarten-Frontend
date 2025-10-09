import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLeakAlerts } from '@/hooks/useLeakAlerts';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  type: 'alert' | 'warning' | 'success' | 'info' ;
  title: string;
  message: string;
  time: string;
  read: boolean;
  location: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  removeNotification: (id: number) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const alerts = useLeakAlerts();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Process real-time notifications from WebSocket alerts
  useEffect(() => {
    alerts.forEach((alert) => {
      if (alert.status === 'potential_leak') {
        // Validate timestamp to prevent "Invalid Date" issues
        const timestamp = alert.timestamp;
        const isValidTimestamp = timestamp && !isNaN(new Date(timestamp).getTime());
        
        if (!isValidTimestamp) {
          console.warn('Invalid timestamp received, skipping notification:', alert);
          return;
        }

        const newNotification: Notification = {
          id: alert.leak_id,
          type: alert.severity === 'HIGH' ? 'alert' : 'warning',
          title: 'Leakage Detected',
          message: `Water leakage detected at ${alert.village}, ${alert.district}. Flow Rate: ${alert.flow_rate_lph} L/h. Immediate attention required.`,
          time: timestamp,
          read: false,
          location: `${alert.village}, ${alert.district}, ${alert.province}, ${alert.country}`,
        };

        setNotifications((prev) => {
          if (prev.some((n) => n.id === newNotification.id)) {
            return prev; // Prevent duplicates
          }

          // Show toast notification only for leak alerts
          toast({
            title: newNotification.title,
            description: (
              <div>
                <p>{newNotification.message}</p>
                <p className="text-xs font-bold text-white-500 mt-1">{newNotification.location} • {new Date(timestamp).toLocaleString()}</p>
              </div>
            ),
            variant: alert.severity === 'HIGH' ? 'destructive' : 'default',
            duration: 6000,
            className: `border-l-4 ${alert.severity === 'HIGH' ? 'border-red-500' : 'border-yellow-500'}`,
          });

          return [...prev, newNotification];
        });
      }
    });
  }, [alerts, toast]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, removeNotification, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (undefined === context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};