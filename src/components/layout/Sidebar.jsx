import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Book, Settings, LogOut, DollarSign, Building, Users, Store } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Mandaps', href: '/mandaps', icon: Building },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Bookings', href: '/bookings', icon: Book },
    { name: 'Payments', href: '/payments', icon: DollarSign },
    { name: 'Reviews', href: '/reviews', icon: Users },
    { name: 'Vendors', href: '/vendors', icon: Store },
  ];

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 bg-white border-b border-gray-200">
        <Building className="w-8 h-8 text-primary-600" />
        <span className="ml-2 text-xl font-bold text-primary-600">MandapPro</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
            onClick={handleNavClick}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-semibold">
            {user?.name?.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <NavLink
          to="/profile"
          className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 mb-2"
          onClick={handleNavClick}
        >
          <Settings className="w-5 h-5 mr-3" />
          Profile
        </NavLink>
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign out
        </button>
      </div>
    </div>
  );
}