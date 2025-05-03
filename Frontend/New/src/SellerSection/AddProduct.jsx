import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

// ✅ Same categories as ExploreSection
const categories = [
  "Seed",
  "Indoor Plant",
  "Medicinal Plants",
  "Flower",
  "Outdoor Plant",
];

const AddProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) {
      formData.append('image', image); // match multer field name
    }

    try {
      await axios.post('http://localhost:4008/api/products/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/sellerdashboard');
    } catch (err) {
      setErrors(['Failed to add product. Make sure all fields are filled correctly.']);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-yellow-300 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Add New Product</h2>
        
        {errors.length > 0 && <ErrorMessage errors={errors} />}

        {/* Product Name */}
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-3 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full p-3 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full p-3 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />

        {/* Category Select */}
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-3 border border-green-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Stock */}
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Available Stock"
          className="w-full p-3 border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-green-400 rounded bg-white"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
