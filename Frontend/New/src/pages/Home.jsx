import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-green-500 to-green-300 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="text-center py-16 bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          Herbal Garden
        </h1>
        <p className="text-xl font-medium max-w-3xl mx-auto">
          Connecting you to trusted nursery farms for fresh plants, herbs, and gardening solutions. Let's grow together!
        </p>
        <button
          onClick={() => navigate('/register')}
          className="mt-8 bg-white text-green-700 font-bold py-3 px-10 rounded-full shadow-md hover:bg-green-100 transition-all"
        >
          Explore Nurseries
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Wide Variety</h3>
            <p className="text-gray-700">
              Discover a diverse collection of plants and herbs for your home and garden.
            </p>
          </div>
          {/* Feature Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Trusted Nurseries</h3>
            <p className="text-gray-700">
              Partnering with reliable farms to bring you the freshest options.
            </p>
          </div>
          {/* Feature Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Eco-Friendly</h3>
            <p className="text-gray-700">
              Supporting sustainable gardening practices for a greener future.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-r from-green-400 to-green-300 text-center">
        <h2 className="text-4xl font-bold text-green-900 mb-6">
          Ready to Start Your Gardening Journey?
        </h2>
        <p className="text-lg text-green-800 max-w-2xl mx-auto mb-8">
          Join our community of plant enthusiasts and connect with nurseries that care about quality and sustainability.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-800 transition-all"
        >
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">&copy; 2024 Herbal Garden. All rights reserved.</p>
          <p className="text-sm">Growing Together for a Greener Tomorrow.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
