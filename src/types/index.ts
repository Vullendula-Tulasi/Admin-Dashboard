export type Permission = 'read' | 'write' | 'delete' | 'manage_users' | 'manage_roles';
export type Theme = 'light' | 'dark' | 'system';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
  createdAt: string;
}

export interface Settings {
  theme: Theme;
  language: string;
  emailNotifications: boolean;
}