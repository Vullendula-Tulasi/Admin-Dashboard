import { create } from 'zustand';
import type { Permission, Role, User, Theme, Settings } from '../types';
import { generateId } from '../lib/utils';

interface Store {
  users: User[];
  roles: Role[];
  settings: Settings;
  currentView: 'dashboard' | 'profile' | 'account';
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id' | 'createdAt'>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setCurrentView: (view: 'dashboard' | 'profile' | 'account') => void;
}

const defaultRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    description: 'Full system access',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Editor',
    permissions: ['read', 'write'],
    description: 'Can read and write content',
    createdAt: new Date().toISOString(),
  },
];

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    roleId: '1',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const defaultSettings: Settings = {
  theme: 'light',
  language: 'English',
  emailNotifications: true,
};

export const useStore = create<Store>((set) => ({
  users: defaultUsers,
  roles: defaultRoles,
  settings: defaultSettings,
  currentView: 'dashboard',
  addUser: (user) =>
    set((state) => ({
      users: [
        ...state.users,
        { ...user, id: generateId(), createdAt: new Date().toISOString() },
      ],
    })),
  updateUser: (id, user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
  addRole: (role) =>
    set((state) => ({
      roles: [
        ...state.roles,
        { ...role, id: generateId(), createdAt: new Date().toISOString() },
      ],
    })),
  updateRole: (id, role) =>
    set((state) => ({
      roles: state.roles.map((r) => (r.id === id ? { ...r, ...role } : r)),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((r) => r.id !== id),
    })),
  updateSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),
  setCurrentView: (view) => set({ currentView: view }),
}));