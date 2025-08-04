'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getStoredUser, type AdminUser } from '@/lib/auth';
import { 
  BarChart3, 
  FolderOpen, 
  Users, 
  Settings, 
  Home,
  Video,
  Palette,
  Bot,
  Code
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/admin' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, href: '/admin/projects' },
    { id: 'services', label: 'Services', icon: Video, href: '/admin/services' },
    { id: 'clients', label: 'Clients', icon: Users, href: '/admin/clients' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-dark-900 border-r border-dark-700 flex flex-col">
      {/* Logo/Branding */}
      <div className="p-6 border-b border-dark-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">FARVUE</h1>
            <p className="text-sm text-gray-400">Media Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === '/admin' && pathname === '/admin');
            
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20'
                      : 'text-gray-300 hover:bg-dark-800 hover:text-white hover:bg-gradient-to-r hover:from-primary-900/20 hover:to-accent-900/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-dark-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">R</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{user?.username || 'Admin'}</p>
            <p className="text-xs text-gray-400">{user?.role || 'Admin'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}