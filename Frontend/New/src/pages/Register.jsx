import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4008/api/user/register', { name, email, password });

      // On successful registration, navigate to the login page
      console.log('User registered:', response.data);
      navigate('/login');
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
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Create an Account</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 shadow-sm"
            />
          </div>

          {/* Email Input */}
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

          {/* Password Input */}
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
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Display Errors */}
        {errors.length > 0 && (
          <div className="mt-4">
            <ErrorMessage errors={errors} />
          </div>
        )}

        {/* Link to Login Page */}
        <div className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-green-500 font-medium hover:underline">
            Login here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
