import React from 'react';
import { MdDashboard, MdFitnessCenter, MdTrendingUp, MdNotifications, MdSettings, MdLogout } from 'react-icons/md';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] flex">
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-neutral-800 shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#333333] dark:text-gray-200 mb-8">
                    SmartPhysio
                </h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <a href="#" className="flex items-center text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition-colors duration-300">
                                <MdDashboard className="w-6 h-6 mr-2" />
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition-colors duration-300">
                                <MdFitnessCenter className="w-6 h-6 mr-2" />
                                Exercises
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition-colors duration-300">
                                <MdTrendingUp className="w-6 h-6 mr-2" />
                                Progress
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition-colors duration-300">
                                <MdNotifications className="w-6 h-6 mr-2" />
                                Notifications
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition-colors duration-300">
                                <MdSettings className="w-6 h-6 mr-2" />
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-[#555555] dark:text-gray-400 hover:text-[#FF6F61] transition-colors duration-300">
                                <MdLogout className="w-6 h-6 mr-2" />
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-[#333333] dark:text-gray-200 mb-8">
                    Dashboard
                </h1>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-[#555555] dark:text-gray-400">Total Exercises</h3>
                        <p className="text-2xl font-bold text-[#333333] dark:text-gray-200">45</p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-[#555555] dark:text-gray-400">Completed Sessions</h3>
                        <p className="text-2xl font-bold text-[#333333] dark:text-gray-200">120</p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-[#555555] dark:text-gray-400">Active Goals</h3>
                        <p className="text-2xl font-bold text-[#333333] dark:text-gray-200">5</p>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-[#555555] dark:text-gray-400">Calories Burned</h3>
                        <p className="text-2xl font-bold text-[#333333] dark:text-gray-200">1,200 kcal</p>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-[#333333] dark:text-gray-200 mb-6">Recent Activities</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-[#333333] dark:text-gray-200">Push-ups</h3>
                                <p className="text-sm text-[#555555] dark:text-gray-400">Completed 3 sets of 15 reps</p>
                            </div>
                            <span className="text-sm text-[#555555] dark:text-gray-400">2 hours ago</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-[#333333] dark:text-gray-200">Squats</h3>
                                <p className="text-sm text-[#555555] dark:text-gray-400">Completed 4 sets of 12 reps</p>
                            </div>
                            <span className="text-sm text-[#555555] dark:text-gray-400">5 hours ago</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-[#333333] dark:text-gray-200">Plank</h3>
                                <p className="text-sm text-[#555555] dark:text-gray-400">Held for 2 minutes</p>
                            </div>
                            <span className="text-sm text-[#555555] dark:text-gray-400">1 day ago</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;