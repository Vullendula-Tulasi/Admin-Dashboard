import React from 'react';
import { X } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">New user registered</p>
          <p className="text-xs text-gray-500">2 minutes ago</p>
        </div>
        <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">Role permissions updated</p>
          <p className="text-xs text-gray-500">1 hour ago</p>
        </div>
        <div className="px-4 py-3 hover:bg-gray-50">
          <p className="text-sm font-medium text-gray-900">System update completed</p>
          <p className="text-xs text-gray-500">2 hours ago</p>
        </div>
      </div>
    </div>
  );
}