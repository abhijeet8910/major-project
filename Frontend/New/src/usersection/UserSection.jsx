import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaCloudUploadAlt } from 'react-icons/fa';

const UserSection = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'abhish',
    email: 'abhish@example.com',
  });

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Tulsi', quantity: 2 },
    { id: 2, name: 'Tulip Plant', quantity: 1 },
  ]);

  const [gardenImage, setGardenImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle cart item removal
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Handle garden image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGardenImage(file);
      setImagePreview(URL.createObjectURL(file));  // Show preview
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-100 to-purple-200 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Welcome, {userDetails.name}</h1>

      {/* User Details */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Your Details</h2>
        <p className="text-lg text-gray-700"><strong>Name:</strong> {userDetails.name}</p>
        <p className="text-lg text-gray-700"><strong>Email:</strong> {userDetails.email}</p>
        <button className="mt-4 text-blue-600 hover:text-blue-800 flex items-center">
          <FaEdit className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* Cart Section */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Your Cart</h2>
        <ul className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center text-lg text-gray-700">
                <span>{item.name} (x{item.quantity})</span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </ul>
      </div>

      {/* Garden Image Upload Section */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Upload Your Garden Image</h2>
        <div className="flex justify-center mb-4">
          {imagePreview ? (
            <img src={imagePreview} alt="Garden Preview" className="w-64 h-64 object-cover rounded-md" />
          ) : (
            <div className="w-64 h-64 bg-gray-300 rounded-md flex justify-center items-center">
              <FaCloudUploadAlt className="text-gray-600 text-4xl" />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 hover:file:bg-gray-200"
        />
        {gardenImage && (
          <p className="mt-2 text-gray-600">Uploaded image: {gardenImage.name}</p>
        )}
      </div>
    </div>
  );
};

export default UserSection;
