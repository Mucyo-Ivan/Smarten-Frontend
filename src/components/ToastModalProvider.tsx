import React from 'react';
import { useNotificationContext } from '@/pages/NotificationContext';
import LeakageDetailModal from './ui/LeakageDetailModal';

const ToastModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedToastNotification, closeToastModal } = useNotificationContext();

  return (
    <>
      {children}
      {/* Toast Modal - appears when toast is clicked */}
      {selectedToastNotification && (
        <LeakageDetailModal 
          notification={selectedToastNotification} 
          onClose={closeToastModal} 
        />
      )}
    </>
  );
};

export default ToastModalProvider;
