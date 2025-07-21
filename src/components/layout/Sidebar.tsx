import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Book, Settings, LogOut, DollarSign, ChevronDown, Building, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isManagementOpen, setIsManagementOpen] = React.useState(true);

  const isActive = (isActive: boolean) => isActive ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-100';

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600 flex items-center">
          <Building className="h-6 w-6 mr-2" />
          MandapPro
        </h1>
      </div>
      
      <div className="py-4 flex-1 overflow-y-auto">
        <nav className="px-4 space-y-1">
          <NavLink
            to="/dashboard"
            className={({ isActive: active }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(active)}`
            }
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          
          <NavLink
            to="/calendar"
            className={({ isActive: active }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(active)}`
            }
          >
            <Calendar className="mr-3 h-5 w-5" />
            Calendar
          </NavLink>
          
          <NavLink
            to="/bookings"
            className={({ isActive: active }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(active)}`
            }
          >
            <Book className="mr-3 h-5 w-5" />
            Bookings
          </NavLink>
          
          <NavLink
            to="/payments"
            className={({ isActive: active }) => 
              `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(active)}`
            }
          >
            <DollarSign className="mr-3 h-5 w-5" />
            Payments
          </NavLink>
          
          <div className="pt-2 pb-1">
            <button
              onClick={() => setIsManagementOpen(!isManagementOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
            >
              <span className="flex items-center">
                <Building className="mr-3 h-5 w-5" />
                Mandap Management
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isManagementOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {isManagementOpen && (
              <div className="ml-6 mt-1 space-y-1">
                <NavLink
                  to="/mandaps"
                  className={({ isActive: active }) => 
                    `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(active)}`
                  }
                >
                  All Mandaps
                </NavLink>
                <NavLink
                  to="/mandaps/new"
                  className={({ isActive: active }) => 
                    `flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive(active)}`
                  }
                >
                  Add New Mandap
                </NavLink>
              </div>
            )}
          </div>
          
          
         
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-semibold">
            {user?.name?.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;