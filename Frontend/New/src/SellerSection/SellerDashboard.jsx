import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const SellerDashboard = () => {
  const [sellerData, setSellerData] = useState(null);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch seller data and products when the component loads
    const fetchData = async () => {
      try {
        // Fetch the seller's data using the stored token in localStorage
        const sellerResponse = await axios.get('http://localhost:4008/api/seller/profile/:id', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setSellerData(sellerResponse.data);

        // Fetch products associated with the seller
        const productsResponse = await axios.get('http://localhost:4008/api/seller/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setProducts(productsResponse.data);
      } catch (error) {
        setErrors(['An error occurred while fetching your data. Please try again later.']);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = () => {
    // Navigate to the Add Product page
    navigate('/seller/add-product');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/sellerlogin'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 to-yellow-400 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Seller Info Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
          {sellerData ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{sellerData.name}</h2>
              <p className="text-lg text-gray-600 mb-4">{sellerData.email}</p>
              <p className="text-gray-600">{sellerData.contactNumber}</p>
              <p className="text-gray-600">
                {sellerData.address.street}, {sellerData.address.city}, {sellerData.address.state} - {sellerData.address.zipCode}, {sellerData.address.country}
              </p>
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>Loading your data...</div>
          )}
        </div>

        {/* Products Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Products</h2>
          {errors.length > 0 && <ErrorMessage errors={errors} />}
          <div className="space-y-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
                  <div className="flex items-center space-x-4">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h3 className="font-semibold text-gray-700">{product.name}</h3>
                      <p className="text-gray-500">${product.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                    className="bg-blue-500 text-white py-1 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p>No products found. Add your first product!</p>
            )}
          </div>
        </div>

        {/* Add Product Button */}
        <div className="text-center">
          <button
            onClick={handleAddProduct}
            className="w-full md:w-auto bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
