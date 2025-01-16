import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] min-h-screen py-20 ">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl text-center font-bold text-[#333333] dark:text-gray-200 mb-12">
          About <span className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text">SmartPhysio</span>
        </h2>

        {/* Introduction Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#2E4F4F] dark:text-[#FF6F61] mb-4">
            Struggling to bounce back from an injury? Feeling lost in your recovery journey?
          </h3>
          <p className="text-lg text-[#555555] dark:text-gray-300">
            SmartPhysio is here to transform your rehabilitation experience into a powerful comeback story!
          </p>
          <p className="text-lg text-[#555555] dark:text-gray-300 mt-4">
            Imagine having a personal coach right in your pocket—one who not only guides you through tailored exercise plans but also monitors your form in real-time! With SmartPhysio, you’ll receive expert-level rehab support anytime, anywhere, making recovery not just effective but also enjoyable.
          </p>
        </div>

        {/* How to Get Started Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#2E4F4F] dark:text-[#FF6F61] mb-4">
            How to Get Started?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1: Onboarding */}
            <div className="bg-white dark:bg-[#2E4F4F] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-xl font-bold text-[#6C9BCF] dark:text-[#FF6F61] mb-2">Onboarding</h4>
              <p className="text-[#555555] dark:text-gray-300">
                Share your injury details and goals—let’s get personal!
              </p>
            </div>

            {/* Step 2: Tailored Workouts */}
            <div className="bg-white dark:bg-[#2E4F4F] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-xl font-bold text-[#6C9BCF] dark:text-[#FF6F61] mb-2">Tailored Workouts</h4>
              <p className="text-[#555555] dark:text-gray-300">
                Get custom exercise plans designed just for you!
              </p>
            </div>

            {/* Step 3: Real-Time Feedback */}
            <div className="bg-white dark:bg-[#2E4F4F] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-xl font-bold text-[#6C9BCF] dark:text-[#FF6F61] mb-2">Real-Time Feedback</h4>
              <p className="text-[#555555] dark:text-gray-300">
                Perfect your form with instant corrections as you work out!
              </p>
            </div>

            {/* Step 4: Track Your Progress */}
            <div className="bg-white dark:bg-[#2E4F4F] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-xl font-bold text-[#6C9BCF] dark:text-[#FF6F61] mb-2">Track Your Progress</h4>
              <p className="text-[#555555] dark:text-gray-300">
                Celebrate milestones and stay motivated every step of the way!
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose SmartPhysio Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#2E4F4F] dark:text-[#FF6F61] mb-4">
            Why Choose SmartPhysio?
          </h3>
          <p className="text-lg text-[#555555] dark:text-gray-300">
            Many people struggle with recovery, feeling isolated and unsure of their progress. SmartPhysio bridges that gap, providing both emotional support and expert guidance. Your AI coach will cheer you on through every challenge!
          </p>
        </div>

        {/* Meet Your AI Rehab Coach Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#2E4F4F] dark:text-[#FF6F61] mb-4">
            Meet Your AI Rehab Coach
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Coach Feature 1: Motivation */}
            <div className="bg-white dark:bg-[#2E4F4F] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-xl font-bold text-[#6C9BCF] dark:text-[#FF6F61] mb-2">Motivation</h4>
              <p className="text-[#555555] dark:text-gray-300">
                Motivate you to stay committed to your recovery.
              </p>
            </div>

            {/* Coach Feature 2: Best Practices */}
            <div className="bg-white dark:bg-[#2E4F4F] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-xl font-bold text-[#6C9BCF] dark:text-[#FF6F61] mb-2">Best Practices</h4>
              <p className="text-[#555555] dark:text-gray-300">
                Teach you the best practices for every exercise.
              </p>
            </div>

            {/* Coach Feature 3: Celebrate Achievements */}
            <div className="bg-white dark:bg-[#2E4F4F] p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              <h4 className="text-xl font-bold text-[#6C9BCF] dark:text-[#FF6F61] mb-2">Celebrate Achievements</h4>
              <p className="text-[#555555] dark:text-gray-300">
                Celebrate your achievements and keep you focused on your goals!
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[#2E4F4F] dark:text-[#FF6F61] mb-4">
            Ready to Transform Your Recovery Journey?
          </h3>
          <p className="text-lg text-[#555555] dark:text-gray-300 mb-8">
            Join us at SmartPhysio and turn your setbacks into comebacks—because healing should be as fierce as you are!
          </p>
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white font-medium rounded-full shadow-md hover:shadow-lg transition"
          >
            Get Started Now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;