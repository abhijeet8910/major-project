 import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavbarAfterLogin = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name); // ✅ fix: only use the name
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-green-700 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold text-green-100 hover:text-white">
            HerbalConnect 🌱
          </Link>
        </div>

        <div className="space-x-6 flex items-center">
          <span className="font-semibold text-green-100">Welcome, {userName}!</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAfterLogin;
