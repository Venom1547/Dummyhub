import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, LogOut, Home, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center text-blue-600 font-bold text-xl">
              <span className="flex items-center">
                <LayoutDashboard className="mr-2" size={24} />
                DummyHub
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            
            {isAuthenticated ? (
              <>
                
                <div className="text-sm text-gray-600 px-3 py-2">
                  {user?.email}
                </div>
                
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150"
                >
                  <LogOut size={18} className="mr-1" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <LogIn size={18} className="mr-1" />
                  <span>Login</span>
                </Link>
                
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;