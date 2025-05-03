import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductOrderCard from '../components/ProductOrderCard';
import OrderDetailCard from '../SellerSection/OrderDetailCard';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const SellerDashboard = () => {
  const [sellerData, setSellerData] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const profileRes = await axios.get('http://localhost:4008/api/seller/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSellerData(profileRes.data.seller);

      const productsRes = await axios.get(
        `http://localhost:4008/api/products/seller/${profileRes.data.seller._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(productsRes.data.products);

      const ordersRes = await axios.get('http://localhost:4008/api/seller/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(ordersRes.data.orders);
    } catch (error) {
      setErrors(['Failed to load data. Please try again.']);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sellerlogin');
  };

  const handleAddProduct = () => navigate('/seller/add-product');
  const handleEditProduct = (id) => navigate(`/seller/edit-product/${id}`);

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4008/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch {
      setErrors(['Failed to delete product']);
    }
  };

  const handleUpdateOrderStatus = async (orderId) => {
    try {
      await axios.put(`http://localhost:4008/api/seller/order/${orderId}/status`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch {
      setErrors(['Failed to update order status']);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: orders.map((order, i) =>
      order.createdAt ? new Date(order.createdAt).toLocaleDateString() : `Order ${i + 1}`
    ),
    datasets: [
      {
        label: 'Revenue',
        data: orders.map(order => Number(order.totalAmount || 0)),
        borderColor: 'green',
        backgroundColor: 'lightgreen',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Revenue Over Time' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 to-green-100">
      <header className="sticky top-0 bg-white shadow px-6 py-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-green-700">🌿 HerbalConnect Seller</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 hidden sm:block">
            Welcome, {sellerData?.name || 'Seller'}
          </span>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-green-800">Total Products</h3>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-yellow-800">Total Orders</h3>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-blue-800">Total Revenue</h3>
            <p className="text-2xl font-bold">
              ₹{orders.reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}
            >
              Orders
            </button>
          </div>
          {activeTab === 'products' && (
            <button onClick={handleAddProduct} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
              + Add Product
            </button>
          )}
        </div>

        {errors.length > 0 && <p className="text-red-500">{errors.join(', ')}</p>}

        {activeTab === 'products' ? (
          products.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {products.map(product => (
                <ProductOrderCard
                  key={product._id}
                  type="product"
                  data={product}
                  onEdit={() => handleEditProduct(product._id)}
                  onDelete={() => handleDeleteProduct(product._id)}
                />
              ))}
            </div>
          ) : <p>No products found.</p>
        ) : (
          orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map(order => (
                <OrderDetailCard
                  key={order._id}
                  order={order}
                  onUpdate={() => handleUpdateOrderStatus(order._id)}
                />
              ))}
            </div>
          ) : <p>No orders yet.</p>
        )}

        {activeTab === 'orders' && orders.length > 0 && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Analytics</h2>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;
