import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import bicep from "/bicep.mp4";

const ExercisePose = () => {
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
    avgTimePerRep: 0,
    energy: 0,
    formScore: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [energy, setEnergy] = useState(0);
  const prevElbowAngleRef = useRef(null);
  const prevTimestampRef = useRef(null);
  const stageRef = useRef(stage);
  const formQualityCounts = useRef({ poor: 0, fair: 0, good: 0 });

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Mediapipe initialization
  useEffect(() => {
    let cameraInstance;
    let timerInterval;

    const loadPoseLibrary = async () => {
      try {
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
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
          });

          pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          });

          pose.onResults((results) => {
            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            if (results.poseLandmarks) {
              drawArmPose(results, canvasCtx);
              calculateExercise(results);
            } else {
              setFeedback("No person detected");
            }
          });

          cameraScript.onload = () => {
            if (isCameraActive && !isPaused && videoRef.current) {
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
          };
        };

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

  // Exercise analysis with velocity and energy
  const calculateExercise = (results) => {
    const landmarks = results.poseLandmarks;
    if (!landmarks) return;

    const [rs, re, rw] = [12, 14, 16].map((i) => landmarks[i]);
    if (!rs || !re || !rw) return;

    const elbowAngle = calculateAngle(rs, re, rw);
    const upperArmAngle = calculateAngle(rs, re, landmarks[24]);
    const currentTimestamp = performance.now();

    if (prevElbowAngleRef.current !== null && prevTimestampRef.current !== null) {
      const deltaAngle = elbowAngle - prevElbowAngleRef.current;
      const deltaTime = (currentTimestamp - prevTimestampRef.current) / 1000;
      const angularVelocity = Math.abs(deltaAngle / deltaTime);
      setVelocity(angularVelocity.toFixed(1));

      const armMass = 2;
      const gravity = 9.81;
      const armLength = 0.3;
      const heightChange = armLength * (1 - Math.cos(elbowAngle * Math.PI / 180));
      const workPerRep = armMass * gravity * heightChange;
      if (stageRef.current === "up" && elbowAngle < 90 && deltaAngle < 0) {
        setEnergy((prev) => prev + workPerRep);
      }
    }

    prevElbowAngleRef.current = elbowAngle;
    prevTimestampRef.current = currentTimestamp;

    let newStage = stageRef.current;
    if (elbowAngle < 90) newStage = "up";
    else if (elbowAngle > 160) newStage = "down";

    if (newStage !== stageRef.current) {
      if (stageRef.current === "up" && newStage === "down") {
        setRepCount((prev) => prev + 1);
      }
      setStage(newStage);
    }

    let formQuality = "GOOD";
    if (upperArmAngle < 150) {
      setFeedback("❗ Keep upper arm still!");
      formQuality = "POOR";
    } else if (velocity > 200) {
      setFeedback("⚠️ Too fast! Slow down!");
      formQuality = "FAIR";
    } else if (velocity < 30 && stageRef.current === "down") {
      setFeedback("⚠️ Too slow! Extend faster!");
      formQuality = "FAIR";
    } else if (stageRef.current === "up") {
      if (elbowAngle < 45) {
        setFeedback("🎯 Perfect form!");
        formQuality = "GOOD";
      } else if (elbowAngle < 70) {
        setFeedback("👍 Good, aim higher!");
        formQuality = "GOOD";
      } else {
        setFeedback("↗️ Curl higher!");
        formQuality = "FAIR";
      }
    } else {
      if (elbowAngle > 175) {
        setFeedback("✅ Full extension!");
        formQuality = "GOOD";
      } else {
        setFeedback("↘️ Extend fully!");
        formQuality = "FAIR";
      }
    }

    formQualityCounts.current[formQuality.toLowerCase()] += 1;
  };

  // Pose drawing utilities
  const drawArmPose = (results, canvasCtx) => {
    const landmarks = results.poseLandmarks;
    if (!landmarks) return;

    canvasCtx.save();
    canvasCtx.lineWidth = 4;
    canvasCtx.strokeStyle = "lime";

    const drawLine = (start, end) => {
      canvasCtx.beginPath();
      canvasCtx.moveTo(landmarks[start].x * 640, landmarks[start].y * 480);
      canvasCtx.lineTo(landmarks[end].x * 640, landmarks[end].y * 480);
      canvasCtx.stroke();
    };

    drawLine(12, 14);
    drawLine(14, 16);

    [12, 14, 16].forEach((index) => {
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
    setVelocity(0);
    setEnergy(0);
    prevElbowAngleRef.current = null;
    prevTimestampRef.current = null;
    formQualityCounts.current = { poor: 0, fair: 0, good: 0 };
    setFeedback("Get ready to start!");
    setShowReport(false);
  };

  const handleStopCamera = async () => {
    if (camera) camera.stop();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setSaveError("Authentication required");
      navigate("/login");
      return;
    }

    const totalFrames = formQualityCounts.current.poor + formQualityCounts.current.fair + formQualityCounts.current.good;
    const formScore = totalFrames > 0 
      ? (
          (formQualityCounts.current.good * 100 + formQualityCounts.current.fair * 50) / totalFrames
        ).toFixed(1)
      : 0;

    const sessionData = {
      duration: timer,
      reps: repCount,
      avgTimePerRep: repCount > 0 ? (timer / repCount).toFixed(1) : 0,
      energy: energy.toFixed(1),
      exerciseType: "bicep_curl",
      formScore: formScore,
    };

    setExerciseStats(sessionData);
    setShowReport(true);

    try {
      setIsSaving(true);
      const response = await fetch("http://localhost:8000/exercise/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sessionData),
      });
      if (!response.ok) throw new Error(await response.text());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
      setIsCameraActive(false);
      setIsPaused(false);
      setFeedback("Session saved.");
    }
  };

  const handlePauseCamera = () => {
    setIsPaused(!isPaused);
    setFeedback(isPaused ? "Resuming..." : "Paused...");
  };

  // Report modal component
  const ReportModal = () => {
    const formScore = parseFloat(exerciseStats.formScore);
    let performanceRating = "Poor";
    if (formScore >= 80) performanceRating = "Excellent";
    else if (formScore >= 60) performanceRating = "Good";
    else if (formScore >= 40) performanceRating = "Fair";

    return (
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
            <StatItem label="Energy Expended" value={`${exerciseStats.energy} J`} />
            <StatItem label="Form Score" value={`${formScore}%`} />
            <StatItem label="Performance" value={performanceRating} />
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
  };

  const StatItem = ({ label, value }) => (
    <div className="flex justify-between">
      <span className="text-[#555555] dark:text-gray-400">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] p-8">
      <h1 className="text-4xl font-bold text-center text-[#333333] dark:text-gray-200 mb-8">
        Mathematical Bicep Curl Coach
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative w-full h-[480px] rounded-lg overflow-hidden shadow-xl bg-black">
          <video ref={videoRef} className="absolute w-full h-full object-cover" playsInline />
          <canvas ref={canvasRef} className="absolute w-full h-full z-20" width="640" height="480" />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-[#333333] dark:text-gray-200 mb-4">Live Stats</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatItem label="Timer" value={`${timer}s`} />
              <StatItem label="Reps" value={repCount} />
              <StatItem label="Current Stage" value={stage.toUpperCase()} />
              <StatItem label="Velocity" value={`${velocity} °/s`} />
              <StatItem label="Energy" value={`${energy.toFixed(1)} J`} />
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