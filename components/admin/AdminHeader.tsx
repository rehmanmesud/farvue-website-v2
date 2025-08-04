'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { getStoredUser, logout, type AdminUser } from '@/lib/auth';

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin' },
    { id: 'projects', label: 'Projects', href: '/admin/projects' },
    { id: 'services', label: 'Services', href: '/admin/services' },
    { id: 'team', label: 'Team', href: '/admin/team' },
    { id: 'analytics', label: 'Analytics', href: '/admin/analytics' },
  ];

  const getActiveTab = () => {
    const tab = tabs.find(tab => tab.href === pathname || (tab.href === '/admin' && pathname === '/admin'));
    return tab?.id || 'dashboard';
  };

  return (
    <header className="bg-dark-900 border-b border-dark-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Admin Panel Title & Tabs */}
        <div className="flex items-center space-x-8">
          <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
          
          {/* Tabs */}
          <nav className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => router.push(tab.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  getActiveTab() === tab.id
                    ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20'
                    : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: User Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-dark-800 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">R</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">{user?.username || 'Admin'}</p>
                <p className="text-xs text-gray-400">{user?.role || 'Admin'}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-50">
                <div className="py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => router.push('/admin/settings')}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-dark-700 my-2"></div>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-accent-400 hover:bg-dark-700"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}