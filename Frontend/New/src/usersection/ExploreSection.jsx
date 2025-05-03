import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BuyPlantCard from '../usercomponents/BuyPlantCard'; // adjust path if needed

const categories = [
  "All",
  "Seed",
  "Indoor Plant",
  "Medicinal Plants",
  "Flower",
  "Outdoor Plant",
];

const ExploreSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4008/api/products/all');
        const fetchedProducts = res.data.products || [];
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, searchTerm);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterProducts(selectedCategory, value);
  };

  const filterProducts = (category, searchText) => {
    let updatedProducts = [...products];

    if (category !== "All") {
      updatedProducts = updatedProducts.filter(product => product.category === category);
    }

    if (searchText.trim() !== "") {
      updatedProducts = updatedProducts.filter(product =>
        product.name.toLowerCase().includes(searchText.trim().toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  };

  const getFullImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:4008${imageUrl}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-6">Explore Plants</h1>

      {/* ✅ Sticky Container */}
      <div className="sticky top-0 z-30 bg-gray-100 pb-4 pt-2">
        {/* ✅ Search Input */}
        <div className="flex justify-center mb-4 px-4">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-md px-4 py-2 border border-green-500 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
          />
        </div>

        {/* ✅ Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full border 
                ${selectedCategory === category ? 'bg-green-600 text-white' : 'bg-white text-green-600 border-green-600'}
                hover:bg-green-700 hover:text-white transition`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 mt-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <BuyPlantCard
              key={product._id}
              imgSrc={getFullImageUrl(product.imageUrl)}
              name={product.name}
              usage={product.description}
              price={product.price}
              availability={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              onMoreDetails={() => navigate(`/product/${product._id}`)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreSection;
