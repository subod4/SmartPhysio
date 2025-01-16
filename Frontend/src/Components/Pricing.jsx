import React from 'react';

function Pricing() {
  return (
    <div id="pricing" className="bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] py-16">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide text-[#333333] dark:text-gray-200">
          Pricing
        </h2>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Basic Plan */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mb-4">
              Basic
            </h3>
            <p className="text-5xl font-bold text-[#333333] dark:text-gray-200 mt-6">
              $0<span className="text-[#555555] dark:text-gray-400 text-lg">/Month</span>
            </p>
            <ul className="mt-8 space-y-4">
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Access to basic exercise library
              </li>
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                AI-generated rehab plans
              </li>
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Progress tracking
              </li>
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Community support
              </li>
            </ul>
            <button className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white font-medium rounded-lg hover:opacity-90 transition duration-300">
              Subscribe
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mb-4">
              Pro<span className="text-sm text-[#FF6F61] ml-2">(Most Popular)</span>
            </h3>
            <p className="text-5xl font-bold text-[#333333] dark:text-gray-200 mt-6">
              $15<span className="text-[#555555] dark:text-gray-400 text-lg">/Month</span>
            </p>
            <ul className="mt-8 space-y-4">
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Advanced exercise library
              </li>
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Real-time feedback & form corrections
              </li>
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Detailed analytics & reports
              </li>
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Progress sharing with healthcare providers
              </li>
            </ul>
            <button className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white font-medium rounded-lg hover:opacity-90 transition duration-300">
              Subscribe
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mb-4">
              Premium
            </h3>
            <p className="text-5xl font-bold text-[#333333] dark:text-gray-200 mt-6">
              $50<span className="text-[#555555] dark:text-gray-400 text-lg">/Month</span>
            </p>
            <ul className="mt-8 space-y-4">
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Unlimited access to all exercises
              </li>
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                One-on-one virtual therapist consultations
              </li>
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Personalized rehab plan adjustments
              </li>
              <li className="text-[#555555] dark:text-gray-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-[#FF6F61]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Priority support
              </li>
            </ul>
            <button className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white font-medium rounded-lg hover:opacity-90 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;