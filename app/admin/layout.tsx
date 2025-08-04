'use client';

import { Inter } from 'next/font/google';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-slate-900 text-white font-sans">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <AdminSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <AdminHeader />
            
            {/* Page Content */}
            <main className="flex-1 overflow-auto bg-slate-800 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}