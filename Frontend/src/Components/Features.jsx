import React from 'react';

function Features() {
  return (
    <div className="bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] py-20">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide text-[#333333] dark:text-gray-200">
          Discover How{' '}
          <span className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text">
            SmartPhysio
          </span>{' '}
          Empowers Your Recovery
        </h2>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Feature 1: Injury-Specific Programs */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white h-12 w-12 p-2 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343M17.657 18.657L6.343 7.343M17.657 18.657l-1.414-1.414M6.343 7.343l1.414-1.414"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mt-6 mb-4">
              Injury-Specific Programs
            </h3>
            <p className="text-[#555555] dark:text-gray-300">
              Receive customized exercise plans tailored to your specific injury for optimal recovery and faster results.
            </p>
          </div>

          {/* Feature 2: Real-Time Form Corrections */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white h-12 w-12 p-2 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mt-6 mb-4">
              Real-Time Form Corrections
            </h3>
            <p className="text-[#555555] dark:text-gray-300">
              Get instant feedback on your form during exercises, ensuring you're performing them correctly to avoid further injury.
            </p>
          </div>

          {/* Feature 3: Progress Tracking */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white h-12 w-12 p-2 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mt-6 mb-4">
              Progress Tracking
            </h3>
            <p className="text-[#555555] dark:text-gray-300">
              Monitor your progress over time with detailed reports on your recovery journey and stay motivated with achievable milestones.
            </p>
          </div>

          {/* Feature 4: Detailed Exercise Guides */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white h-12 w-12 p-2 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mt-6 mb-4">
              Detailed Exercise Guides
            </h3>
            <p className="text-[#555555] dark:text-gray-300">
              Access easy-to-follow guides for each exercise, complete with step-by-step instructions and video demonstrations.
            </p>
          </div>

          {/* Feature 5: Collaborative Care */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white h-12 w-12 p-2 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mt-6 mb-4">
              Collaborative Care
            </h3>
            <p className="text-[#555555] dark:text-gray-300">
              Share your progress and reports with your healthcare providers or physical therapists for seamless collaboration on your recovery.
            </p>
          </div>

          {/* Feature 6: Data-Driven Insights */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white h-12 w-12 p-2 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text mt-6 mb-4">
              Data-Driven Insights
            </h3>
            <p className="text-[#555555] dark:text-gray-300">
              Leverage data analytics to better understand your rehabilitation progress and make adjustments to your program as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;