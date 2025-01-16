import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] border-t border-neutral-800 py-16">
      <div className="container mx-auto px-6">
        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Getting Started with SmartPhysio
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Exercise Library
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Recovery Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Supported Devices
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  AI Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  User Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Updates & Releases
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Webinars
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Physio Meetups
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Health Conferences
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Recovery Challenges
                </a>
              </li>
              <li>
                <a href="#" className="text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition duration-300">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Credits Section */}
        <div className="mt-12 border-t border-neutral-800 pt-8 text-center">
          <p className="text-[#555555] dark:text-gray-400">
            Made with ❤️ by{' '}
            <a
              href="#JHOLA_G"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text hover:opacity-80 transition duration-300"
            >
              JHOLA_G
            </a>
          </p>
          <p className="text-[#555555] dark:text-gray-400 mt-2">
            Icons by{' '}
            <a
              href="https://icons8.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text hover:opacity-80 transition duration-300"
            >
              Icons8
            </a>{' '}
            and{' '}
            <a
              href="https://fontawesome.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text hover:opacity-80 transition duration-300"
            >
              Font Awesome
            </a>
          </p>
          <p className="text-[#555555] dark:text-gray-400 mt-2">
            Images from{' '}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text hover:opacity-80 transition duration-300"
            >
              Unsplash
            </a>{' '}
            and{' '}
            <a
              href="https://pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text hover:opacity-80 transition duration-300"
            >
              Pexels
            </a>
          </p>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center">
          <p className="text-[#555555] dark:text-gray-400">
            © {new Date().getFullYear()} SmartPhysio. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;