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
  const [notifications, setNotifications] = useState<Notification[]>([
    // Initial static notifications
    {
      id: 1,
      type: 'alert',
      title: 'Leakage Detected',
      message: 'Water leakage detected at Nyarugenge district. Immediate attention required.',
      time: '5 minutes ago',
      read: false,
      location: 'Kigali, Nyarugenge',
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Water Pressure',
      message: 'Water pressure at Kicukiro has exceeded normal levels.',
      time: '15 minutes ago',
      read: false,
      location: 'Kigali, Kicukiro',
    },
    {
      id: 3,
      type: 'info',
      title: 'System Maintenance Complete',
      message: 'Scheduled maintenance for Gasabo water system has been completed successfully.',
      time: '1 hour ago',
      read: true,
      location: 'Kigali, Gasabo',
    },
    {
      id: 4,
      type: 'success',
      title: 'Leak Resolved',
      message: 'The water leak at Musanze has been successfully repaired.',
      time: '2 hours ago',
      read: true,
      location: 'North, Musanze',
    },
    {
      id: 5,
      type: 'alert',
      title: 'Device Offline',
      message: 'ESP32 device at Huye district is not responding.',
      time: '3 hours ago',
      read: false,
      location: 'South, Huye',
    },
  ]);

  useEffect(() => {
    alerts.forEach((alert) => {
      if (alert.status === 'potential_leak') {
        const newNotification: Notification = {
          id: alert.leak_id,
          type: alert.severity === 'HIGH' ? 'alert' : 'warning',
          title: 'Leakage Detected',
          message: `Water leakage detected at ${alert.village}, ${alert.district}. Flow Rate: ${alert.flow_rate_lph} L/h. Immediate attention required.`,
          time: alert.timestamp,
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
                <p className="text-xs text-gray-500 mt-1">{newNotification.location} • {newNotification.time}</p>
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