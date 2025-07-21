import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotificationStore } from '../../store/notificationStore';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  const { user } = useAuth();
  const { notifications, unreadCount } = useNotificationStore();
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 ml-4">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block bg-gray-50 border border-gray-300 rounded-md py-1.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
          />
        </div>
        
        <Link
          to="/notifications"
          className="relative p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center rounded-full bg-primary-500 text-white">
              {unreadCount}
            </span>
          )}
        </Link>
        
        <Link
          to="/profile"
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
        >
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-semibold">
            {user?.name?.charAt(0)}
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">
            {user?.name}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;