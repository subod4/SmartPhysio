import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineUserCircle } from 'react-icons/hi';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    navigate('/');
    setIsMenuOpen(false); // Close menu on logout
  };

  const navLinks = [
    { to: "/", label: "Home", show: true },
    { to: "/exercise", label: "Exercise", show: isLoggedIn },
    { to: "/chat", label: "Chat", show: isLoggedIn },
    { to: "/dashboard", label: "Dashboard", show: isLoggedIn },
    { to: "/about", label: "About", show: true },
    { to: "/pricing", label: "Pricing", show: true },
  ];

  return (
    <header className="w-full fixed top-0 z-50 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src={Logo} 
              alt="SmartPhysio Logo" 
              className="h-10 w-10 transition-transform group-hover:rotate-[-8deg]" 
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] bg-clip-text text-transparent">
              SmartPhysio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => link.show && (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#FF6F61] transition-colors
                         after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF6F61] 
                         hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button 
                  onClick={handleLogout}
                  className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white 
                            rounded-lg hover:shadow-lg hover:shadow-[#FF6F61]/30 transition-all duration-300"
                >
                  <HiOutlineUserCircle className="mr-2 text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="hidden md:inline px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-[#FF6F61] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="hidden md:inline px-4 py-2 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white 
                            rounded-lg hover:shadow-lg hover:shadow-[#FF6F61]/30 transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-[#FF6F61] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white dark:bg-[#1A1A1A] shadow-lg border-t border-gray-100 dark:border-neutral-800">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => link.show && (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-100 dark:border-neutral-800">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white text-center rounded-lg hover:shadow-lg"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;