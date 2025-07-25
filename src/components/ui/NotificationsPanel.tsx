import { X } from 'lucide-react';
import { useState } from 'react';
import Frame1201Icon from '../../../Smarten Assets/assets/Frame 1201.svg';
import LeakageButtonIcon from '../../../Smarten Assets/assets/Leakage button.svg';
import PeopleIcon from '../../../Smarten Assets/assets/People.svg';
import ToggleRightIcon from '../../../Smarten Assets/assets/toggle-right 1.svg';
import DropletsIcon from '../../../Smarten Assets/assets/droplets.svg';

interface NotificationsPanelProps {
  onClose: () => void;
}

const initialNotifications = [
  {
    id: 1,
    type: 'leakage',
    title: 'Leakage detected at Musanze',
    time: '09:00AM',
    date: 'Today',
    new: true,
    icon: 'leakage',
  },
  {
    id: 2,
    type: 'critical',
    title: 'Critical readings at Nyabihu',
    time: '11:00AM',
    date: 'Today',
    new: true,
    icon: 'critical',
  },
  {
    id: 3,
    type: 'user',
    title: 'A new user has been added in Rwamagana',
    time: '11:00AM',
    date: 'Today',
    new: false,
    icon: 'user',
  },
  {
    id: 4,
    type: 'action',
    title: 'Turn on water in Musanze',
    time: '11:00AM',
    date: 'Today',
    new: false,
    icon: 'action',
  },
  {
    id: 5,
    type: 'leakage',
    title: 'Leakage detected at Musanze',
    time: '09:00AM',
    date: 'Yesterday',
    new: false,
    icon: 'leakage',
  },
  {
    id: 6,
    type: 'critical',
    title: 'Critical readings at Nyabihu',
    time: '11:00AM',
    date: 'Yesterday',
    new: false,
    icon: 'critical',
  },
  {
    id: 7,
    type: 'user',
    title: 'A new user has been added in Rwamagana',
    time: '11:00AM',
    date: 'Past week',
    new: false,
    icon: 'user',
  },
];

const getIcon = (icon: string) => {
  switch (icon) {
    case 'leakage':
      return <img src={DropletsIcon} alt="Leakage" className="w-7 h-7" />;
    case 'critical':
      return <img src={LeakageButtonIcon} alt="Critical" className="w-7 h-7" />;
    case 'user':
      return <img src={PeopleIcon} alt="User" className="w-7 h-7" />;
    case 'action':
      return <img src={ToggleRightIcon} alt="Action" className="w-7 h-7" />;
    default:
      return null;
  }
};

const NotificationsPanel = ({ onClose }: NotificationsPanelProps) => {
  const [notifications] = useState(initialNotifications);

  // Group notifications by date
  const grouped = notifications.reduce((acc: Record<string, typeof notifications>, notif) => {
    acc[notif.date] = acc[notif.date] || [];
    acc[notif.date].push(notif);
    return acc;
  }, {});

  return (
    <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-slide-in" style={{ minWidth: 380 }}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <span className="text-lg font-semibold">Notifications</span>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 max-h-[80vh]">
        {Object.keys(grouped).map(date => (
          <div key={date} className="mb-4">
            <div className="text-xs text-gray-400 font-semibold mb-2 mt-2">{date}</div>
            {grouped[date].map(notif => (
              <div key={notif.id} className="flex items-start gap-3 mb-4">
                {['user', 'action', 'leakage'].includes(notif.icon) ? (
                  <span className="w-12 h-12 flex items-center justify-center rounded-full" style={{ background: '#1862CA' }}>
                    <span className="flex items-center justify-center w-7 h-7">
                      {getIcon(notif.icon)}
                    </span>
                  </span>
                ) : (
                  <span className="w-8 h-8 flex items-center justify-center rounded-full">
                    {getIcon(notif.icon)}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900" style={{fontWeight: notif.new ? 600 : 500}}>{notif.title}</span>
                    {notif.new && <span className="ml-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full font-semibold">New</span>}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{notif.time}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel; 