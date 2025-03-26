import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaCartPlus } from 'react-icons/fa'; // Add icons

const NavbarBeforeLogin = () => {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-white hover:text-yellow-300">
          HerbalConnect 🌱
          </Link>
        </div>

        {/* Links Section for larger screens */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="flex items-center hover:text-yellow-300 transition-all duration-300">
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/login" className="flex items-center hover:text-yellow-300 transition-all duration-300">
            <FaSignInAlt className="mr-2" /> Login
          </Link>
          <Link to="/register" className="flex items-center hover:text-yellow-300 transition-all duration-300">
            <FaUserPlus className="mr-2" /> Register
          </Link>
          <Link to="/sell" className="flex items-center hover:text-yellow-300 transition-all duration-300">
            <FaCartPlus className="mr-2" /> Sell
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white hover:text-yellow-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered based on state) */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 px-4">
          <Link to="/" className="block text-lg text-white hover:text-yellow-300">
            Home
          </Link>
          <Link to="/login" className="block text-lg text-white hover:text-yellow-300">
            Login
          </Link>
          <Link to="/register" className="block text-lg text-white hover:text-yellow-300">
            Register
          </Link>
          <Link to="/sell" className="block text-lg text-white hover:text-yellow-300">
            Sell
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarBeforeLogin;
