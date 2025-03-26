import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white p-4 fixed bottom-0 w-full z-50 shadow-lg">
      <div className="flex justify-around items-center space-x-8">
        {/* Link to Home Section */}
        <Link 
          to="/userhomepage" 
          className="text-center flex flex-col items-center hover:text-green-400"
        >
          <FaHome size={24} />
          <span className="text-sm">Home</span>
        </Link>

        {/* Link to Search Section */}
        <Link 
          to="/userhomepage/search" 
          className="text-center flex flex-col items-center hover:text-green-400"
        >
          <FaSearch size={24} />
          <span className="text-sm">Search</span>
        </Link>

        {/* Link to Buy Section */}
        <Link 
          to="/userhomepage/buy" 
          className="text-center flex flex-col items-center hover:text-green-400"
        >
          <FaShoppingCart size={24} />
          <span className="text-sm">Buy</span>
        </Link>

        {/* Link to User Section */}
        <Link 
          to="/userhomepage/user" 
          className="text-center flex flex-col items-center hover:text-green-400"
        >
          <FaUser size={24} />
          <span className="text-sm">User</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
