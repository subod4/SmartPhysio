import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { handleError, handleSuccess } from '../Utils.jsx';

function SignIn({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.email || !formData.password) {
      handleError('Please fill in all fields');
      return;
    }
    

    try {
      setIsLoading(true);

      // Send login request to the backend
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        handleSuccess('Sign In Successful'); // Show success toast
        localStorage.setItem('jwtToken', result.jwtToken); // Save token
        setIsLoggedIn(true); // Update isLoggedIn state in App component
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        handleError(result.error || result.message); // Show error toast
      }
    } catch (err) {
      handleError('Something went wrong. Please try again.'); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In handler
  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    console.log('Signing in with Google...');
    // Add Google OAuth logic here
    setIsGoogleLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] min-h-screen flex items-center justify-center p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 max-w-md w-full transform hover:scale-105 transition duration-300">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mb-6">
          Sign In
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#555555] dark:text-gray-400">
              Email
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#555555] dark:text-gray-400">
              Password
            </label>
            <input
              value={formData.password}
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-600"></div>
          <span className="mx-4 text-[#555555] dark:text-gray-400">or</span>
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-600"></div>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full px-4 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-neutral-50 dark:hover:bg-neutral-600 transition duration-300"
          disabled={isGoogleLoading}
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-[#555555] dark:text-gray-200 font-medium">
            {isGoogleLoading ? 'Signing In with Google...' : 'Sign In with Google'}
          </span>
        </button>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-[#555555] dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text hover:opacity-80 transition duration-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;