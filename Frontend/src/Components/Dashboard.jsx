import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [exerciseSessions, setExerciseSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseSessions = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:8000/exercise/sessions', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch sessions');
        }

        setExerciseSessions(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseSessions();
  }, [navigate]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getPerformanceColor = (avgTime) => {
    if (avgTime < 5) return 'text-green-600';
    if (avgTime < 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#333333] dark:text-gray-200 mb-8 mt-16">
          Workout History
        </h1>

        {loading && (
          <div className="text-center text-[#555555] dark:text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF6F61] border-t-transparent mx-auto"></div>
            <p className="mt-4">Loading your workouts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exerciseSessions.map((session) => (
              <div 
                key={session._id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text">
                    {session.exerciseType.replace(/_/g, ' ').toUpperCase()}
                  </h3>
                  <span className="text-sm text-[#555555] dark:text-gray-400">
                    {formatDate(session.date)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#555555] dark:text-gray-400">Duration:</span>
                    <span className="font-semibold text-[#333333] dark:text-gray-200">
                      {session.duration}s
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#555555] dark:text-gray-400">Total Reps:</span>
                    <span className="font-semibold text-[#333333] dark:text-gray-200">
                      {session.reps}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#555555] dark:text-gray-400">Avg Time/Rep:</span>
                    <span className={`font-semibold ${getPerformanceColor(session.avgTimePerRep)}`}>
                      {session.avgTimePerRep}s
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#555555] dark:text-gray-400">Performance:</span>
                    <span className={`font-medium ${getPerformanceColor(session.avgTimePerRep)}`}>
                      {session.avgTimePerRep < 5 ? 'Excellent' : 
                       session.avgTimePerRep < 8 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && exerciseSessions.length === 0 && (
          <div className="text-center text-[#555555] dark:text-gray-400 py-12">
            <p className="text-xl mt-16 mb-4">No workouts recorded yet!</p>
            <p className="text-lg">
              Start your first workout in the{' '}
              <button 
                onClick={() => navigate('/exercise')}
                className="text-[#FF6F61] dark:text-[#FFD166] hover:underline"
              >
                Exercise Tracker
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;