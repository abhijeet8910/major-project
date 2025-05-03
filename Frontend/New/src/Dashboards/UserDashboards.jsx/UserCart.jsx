import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`http://localhost:4008/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const filteredItems = (res.data.cart?.items || []).filter(item => item.product);
      setCartItems(filteredItems);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch cart items');
    }
  };
  

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:4008/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter(item => item.product?._id !== productId));
    } catch (err) {
      console.error(err);
      setError('Failed to remove item from cart');
    }
  };

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    return imagePath.startsWith('http')
      ? imagePath
      : `http://localhost:4008${imagePath.startsWith('/') ? '' : '/uploads/'}${imagePath}`;
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Your Cart</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cartItems.length > 0 ? (
          cartItems.map(item => {
            const product = item.product;

            // if (!product) {
            //   return (
            //     <div key={item._id} className="p-4 bg-red-100 text-red-600 rounded">
            //       ⚠️ Product no longer available
            //     </div>
            //   );
            // }

            return (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
              >
                <div>
                <div className="w-full h-48 bg-white flex items-center justify-center border rounded-md overflow-hidden">
  <img
    src={getFullImageUrl(product.imageUrl)}
    alt={product.name}
    className="h-full object-contain"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '/placeholder.jpg';
    }}
  />
</div>

                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.category}</p>
                  <p className="text-green-700 font-semibold mt-2">
                    ₹{product.price?.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Quantity: <strong>{item.quantity}</strong>
                  </p>
                </div>
                <div className="mt-4 flex justify-between gap-2">
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded"
                  >
                    View Product
                  </button>
                  <button
                    onClick={() => handleRemoveItem(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </section>
  );
};

export default UserCart;
