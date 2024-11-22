import React, { useState, useEffect } from 'react';
import {
  Users,
  ShieldCheck,
  Plus,
  LayoutDashboard,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import { UserTable } from './components/UserTable';
import { RoleTable } from './components/RoleTable';
import { UserModal } from './components/UserModal';
import { RoleModal } from './components/RoleModal';
import { NotificationsPanel } from './components/NotificationsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { ProfileDropdown } from './components/ProfileDropdown';
import { ProfileView } from './components/ProfileView';
import { AccountSettings } from './components/AccountSettings';
import { useStore } from './store';
import type { Role, User } from './types';

function App() {
  const { settings, currentView, setCurrentView } = useStore();
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Apply theme
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setRoleModalOpen(true);
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
  };

  if (currentView === 'profile') {
    return <ProfileView />;
  }

  if (currentView === 'account') {
    return <AccountSettings />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Rest of the dashboard code remains the same */}
      <div className="w-64 bg-white shadow-lg relative">
        <div className="h-16 flex items-center px-6">
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
          <span className="ml-3 text-lg font-semibold text-gray-900">
            Admin Dashboard
          </span>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center px-6 py-3 text-sm ${
              activeTab === 'users'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="ml-3">Users</span>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`w-full flex items-center px-6 py-3 text-sm ${
              activeTab === 'roles'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ShieldCheck className="h-5 w-5" />
            <span className="ml-3">Roles</span>
          </button>
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-gray-200">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full px-6 py-4 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="Admin"
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
          </button>
          {profileOpen && (
            <ProfileDropdown isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="h-16 flex items-center justify-between px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeTab === 'users' ? 'User Management' : 'Role Management'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setSettingsOpen(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Bell className="h-5 w-5" />
                </button>
                {notificationsOpen && (
                  <NotificationsPanel
                    isOpen={notificationsOpen}
                    onClose={() => setNotificationsOpen(false)}
                  />
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setSettingsOpen(!settingsOpen);
                    setNotificationsOpen(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Settings className="h-5 w-5" />
                </button>
                {settingsOpen && (
                  <SettingsPanel
                    isOpen={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                  />
                )}
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Manage your {activeTab === 'users' ? 'users' : 'roles'} and their
              permissions
            </p>
            <button
              onClick={() => {
                if (activeTab === 'users') {
                  setSelectedUser(undefined);
                  setUserModalOpen(true);
                } else {
                  setSelectedRole(undefined);
                  setRoleModalOpen(true);
                }
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {activeTab === 'users' ? 'User' : 'Role'}
            </button>
          </div>

          {activeTab === 'users' ? (
            <UserTable onEdit={handleEditUser} />
          ) : (
            <RoleTable onEdit={handleEditRole} />
          )}
        </main>
      </div>

      {/* Modals */}
      <UserModal
        user={selectedUser}
        isOpen={userModalOpen}
        onClose={() => {
          setUserModalOpen(false);
          setSelectedUser(undefined);
        }}
      />
      <RoleModal
        role={selectedRole}
        isOpen={roleModalOpen}
        onClose={() => {
          setRoleModalOpen(false);
          setSelectedRole(undefined);
        }}
      />
    </div>
  );
}

export default App;