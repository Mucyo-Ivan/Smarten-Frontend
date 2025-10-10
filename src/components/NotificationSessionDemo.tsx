import React from 'react';
import { useNotificationContext } from '@/pages/NotificationContext';

/**
 * Demo component to show how the session-based notification system works
 * This component can be added to any page to test the functionality
 */
const NotificationSessionDemo: React.FC = () => {
  const { notifications, cleanupReadNotifications, markAllAsRead } = useNotificationContext();

  const handleCleanupRead = () => {
    cleanupReadNotifications();
    alert('Read notifications have been cleaned up! They will not persist after page reload.');
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
    alert('All notifications marked as read. They will be removed on session end.');
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-semibold mb-2">Notification Session Demo</h3>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Session-based behavior:</strong><br/>
        • Read notifications are removed when session expires<br/>
        • Unread notifications persist across page reloads<br/>
        • Current notifications: {notifications.length} total
      </p>
      
      <div className="space-x-2">
        <button
          onClick={handleMarkAllRead}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Mark All as Read
        </button>
        <button
          onClick={handleCleanupRead}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          Cleanup Read Notifications
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <p><strong>Test steps:</strong></p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Wait for leakage notifications to appear</li>
          <li>Click on some notifications to mark them as read</li>
          <li>Click "Mark All as Read" to mark all as read</li>
          <li>Reload the page - only unread notifications should remain</li>
          <li>Or click "Cleanup Read Notifications" to manually remove read ones</li>
        </ol>
      </div>
    </div>
  );
};

export default NotificationSessionDemo;
