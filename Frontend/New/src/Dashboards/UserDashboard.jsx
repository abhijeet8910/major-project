
import React, { useState } from 'react';
import UserProfile from '../Dashboards/UserDashboards.jsx/UserProfile';
import UserCart from '../Dashboards/UserDashboards.jsx/UserCart';
import UserOrders from '../Dashboards/UserDashboards.jsx/UserOrders';

const UserDashboard = () => {
  const [view, setView] = useState('profile');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  if (!userId) return <p className="text-center mt-10 text-red-500">User not found</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-green-600 mb-8">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          {['profile', 'orders', 'cart'].map((section) => (
            <button
              key={section}
              onClick={() => setView(section)}
              className={`text-left px-3 py-2 rounded ${
                view === section
                  ? 'bg-green-100 text-green-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {view === 'profile' && <UserProfile userId={userId} />}
        {view === 'orders' && <UserOrders />}
        {view === 'cart' && <UserCart />}
      </main>
    </div>
  );
};

export default UserDashboard;

