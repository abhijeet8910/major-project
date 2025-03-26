import React from 'react';
import { useNavigate } from 'react-router-dom';

const NurseryDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="text-center py-12 bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome, Nursery Owners!
        </h1>
        <p className="text-lg font-medium max-w-3xl mx-auto">
          Sell your plants online, reach a wider audience, and create stunning 3D models of your products effortlessly.
        </p>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature: Sell Plants */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Sell Your Plants
            </h3>
            <p className="text-gray-700">
              List your plants on our platform and connect with plant enthusiasts nationwide.
            </p>
          </div>

          {/* Feature: Create 3D Models */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Create 3D Models
            </h3>
            <p className="text-gray-700">
              Use our 3D modeling tools to showcase your plants in a visually stunning way.
            </p>
          </div>

          {/* Feature: Manage Listings */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Manage Your Listings
            </h3>
            <p className="text-gray-700">
              Log in to your dashboard to manage your listings and track sales.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-r from-green-400 to-green-300 text-center">
        <h2 className="text-3xl font-bold text-green-900 mb-6">
          Ready to Grow Your Business?
        </h2>
        <p className="text-lg text-green-800 max-w-2xl mx-auto mb-8">
          Join our platform today and take your nursery to the next level with cutting-edge tools and a growing community.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/sellerregister')}
            className="bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-800 transition-all"
          >
            Register Now
          </button>
          <button
            onClick={() => navigate('/sellerlogin')}
            className="bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-100 transition-all"
          >
            Login
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">&copy; 2024 Herbal Garden. All rights reserved.</p>
          <p className="text-sm">Empowering Nurseries, One Plant at a Time.</p>
        </div>
      </footer>
    </div>
  );
};

export default NurseryDashboard;
