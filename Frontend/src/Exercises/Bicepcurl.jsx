import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import bicep from "/bicep.mp4";

const ExercisePose = () => {
  // Refs and state management
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("Press Start to begin");
  const [camera, setCamera] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [stage, setStage] = useState("down");
  const [showReport, setShowReport] = useState(false);
  const [exerciseStats, setExerciseStats] = useState({
    duration: 0,
    reps: 0,
    avgTimePerRep: 0
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const stageRef = useRef(stage);

  // Track stage changes
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Mediapipe initialization
  useEffect(() => {
    let cameraInstance;
    let timerInterval;

    const loadPoseLibrary = async () => {
      try {
        // Dynamic script loading
        const poseScript = document.createElement("script");
        poseScript.src = "https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js";
        poseScript.async = true;

        const cameraScript = document.createElement("script");
        cameraScript.src = "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";
        cameraScript.async = true;

        document.body.appendChild(poseScript);
        document.body.appendChild(cameraScript);

        poseScript.onload = () => {
          const pose = new window.Pose({
            locateFile: (file) => {
              return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            },
          });

          pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          });

          pose.onResults((results) => {
            if (!results.poseLandmarks) {
              setFeedback("No person detected");
              return;
            }

            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            drawArmPose(results, canvasCtx);
            calculateExercise(results);
          });

          cameraScript.onload = () => {
            if (isCameraActive && !isPaused) {
              if (videoRef.current) {
                cameraInstance = new window.Camera(videoRef.current, {
                  onFrame: async () => {
                    await pose.send({ image: videoRef.current });
                  },
                  width: 640,
                  height: 480,
                });
                cameraInstance.start();
                setCamera(cameraInstance);
                setFeedback("Camera started. Begin your exercise.");
                timerInterval = setInterval(() => setTimer((prev) => prev + 1), 1000);
              }
            } else if (cameraInstance) {
              cameraInstance.stop();
              clearInterval(timerInterval);
            }
          };
        };

        // Error handling for script loading
        poseScript.onerror = () => setFeedback("Failed to load Mediapipe Pose library");
        cameraScript.onerror = () => setFeedback("Failed to load Mediapipe Camera library");
      } catch (error) {
        console.error("Error loading Mediapipe:", error);
        setFeedback(error?.message || "Pose detection initialization failed");
      }
    };

    loadPoseLibrary();

    return () => {
      if (cameraInstance) cameraInstance.stop();
      clearInterval(timerInterval);
    };
  }, [isCameraActive, isPaused]);

  // Angle calculation utility
  const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    return angle > 180 ? 360 - angle : angle;
  };

  // Exercise analysis logic
  const calculateExercise = (results) => {
    const landmarks = results.poseLandmarks;
    if (!landmarks) return;

    // Landmark indices for right arm
    const [rs, re, rw, rh] = [12, 14, 16, 24].map(i => landmarks[i]);
    if (!rs || !re || !rw || !rh) return;

    const elbowAngle = calculateAngle(rs, re, rw);
    const upperArmAngle = calculateAngle(rs, re, rh);

    // Stage detection
    let newStage = stageRef.current;
    if (elbowAngle < 90) newStage = "up";
    else if (elbowAngle > 160) newStage = "down";

    // Rep counting
    if (newStage !== stageRef.current) {
      if (stageRef.current === "up" && newStage === "down") {
        setRepCount(prev => prev + 1);
      }
      setStage(newStage);
    }

    // Feedback system
    if (upperArmAngle < 150) {
      setFeedback("❗ Keep upper arm still! No swinging!");
    } else if (upperArmAngle < 170) {
      setFeedback("⚠️ Maintain upper arm position!");
    } else {
      if (stageRef.current === "up") {
        if (elbowAngle < 45) setFeedback("🎯 Perfect form! Maintain!");
        else if (elbowAngle < 70) setFeedback("💪 Good, aim higher!");
        else setFeedback("↗️ Curl higher to shoulder!");
      } else {
        if (elbowAngle > 175) setFeedback("✅ Full extension! Good!");
        else if (elbowAngle > 160) setFeedback("↘️ Extend fully!");
      }
    }

    // Rep completion feedback
    if (stageRef.current === "up" && newStage === "down") {
      setFeedback("🔥 Good rep! Controlled movement!");
    }
  };

  // Pose drawing utilities
  const drawArmPose = (results, canvasCtx) => {
    const landmarks = results.poseLandmarks;
    if (!landmarks) return;

    canvasCtx.save();
    canvasCtx.lineWidth = 4;
    canvasCtx.strokeStyle = "lime";

    // Draw arm lines
    const drawLine = (start, end) => {
      canvasCtx.beginPath();
      canvasCtx.moveTo(landmarks[start].x * 640, landmarks[start].y * 480);
      canvasCtx.lineTo(landmarks[end].x * 640, landmarks[end].y * 480);
      canvasCtx.stroke();
    };

    // Right arm connections
    drawLine(12, 14);
    drawLine(14, 16);
    
    // Left arm connections
    drawLine(11, 13);
    drawLine(13, 15);

    // Shoulder connection
    drawLine(11, 12);

    // Draw landmarks
    [11, 12, 13, 14, 15, 16].forEach(index => {
      const lm = landmarks[index];
      canvasCtx.beginPath();
      canvasCtx.arc(lm.x * 640, lm.y * 480, 5, 0, 2 * Math.PI);
      canvasCtx.fillStyle = "aqua";
      canvasCtx.fill();
    });

    canvasCtx.restore();
  };

  // Camera controls
  const handleStartCamera = () => {
    setIsCameraActive(true);
    setTimer(0);
    setRepCount(0);
    setStage("down");
    setFeedback("Get ready to start!");
    setShowReport(false);
  };

  const handleStopCamera = async () => {
    try {
      if (camera) camera.stop();
      
      // Save exercise session
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setSaveError('Authentication required');
        navigate('/login');
        return;
      }

      const sessionData = {
        duration: timer,
        reps: repCount,
        avgTimePerRep: repCount > 0 ? (timer / repCount).toFixed(1) : 0,
        exerciseType: 'bicep_curl'
      };

      setExerciseStats(sessionData);
      setShowReport(true);

      // API call
      setIsSaving(true);
      const response = await fetch('http://localhost:8000/exercise/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sessionData)
      });

      if (!response.ok) throw new Error(await response.text());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      setSaveError(error.message);
      if (error.message.includes('auth')) {
        localStorage.removeItem('jwtToken');
        navigate('/login');
      }
    } finally {
      setIsSaving(false);
      setIsCameraActive(false);
      setIsPaused(false);
      setFeedback("Session saved. Review summary below.");
    }
  };

  const handlePauseCamera = () => {
    setIsPaused(!isPaused);
    setFeedback(isPaused ? "Resuming..." : "Paused...");
  };

  // Report modal component
  const ReportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg w-96 shadow-2xl">
        <h2 className="text-3xl font-bold text-[#333333] dark:text-gray-200 mb-6 text-center">
          Exercise Summary
        </h2>

        {isSaving && <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-lg">Saving...</div>}
        {isSaved && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">Saved!</div>}
        {saveError && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">Error: {saveError}</div>}

        <div className="space-y-4 mb-6">
          <StatItem label="Duration" value={`${exerciseStats.duration}s`} />
          <StatItem label="Reps Completed" value={exerciseStats.reps} />
          <StatItem label="Avg Time/Rep" value={`${exerciseStats.avgTimePerRep}s`} />
        </div>

        <button
          onClick={() => setShowReport(false)}
          className="w-full bg-gradient-to-r from-[#6C9BCF] to-[#FF6F61] text-white py-3 rounded-lg hover:opacity-90 transition duration-300"
        >
          Close Report
        </button>
      </div>
    </div>
  );

  // Stat item component
  const StatItem = ({ label, value }) => (
    <div className="flex justify-between">
      <span className="text-[#555555] dark:text-gray-400">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );

  // Main component render
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] p-8">
      <h1 className="text-4xl font-bold text-center text-[#333333] dark:text-gray-200 mb-8">
        AI Bicep Curl Coach
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Feed Section */}
        <div className="relative w-full h-[480px] rounded-lg overflow-hidden shadow-xl bg-black">
          <video ref={videoRef} className="absolute w-full h-full object-cover" playsInline />
          <canvas ref={canvasRef} className="absolute w-full h-full z-20" width="640" height="480" />
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-[#333333] dark:text-gray-200 mb-4">Live Stats</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatItem label="Timer" value={`${timer}s`} />
              <StatItem label="Reps" value={repCount} />
              <StatItem label="Current Stage" value={stage.toUpperCase()} />
              <StatItem label="Form Quality" value={feedback.includes("❗") ? "POOR" : feedback.includes("⚠️") ? "FAIR" : "GOOD"} />
            </div>

            <div className="p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg">
              <p className="text-center text-[#555555] dark:text-gray-300 font-medium">
                Real-time Feedback: <span className="text-[#FF6F61] dark:text-[#FFD166]">{feedback}</span>
              </p>
            </div>

            <div className="mt-6 flex space-x-4 justify-center">
              <ControlButton
                onClick={handleStartCamera}
                disabled={isCameraActive}
                colors="from-[#FF6F61] to-[#FFD166]"
                label="Start"
              />
              <ControlButton
                onClick={handlePauseCamera}
                visible={isCameraActive}
                colors="from-[#FFD166] to-[#6C9BCF]"
                label={isPaused ? "Resume" : "Pause"}
              />
              <ControlButton
                onClick={handleStopCamera}
                visible={isCameraActive || isPaused}
                colors="from-[#6C9BCF] to-[#FF6F61]"
                label="Stop"
              />
            </div>
          </div>

          {/* Tutorial Section */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-[#333333] dark:text-gray-200 mb-4">Proper Form Tutorial</h2>
            <video controls src={bicep} className="w-full rounded-lg shadow-md aspect-video" />
          </div>
        </div>
      </div>

      {showReport && <ReportModal />}
    </div>
  );
};

// Reusable control button component
const ControlButton = ({ onClick, disabled, visible = true, colors, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`bg-gradient-to-r ${colors} text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300 ${
      visible ? "inline-block" : "hidden"
    }`}
  >
    {label}
  </button>
);

export default ExercisePose;