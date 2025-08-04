'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { isAuthenticated } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }

    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setIsLoading(false);
  }, [pathname, router]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <html lang="en" className={inter.variable}>
        <body className="bg-dark-900 text-white font-sans">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading...</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // Show login page
  if (pathname === '/admin/login') {
    return (
      <html lang="en" className={inter.variable}>
        <body className="bg-dark-900 text-white font-sans">
          {children}
        </body>
      </html>
    );
  }

  // Show admin panel
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-dark-900 text-white font-sans">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <AdminSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <AdminHeader />
            
            {/* Page Content */}
            <main className="flex-1 overflow-auto bg-dark-800 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}