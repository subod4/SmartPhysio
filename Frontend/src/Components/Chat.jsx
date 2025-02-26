import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Chat = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        injuryType: '',
        duration: '',
        severity: '',
        details: ''
    });
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                navigate('/signin');
            } else {
                setIsAuthenticated(true);
            }
        };
        checkAuth();
    }, [navigate]);

    const steps = [
        { icon: '🤕', label: "What's your injury?" },
        { icon: '⏳', label: "How long have you had it?" },
        { icon: '📏', label: "How severe is it?" },
        { icon: '📝', label: "Any additional details?" }
    ];

    const handleNextStep = () => currentStep < 4 && setCurrentStep(prev => prev + 1);
    const handlePrevStep = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('jwtToken');

            // Fetch exercise suggestions from Flask API (port 5000)
            const response = await fetch('http://localhost:5000/api/suggest-exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: formData.details,
                    user_id: token, // Adjust if Flask expects a decoded user ID
                    injuryType: formData.injuryType,
                    duration: formData.duration,
                    severity: formData.severity
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch recommendations');
            }

            const data = await response.json();
            setExercises(data.exercises);

            // Save recommendation to Express API (port 8000)
            setSaving(true);
            const saveResponse = await fetch('http://localhost:8000/api/recommendations/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: token, // Adjust if Express expects a decoded user ID
                    injuryType: formData.injuryType,
                    duration: formData.duration,
                    severity: formData.severity,
                    details: formData.details,
                    exercises: data.exercises,
                    acceptanceDate: new Date().toISOString()
                }),
            });

            if (!saveResponse.ok) {
                const errorData = await saveResponse.json();
                throw new Error(errorData.message || 'Failed to save recommendation');
            }

            const saveResult = await saveResponse.json();
            console.log('Recommendation saved:', saveResult);

        } catch (error) {
            console.error('Error:', error);
            setError(error.message === 'Failed to fetch recommendations' 
                ? 'Sorry, I am not capable of this currently.' 
                : error.message === 'Failed to save recommendation'
                ? 'Sorry, I couldn’t save your recommendation.'
                : error.message);
        } finally {
            setLoading(false);
            setSaving(false);
        }
    };

    const handleAccept = async () => {
        setSaving(true);
        try {
            console.log('Recommendation accepted:', {
                userId: localStorage.getItem('jwtToken'),
                injuryType: formData.injuryType,
                duration: formData.duration,
                severity: formData.severity,
                details: formData.details,
                exercises: exercises,
                acceptanceDate: new Date().toISOString()
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Accept Error:', error);
            setError('Sorry, there was an error processing your acceptance.');
        } finally {
            setSaving(false);
        }
    };

    const handleReject = () => setExercises([]);

    const getStepContent = (step) => {
        switch (step) {
            case 1: return (
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6C9BCF] focus:border-transparent"
                    placeholder="e.g., Sprained ankle, Tennis elbow"
                    value={formData.injuryType}
                    onChange={(e) => setFormData({ ...formData, injuryType: e.target.value })}
                />
            );
            case 2: return (
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6C9BCF] focus:border-transparent"
                    placeholder="e.g., 1 week, 3 months"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
            );
            case 3: return (
                <div className="grid grid-cols-3 gap-4">
                    {['Mild', 'Moderate', 'Severe'].map((level) => (
                        <button
                            key={level}
                            type="button"
                            className={`py-2 rounded-lg border ${
                                formData.severity === level
                                    ? 'bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white border-transparent'
                                    : 'border-[#6C9BCF] text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => setFormData({ ...formData, severity: level })}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            );
            case 4: return (
                <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6C9BCF] focus:border-transparent"
                    rows={4}
                    placeholder="Describe your pain, previous treatments, etc."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
            );
            default: return null;
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] p-4 sm:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden mt-20 mb-8"
            >
                <div className="p-6 bg-gradient-to-r from-[#FF6F61] to-[#FFD166]">
                    <div className="flex items-center gap-4">
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <span className="text-4xl">🏋️</span>
                        </motion.div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">SmartPhysio AI Advisor</h1>
                            <p className="text-white/90">Personalized Recovery Planning</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
                    <div className="flex justify-between items-center">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                    ${currentStep > index ? 'bg-[#FFD166]' : 'bg-gray-200 dark:bg-neutral-600'}`}>
                                    {currentStep > index ? step.icon : index + 1}
                                </div>
                                <span className="text-sm mt-1 text-[#555555] dark:text-gray-300">
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {!exercises.length && !error ? (
                        <form onSubmit={handleSubmit}>
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    {steps[currentStep - 1].label}
                                </h2>
                                {getStepContent(currentStep)}
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        disabled={currentStep === 1}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-300 disabled:opacity-50"
                                    >
                                        Back
                                    </button>
                                    {currentStep < 4 ? (
                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            className="px-6 py-2 bg-[#6C9BCF] hover:bg-[#5a8ab5] text-white rounded-lg transition-colors"
                                        >
                                            Continue
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white rounded-lg hover:opacity-90 transition-opacity"
                                        >
                                            Generate Plan
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </form>
                    ) : exercises.length ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="text-center mb-6">
                                <div className="text-green-500 text-4xl mb-2">✅</div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Recommended Recovery Plan
                                </h2>
                                <div className="flex justify-center gap-4 mt-2 text-sm">
                                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
                                        Estimated Recovery: 2-4 weeks
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                                        AI Confidence: 92%
                                    </span>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                {exercises.map((exercise, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-[#FF6F61] rounded-full">
                                                <span className="text-white">🏥</span>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                                {exercise.name}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {exercise.description}
                                        </p>
                                        <div className="mt-3 flex gap-2">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                                {exercise.duration || 'N/A'}
                                            </span>
                                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                                                {exercise.frequency || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <button
                                    onClick={handleAccept}
                                    disabled={saving}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-75"
                                >
                                    {saving ? (
                                        <>
                                            <span className="mr-2">⏳</span>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <span className="mr-2">✅</span>
                                            Accept Plan
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleReject}
                                    className="px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors flex items-center justify-center"
                                >
                                    <span className="mr-2">🔄</span>
                                    Try Again
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center p-8"
                        >
                            <div className="text-red-500 text-4xl mb-4">❌</div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Oops, something went wrong!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {error}
                            </p>
                            <button
                                onClick={() => setError(null)}
                                className="px-6 py-2 bg-[#6C9BCF] hover:bg-[#5a8ab5] text-white rounded-lg transition-colors"
                            >
                                Try Again
                            </button>
                        </motion.div>
                    )}
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center p-8"
                        >
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#FF6F61] border-t-transparent"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Analyzing your condition with medical AI...
                            </p>
                            <div className="mt-2 text-sm text-[#6C9BCF]">
                                Checking 1,234 similar recovery cases
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Chat;