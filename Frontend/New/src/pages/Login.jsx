import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4008/api/user/login', { email, password });

      // Destructure response data
      const { token, user, id, email: userEmail } = response.data;

      // Store token and user details in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ user, id, email: userEmail }));

      // Navigate to the user homepage
      navigate('/userhomepage');
      
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // Handle express-validator errors
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.data.message) {
        // Handle other server-side errors
        setErrors([error.response.data.message]);
      } else {
        // Handle unexpected errors
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg transition-all duration-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Error Message */}
        {errors.length > 0 && (
          <div className="mt-4">
            <ErrorMessage errors={errors} />
          </div>
        )}

        {/* Link to Register Page */}
        <div className="text-center mt-6 text-gray-700">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
