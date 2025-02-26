import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [exerciseSessions, setExerciseSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          navigate('/signin');
          return;
        }

        const recResponse = await fetch('http://localhost:8000/api/recommendations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!recResponse.ok) {
          const errorData = await recResponse.json();
          throw new Error(errorData.message || 'Failed to fetch recommendations');
        }

        const recResult = await recResponse.json();
        if (!recResult.success || !Array.isArray(recResult.recommendations)) {
          throw new Error(recResult.message || 'Invalid recommendations data');
        }

        setRecommendations(recResult.recommendations);

        const sessResponse = await fetch('http://localhost:8000/exercise/sessions', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!sessResponse.ok) {
          const errorData = await sessResponse.json();
          throw new Error(errorData.message || 'Failed to fetch exercise sessions');
        }

        const sessResult = await sessResponse.json();
        setExerciseSessions(sessResult.data || sessResult.sessions || []);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const deleteRecommendation = async (recId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8000/api/recommendations/${recId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete recommendation');
      }

      setRecommendations(recommendations.filter(rec => rec._id !== recId));
    } catch (err) {
      console.error('Delete Recommendation Error:', err);
      setError(err.message);
    }
  };

  const deleteExerciseSession = async (sessionId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8000/exercise/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete exercise session');
      }

      setExerciseSessions(exerciseSessions.filter(session => session._id !== sessionId));
    } catch (err) {
      console.error('Delete Session Error:', err);
      setError(err.message);
    }
  };

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

  const getPerformanceColor = (formScore) => {
    if (formScore >= 80) return 'text-green-600';
    if (formScore >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceLabel = (formScore) => {
    if (formScore >= 80) return 'Excellent';
    if (formScore >= 60) return 'Good';
    if (formScore >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#333333] dark:text-gray-200 mb-8 mt-16 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text">
          Your Recovery Dashboard
        </h1>

        {loading && (
          <div className="text-center text-[#555555] dark:text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF6F61] border-t-transparent mx-auto"></div>
            <p className="mt-4">Loading your data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Recommendations Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#333333] dark:text-gray-200 mb-6">Your Recommendations</h2>
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((recommendation, index) => (
                    <motion.div
                      key={recommendation._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative"
                    >
                      <button
                        onClick={() => deleteRecommendation(recommendation._id)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
                        title="Remove recommendation"
                      >
                        ✕
                      </button>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text">
                          {recommendation.injuryType.toUpperCase()}
                        </h3>
                        <span className="text-sm text-[#555555] dark:text-gray-400">
                          {formatDate(recommendation.acceptanceDate)}
                        </span>
                      </div>
                      <div className="space-y-3 mb-4">
                        <StatItem label="Duration" value={recommendation.duration || 'N/A'} />
                        <StatItem label="Severity" value={recommendation.severity || 'N/A'} />
                        <StatItem 
                          label="Details" 
                          value={recommendation.details 
                            ? recommendation.details.slice(0, 50) + (recommendation.details.length > 50 ? '...' : '') 
                            : 'N/A'} 
                        />
                      </div>
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-[#333333] dark:text-gray-200 mb-2">Recommended Exercises</h4>
                        <div className="space-y-2">
                          {recommendation.exercises && recommendation.exercises.length > 0 ? (
                            recommendation.exercises.map((exercise, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-neutral-700 rounded-lg"
                              >
                                <div className="p-1 bg-[#FF6F61] rounded-full">
                                  <span className="text-white text-sm">🏥</span>
                                </div>
                                <div>
                                  <p className="text-[#333333] dark:text-gray-200 font-medium">{exercise.name || 'Unnamed'}</p>
                                  <p className="text-sm text-[#555555] dark:text-gray-400">
                                    {exercise.description 
                                      ? exercise.description.slice(0, 30) + (exercise.description.length > 30 ? '...' : '') 
                                      : 'No description'}
                                  </p>
                                  <p className="text-sm text-[#6C9BCF] dark:text-[#6C9BCF]">
                                    {exercise.duration || 'N/A'} | {exercise.frequency || 'N/A'}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-[#555555] dark:text-gray-400">No exercises available</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-[#555555] dark:text-gray-400 py-6">
                  <p>No recommendations yet. Start with the <button onClick={() => navigate('/chat')} className="text-[#FF6F61] dark:text-[#FFD166] hover:underline">SmartPhysio AI Advisor</button>.</p>
                </div>
              )}
            </section>

            {/* Exercise History Section */}
            <section>
              <h2 className="text-2xl font-semibold text-[#333333] dark:text-gray-200 mb-6">Exercise History</h2>
              {exerciseSessions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exerciseSessions.map((session, index) => (
                    <motion.div
                      key={session._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative"
                    >
                      <button
                        onClick={() => deleteExerciseSession(session._id)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
                        title="Remove session"
                      >
                        ✕
                      </button>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-transparent bg-clip-text">
                          {session.exerciseType?.replace(/_/g, ' ').toUpperCase() || 'Unnamed Session'}
                        </h3>
                        <span className="text-sm text-[#555555] dark:text-gray-400">
                          {formatDate(session.timestamp)}
                        </span>
                      </div>
                      <div className="space-y-3 mb-4">
                        <StatItem label="Duration" value={`${session.duration || 0}s`} />
                        <StatItem label="Total Reps" value={session.reps || 'N/A'} />
                        <StatItem label="Avg Time/Rep" value={`${session.avgTimePerRep || 0}s`} />
                        <StatItem label="Energy" value={`${session.energy || 0} J`} />
                        <StatItem label="Form Score" value={`${session.formScore || 0}%`} />
                      </div>
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <StatItem 
                          label="Performance" 
                          value={getPerformanceLabel(session.formScore || 0)} 
                          className={getPerformanceColor(session.formScore || 0)} 
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-[#555555] dark:text-gray-400 py-6">
                  <p>No exercise sessions recorded yet.</p>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

const StatItem = ({ label, value, className = "text-[#333333] dark:text-gray-200" }) => (
  <div className="flex justify-between items-center">
    <span className="text-[#555555] dark:text-gray-400">{label}:</span>
    <span className={`font-semibold ${className}`}>{value}</span>
  </div>
);

export default Dashboard;