import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaCube, FaUser } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white fixed bottom-0 w-full z-50 shadow-md h-20">
      <div className="flex justify-around items-center h-full px-4">
        <Link
          to="/userhomepage"
          className="text-center flex flex-col items-center hover:text-green-300 transition"
        >
          <FaHome size={22} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/userhomepage/search"
          className="text-center flex flex-col items-center hover:text-green-300 transition"
        >
          <FaSearch size={22} />
          <span className="text-xs mt-1">Explore</span>
        </Link>

        <Link
          to="/userhomepage/buy"
          className="text-center flex flex-col items-center hover:text-green-300 transition"
        >
          <FaCube size={22} />
          <span className="text-xs mt-1 text-center">3D & AR</span>
        </Link>

        <Link
          to="/userhomepage/user"
          className="text-center flex flex-col items-center hover:text-green-300 transition"
        >
          <FaUser size={22} />
          <span className="text-xs mt-1">User</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
