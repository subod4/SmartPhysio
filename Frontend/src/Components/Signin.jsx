import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

function SignIn() {
  // Function to handle Google Sign-In
  const handleGoogleSignIn = () => {
    // Add your Google Sign-In logic here
    console.log('Signing in with Google...');
  };

  return (
    <div className="bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] min-h-screen flex items-center justify-center p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 max-w-md w-full transform hover:scale-105 transition duration-300">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mb-6">
          Sign In
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#555555] dark:text-gray-400">
              Email
            </label>
            <input
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
            >
              Sign In
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
        >
          
          <FcGoogle className="w-5 h-5" />      
          <span className="text-[#555555] dark:text-gray-200 font-medium">
            Sign In with Google
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