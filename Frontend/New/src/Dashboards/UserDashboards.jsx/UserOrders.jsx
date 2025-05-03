import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`http://localhost:4008/api/orders/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch orders');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:4008/api/orders/cancel/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (err) {
      console.error(err);
      setError('Failed to cancel order');
    }
  };

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    return imagePath.startsWith('http')
      ? imagePath
      : `http://localhost:4008${imagePath.startsWith('/') ? '' : '/uploads/'}${imagePath}`;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Your Orders</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orders.length > 0 ? (
          orders.map(order => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700">
                  Order ID: <span className="text-gray-600">{order._id.slice(-6)}</span>
                </h3>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {order.items.map((item) => (
                item.product && (
                  <div key={item._id} className="mb-4">
                    <div className="w-full h-48 bg-white flex items-center justify-center border rounded-md overflow-hidden mb-2">
                      <img
                        src={getFullImageUrl(item.product.imageUrl)}
                        alt={item.product.name}
                        className="h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    </div>

                    <h3 className="text-lg font-bold">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">{item.product.category}</p>
                    <p className="text-green-700 font-semibold mt-2">
                      ₹{item.price?.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                )
              ))}

              <div className="mt-auto">
                <p className="text-sm font-semibold mt-2">Total: ₹{order.totalAmount}</p>
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default UserOrders;
