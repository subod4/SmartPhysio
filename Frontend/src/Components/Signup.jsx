import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
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
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      return toast.error('All fields are required');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8000/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, password }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setTimeout(() => navigate('/signin'), 1000);
      } else {
        toast.error(result.error?.details[0]?.message || result.message);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    console.log('Signing up with Google...');
  };

  return (
    <div className="bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] min-h-screen flex items-center justify-center p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 max-w-md w-full transform hover:scale-105 transition duration-300">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mb-6">
          Sign Up
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-[#555555] dark:text-gray-400">
              Full Name
            </label>
            <input
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="mt-1 block w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent"
              required
            />
          </div>
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
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#555555] dark:text-gray-400">
              Confirm Password
            </label>
            <input
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
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
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-600"></div>
          <span className="mx-4 text-[#555555] dark:text-gray-400">or</span>
          <div className="flex-grow border-t border-neutral-300 dark:border-neutral-600"></div>
        </div>

        {/* Google Sign-Up Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full px-4 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-neutral-50 dark:hover:bg-neutral-600 transition duration-300"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-[#555555] dark:text-gray-200 font-medium">
            Sign Up with Google
          </span>
        </button>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-[#555555] dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text hover:opacity-80 transition duration-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
