import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdInfo, MdPlayCircle } from 'react-icons/md'; // React Icons

const exercises = {
    'Push-ups': 'An exercise to strengthen the upper body, particularly the chest and triceps.',
    'Squats': 'A lower body exercise that targets the thighs, hips, and buttocks.',
    'Lunges': 'An exercise focusing on the legs, enhancing strength and balance.',
    'Plank': 'A core-strengthening exercise that also works the shoulders and back.',
    'Bridges': 'Targets the glutes and lower back while improving core stability.',
    'Clamshells': 'Strengthens the hip muscles and improves hip stability.',
    'Bird Dogs': 'Enhances balance and coordination while working on core stability.',
    'Dead Bugs': 'Strengthens the core while focusing on coordination between limbs.',
    'Shoulder Press': 'An exercise to build shoulder and upper arm strength.',
    'Bicep Curls': 'Strengthens the biceps and improves arm aesthetics.',
    'Tricep Dips': 'Targets the triceps, helping to tone and strengthen the arms.',
    'Calf Raises': 'Focuses on strengthening the calf muscles.',
    'Seated Row': 'Targets the back muscles, improving posture and strength.',
    'Wall Angels': 'Improves shoulder mobility and posture.',
    'Chest Stretch': 'A flexibility exercise for the chest and shoulders.',
    'Hamstring Stretch': 'Stretches the hamstring muscles to enhance flexibility.',
    'Quadriceps Stretch': 'Stretches the quadriceps for improved flexibility.',
    'Hip Flexor Stretch': 'Stretches the hip flexors to improve range of motion.',
    'Spinal Twist': 'Enhances spinal mobility and flexibility.',
    'Side Lunges': 'Strengthens the inner thighs and improves balance.',
    'Glute Bridges': 'Focuses on the glutes and lower back for better stability.',
    'Mountain Climbers': 'A full-body exercise that increases heart rate and builds endurance.',
    'Leg Raises': 'Strengthens the lower abdominal muscles.',
    'Standing Balance': 'Improves balance and stability through weight shifting.',
    'Side Plank': 'Strengthens the oblique muscles and stabilizes the core.',
    'Torso Rotation': 'Enhances core flexibility and stability.',
    'Wrist Flexor Stretch': 'Stretches the wrist and forearm muscles.',
    'Ankle Circles': 'Improves ankle mobility and flexibility.',
    'T-Pose Exercise': 'Strengthens the upper back and shoulders.',
    'Knee to Chest Stretch': 'Stretches the lower back and glutes.',
    'Pigeon Pose': 'A yoga pose that stretches the hips and glutes.',
};

const categories = {
    'All': Object.keys(exercises),
    'Strength': ['Push-ups', 'Squats', 'Lunges', 'Plank'],
    'Flexibility': ['Hamstring Stretch', 'Spinal Twist', 'Pigeon Pose'],
};

const Exercise = () => {
    const { exerciseName } = useParams(); // Extract the exerciseName parameter
    const [open, setOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [category, setCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleInfoClick = (exercise) => {
        setSelectedExercise(exercise);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedExercise(null);
    };

    const handleExerciseClick = (exerciseName) => {
        const formattedName = exerciseName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/exercise/${formattedName}`);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredExercises = categories[category].filter((exercise) =>
        exercise.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If exerciseName is present, render the exercise details
    if (exerciseName) {
        const formattedExerciseName = exerciseName.replace(/-/g, ' ');
        const exercise = exercises[formattedExerciseName];

        return (
            <div className="min-h-screen bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center text-[#333333] dark:text-gray-200 mb-8">
                        {formattedExerciseName}
                    </h1>
                    <p className="text-center text-[#555555] dark:text-gray-400">{exercise}</p>
                </div>
            </div>
        );
    }

    // Otherwise, render the exercise list
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center text-[#333333] dark:text-gray-200 mb-8">
                    SmartPhysio Exercise Guide
                </h1>

                {/* Filter by Category */}
                <div className="mb-8">
                    <label htmlFor="category" className="block text-sm font-medium text-[#555555] dark:text-gray-400">
                        Filter by Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                        className="mt-1 block w-full p-2 border border-[#6C9BCF] dark:border-[#FFD166] rounded-md shadow-sm bg-white dark:bg-neutral-800 text-[#333333] dark:text-gray-200 focus:ring-[#FF6F61] focus:border-[#FF6F61]"
                    >
                        <option value="All">All</option>
                        <option value="Strength">Strength</option>
                        <option value="Flexibility">Flexibility</option>
                    </select>
                </div>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-2 mb-8 border border-[#6C9BCF] dark:border-[#FFD166] rounded-md shadow-sm bg-white dark:bg-neutral-800 text-[#333333] dark:text-gray-200 focus:ring-[#FF6F61] focus:border-[#FF6F61]"
                />

                {/* Exercise Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredExercises.map((exercise, index) => (
                        <div
                            key={index}
                            className="cursor-pointer bg-white dark:bg-neutral-800 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105"
                            onClick={() => handleExerciseClick(exercise)}
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-[#333333] dark:text-gray-200">{exercise}</h2>
                                <p className="mt-2 text-sm text-[#555555] dark:text-gray-400">{exercises[exercise]}</p>
                                <div className="flex justify-center mt-4 space-x-4">
                                    <button
                                        aria-label="info"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleInfoClick({ name: exercise, description: exercises[exercise] });
                                        }}
                                        className="text-[#FF6F61] hover:text-[#FFD166]"
                                    >
                                        <MdInfo className="w-6 h-6" /> {/* React Icon */}
                                    </button>
                                    <button
                                        aria-label="youtube"
                                        onClick={() => handleExerciseClick(exercise)}
                                        className="text-[#FF6F61] hover:text-[#FFD166]"
                                    >
                                        <MdPlayCircle className="w-6 h-6" /> {/* React Icon */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for Exercise Description */}
                {open && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white dark:bg-neutral-800 rounded-lg w-full max-w-md p-6">
                            <h2 className="text-2xl font-bold text-[#333333] dark:text-gray-200 mb-4">
                                {selectedExercise?.name} - Description
                            </h2>
                            <p className="text-[#555555] dark:text-gray-400">{selectedExercise?.description}</p>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleClose}
                                    className="px-4 py-2 text-[#FF6F61] hover:text-[#FFD166]"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Exercise;