import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Navbar() {
  const navigate=useNavigate()

  function handlelogin(){
    navigate('/signin')
  }
const handlesignup=()=>navigate('/signup')
  
  
  return (
    <header className="w-full fixed top-0 z-50 bg-white dark:bg-[#1A1A1A] shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link
            to="/"
          >
          </Link>
        <div className="flex items-center">
          <img
            src={Logo}
            alt="SmartPhysio Logo"
            className="h-12 w-12 mr-3"
          />
          <h1 className="text-2xl font-semibold text-[#2E4F4F] dark:text-[#F4F4F4] font-sans">
            SmartPhysio
          </h1>
        </div>

        {/* Navigation Buttons */}
        <nav className="hidden md:flex gap-8">
          <Link
            to="/"
            className="text-[#2E4F4F] dark:text-[#F4F4F4] hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-medium font-sans"
          >
            Home
          </Link>
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
          <Link
            to="#contact"
            className="text-[#2E4F4F] dark:text-[#F4F4F4] hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-medium font-sans"
          >
            Contact
          </Link>
        </nav>

        {/* Sign In / Get Started Buttons */}
        <div className="flex gap-4">
          <button  onClick ={ handlelogin}className="px-6 py-2 text-[#2E4F4F] dark:text-[#F4F4F4] font-medium hover:text-[#FF6F61] dark:hover:text-[#FF6F61] transition duration-300 font-sans">
           
            Sign In
          </button>
          <button onClick ={ handlesignup} className="px-6 py-2 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white rounded-full hover:from-[#FF8F81] hover:to-[#FFE186] transition duration-300 font-sans">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;