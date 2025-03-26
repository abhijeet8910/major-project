import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const LoginSeller = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4008/api/seller/login', {
        email,
        password,
      });

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      console.log('Seller logged in:', response.data);
      navigate('/sellerdashboard'); // Redirect to seller's dashboard after login
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.data.message) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 to-yellow-400">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Seller Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 shadow-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Login as Seller
          </button>
        </form>

        {/* Display Errors */}
        {errors.length > 0 && (
          <div className="mt-4">
            <ErrorMessage errors={errors} />
          </div>
        )}

        {/* Link to Register Page */}
        <div className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <a href="/sellerregister" className="text-green-500 font-medium hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginSeller;
