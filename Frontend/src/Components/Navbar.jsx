import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('jwtToken'); // Remove the token
    setIsLoggedIn(false); // Update state
    navigate('/'); // Redirect to home page
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-white dark:bg-[#1A1A1A] shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/">
          <div className="flex items-center">
            <img src={Logo} alt="SmartPhysio Logo" className="h-12 w-12 mr-3" />
            <h1 className="text-2xl font-semibold text-[#2E4F4F] dark:text-[#F4F4F4] font-sans">
              SmartPhysio
            </h1>
          </div>
        </Link>

        {/* Navigation Buttons */}
        <nav className="hidden md:flex gap-8">
          {/* Always show Home link */}
          <Link
            to="/"
            className="text-[#2E4F4F] dark:text-[#F4F4F4] hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-medium font-sans"
          >
            Home
          </Link>

          {/* Show additional links if user is logged in */}
          {isLoggedIn && (
            <>
              <Link
                to="/exercise"
                className="text-[#2E4F4F] dark:text-[#F4F4F4] hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-medium font-sans"
              >
                Exercise
              </Link>
              <Link
                to="/chat"
                className="text-[#2E4F4F] dark:text-[#F4F4F4] hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-medium font-sans"
              >
                Chat
              </Link>
              <Link
                to="/dashboard"
                className="text-[#2E4F4F] dark:text-[#F4F4F4] hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-medium font-sans"
              >
                Dashboard
              </Link>
            </>
          )}

          {/* Always show About and Pricing links */}
          <Link
            to="/about"
            className="text-[#2E4F4F] dark:text-[#F4F4F4] hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-medium font-sans"
          >
            About
          </Link>
          <Link
            to="/pricing"
            className="text-[#2E4F4F] dark:text-[#F4F4F4] hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-medium font-sans"
          >
            Pricing
          </Link>
        </nav>

        {/* Conditional Buttons */}
        <div className="flex gap-4">
          {isLoggedIn ? (
            // Show logout button if user is logged in
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white rounded-full hover:from-[#FF8F81] hover:to-[#FFE186] transition duration-300 font-sans"
            >
              Logout
            </button>
          ) : (
            // Show login and signup buttons if user is not logged in
            <>
              <Link
                to="/signin"
                className="px-6 py-2 text-[#2E4F4F] dark:text-[#F4F4F4] font-medium hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-sans"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white rounded-full hover:from-[#FF8F81] hover:to-[#FFE186] transition duration-300 font-sans"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;