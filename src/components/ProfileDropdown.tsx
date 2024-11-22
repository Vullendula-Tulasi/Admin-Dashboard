import React from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { useStore } from '../store';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const { setCurrentView } = useStore();
  
  if (!isOpen) return null;

  const handleNavigation = (view: 'profile' | 'account') => {
    setCurrentView(view);
    onClose();
  };

  return (
    <div className="absolute bottom-16 left-0 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm font-medium text-gray-900">Admin User</p>
        <p className="text-xs text-gray-500">admin@example.com</p>
      </div>
      <div className="py-1">
        <button 
          onClick={() => handleNavigation('profile')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
        >
          <User className="h-4 w-4 mr-2" />
          View Profile
        </button>
        <button 
          onClick={() => handleNavigation('account')}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
        >
          <Settings className="h-4 w-4 mr-2" />
          Account Settings
        </button>
        <div className="border-t border-gray-200 my-1"></div>
        <button 
          onClick={() => alert('Logged out successfully!')}
          className="px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left flex items-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
}