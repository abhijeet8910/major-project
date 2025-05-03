import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from 'recharts';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const profileRes = await axios.get('http://localhost:4008/api/admin/profile', { headers });
      setAdmin(profileRes.data.admin);

      const usersRes = await axios.get('http://localhost:4008/api/admin/users', { headers });
      setUsers(usersRes.data.users);

      const sellersRes = await axios.get('http://localhost:4008/api/admin/sellers', { headers });
      setSellers(sellersRes.data.sellers);
    } catch (err) {
      console.error(err);
      navigate('/admin/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm('Delete this user?')) {
      await axios.delete(`http://localhost:4008/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    }
  };

  const handleDeleteSeller = async (id) => {
    if (window.confirm('Delete this seller?')) {
      await axios.delete(`http://localhost:4008/api/admin/seller/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Dummy revenue data for now
  const revenueData = [
    { month: 'Jan', revenue: 2000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 4000 },
    { month: 'Apr', revenue: 5000 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Welcome, {admin?.email}</span>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </header>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">{users.length}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Total Sellers</h3>
          <p className="text-2xl font-bold text-purple-600">{sellers.length}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">₹14,000</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Bar Chart - Users vs Sellers */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Users vs Sellers</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { type: 'Users', count: users.length },
              { type: 'Sellers', count: sellers.length },
            ]}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Revenue Over Time */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4ade80" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lists */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Users */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          <ul className="divide-y">
            {users.map(user => (
              <li key={user._id} className="py-2 flex justify-between items-center">
                <span>{user.name} ({user.email})</span>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Sellers */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">All Sellers</h2>
          <ul className="divide-y">
            {sellers.map(seller => (
              <li key={seller._id} className="py-2 flex justify-between items-center">
                <span>{seller.name} ({seller.email})</span>
                <button
                  onClick={() => handleDeleteSeller(seller._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
