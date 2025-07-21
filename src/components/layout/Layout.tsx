import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const getTitleFromPath = (path: string) => {
    const pathMap: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/calendar': 'Booking Calendar',
      '/bookings': 'Bookings',
      '/payments': 'Payments',
      '/mandaps': 'Mandap Management',
      '/mandaps/new': 'Add New Mandap',
      '/mandaps/edit': 'Edit Mandap',
      '/customers': 'Customers',
      '/settings': 'Settings',
    };
    
    // Extract base path for dynamic routes
    if (path.startsWith('/mandaps/edit/')) {
      return 'Edit Mandap';
    }
    
    return pathMap[path] || 'Dashboard';
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" 
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <Sidebar />
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          title={getTitleFromPath(location.pathname)}
        />
        
        <main className="flex-1 relative overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;