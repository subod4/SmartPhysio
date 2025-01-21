import React, { useRef, useState, useEffect } from "react";
import { Pose } from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import bicep from "/bicep.mp4";

const ExercisePose = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [feedback, setFeedback] = useState("Press Start to begin");
  const [camera, setCamera] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [stage, setStage] = useState("down"); // Tracks the stage of the curl

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

        poseScript.onerror = () => {
          setFeedback("Failed to load Mediapipe Pose library");
        };

        cameraScript.onerror = () => {
          setFeedback("Failed to load Mediapipe Camera library");
        };
      } catch (error) {
        console.error("Error loading the Mediapipe Pose library:", error);
        setFeedback(error?.message || "Error initializing Pose detection.");
      }
    };

    loadPoseLibrary();

    return () => {
      if (cameraInstance) {
        cameraInstance.stop();
      }
      clearInterval(timerInterval);
    };
  }, [isCameraActive, isPaused]);

  const calculateExercise = (results) => {
    const landmarks = results.poseLandmarks;
    const leftWrist = landmarks[15];
    const rightWrist = landmarks[16];
  
    const leftWristVelocity = Math.sqrt(
      Math.pow(leftWrist.x - prevLeftWrist.x, 2) + Math.pow(leftWrist.y - prevLeftWrist.y, 2)
    );
    const rightWristVelocity = Math.sqrt(
      Math.pow(rightWrist.x - prevRightWrist.x, 2) + Math.pow(rightWrist.y - prevRightWrist.y, 2)
    );
  
    const avgVelocity = (leftWristVelocity + rightWristVelocity) / 2;
  
    if (avgVelocity > VELOCITY_THRESHOLD && stage === "up") {
      setStage("down");
      setFeedback("Lowering arm.");
    } else if (avgVelocity > VELOCITY_THRESHOLD && stage === "down") {
      setStage("up");
      setRepCount((prev) => prev + 1);
      setFeedback("Curl completed.");
    }
  
    // Save the current wrist positions for the next frame
    prevLeftWrist = leftWrist;
    prevRightWrist = rightWrist;
  };
  

  const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  const drawArmPose = (results, canvasCtx) => {
    const poseLandmarks = results.poseLandmarks;
    const armLandmarks = [11, 13, 15, 12, 14, 16];

    canvasCtx.save();
    canvasCtx.lineWidth = 4;
    canvasCtx.strokeStyle = "lime";

    const drawLine = (start, end) => {
      canvasCtx.beginPath();
      canvasCtx.moveTo(poseLandmarks[start].x * 640, poseLandmarks[start].y * 480);
      canvasCtx.lineTo(poseLandmarks[end].x * 640, poseLandmarks[end].y * 480);
      canvasCtx.stroke();
    };

    drawLine(11, 13);
    drawLine(13, 15);
    drawLine(12, 14);
    drawLine(14, 16);
    drawLine(11, 12);

    armLandmarks.forEach((index) => {
      const landmark = poseLandmarks[index];
      canvasCtx.beginPath();
      canvasCtx.arc(landmark.x * 640, landmark.y * 480, 5, 0, 2 * Math.PI);
      canvasCtx.fillStyle = "aqua";
      canvasCtx.fill();
    });

    canvasCtx.restore();
  };

  const handleStartCamera = () => {
    setIsCameraActive(true);
    setTimer(0);
    setRepCount(0);
    setStage("down");
    setFeedback("Get ready to start!");
  };

  const handleStopCamera = () => {
    if (camera) {
      camera.stop();
    }
    setIsCameraActive(false);
    setIsPaused(false);
    setTimer(0);
    setRepCount(0);
    setStage("down");
    setFeedback("Exercise stopped. All parameters reset.");
  };

  const handlePauseCamera = () => {
    const newPauseState = !isPaused;
    setIsPaused(newPauseState);
    setFeedback(newPauseState ? "Paused. Resume to continue." : "Resumed!");

    if (!newPauseState && camera) {
      camera.start();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6C9BCF] to-[#F4F4F4] dark:from-[#2E4F4F] dark:to-[#1A1A1A] p-8">
      <h1 className="text-4xl font-bold text-center text-[#333333] dark:text-gray-200 mb-8">Bicep Tracker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera feed with skeleton */}
        <div className="relative w-full h-[480px] rounded-lg overflow-hidden shadow-xl">
          <video ref={videoRef} className="absolute w-full h-full z-10" playsInline />
          <canvas ref={canvasRef} className="absolute w-full h-full z-20" width="640" height="480" />
        </div>

        {/* Right side: Recommended card and tutorial video */}
        <div className="space-y-6">
          {/* Recommended Card */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-[#333333] dark:text-gray-200 mb-4">Recommended</h2>
            <div className="space-y-2">
              <p className="text-[#555555] dark:text-gray-400">Difficulty: <span className="font-semibold">Easy</span></p>
              <p className="text-[#555555] dark:text-gray-400">Duration: <span className="font-semibold">{timer} seconds</span></p>
              <p className="text-[#555555] dark:text-gray-400">Reps: <span className="font-semibold">{repCount}</span></p>
            </div>
            <div className="mt-6 p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg">
              <p className="text-[#555555] dark:text-gray-300 font-medium">Feedback: <span className="text-[#FF6F61] dark:text-[#FFD166]">{feedback}</span></p>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleStartCamera}
                className="bg-gradient-to-r from-[#FF6F61] to-[#FFD166] text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300 disabled:opacity-50"
                disabled={isCameraActive}
              >
                Start
              </button>
              <button
                onClick={handlePauseCamera}
                className={`bg-gradient-to-r from-[#FFD166] to-[#6C9BCF] text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300 ${
                  isCameraActive ? "inline-block" : "hidden"
                }`}
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={handleStopCamera}
                className={`bg-gradient-to-r from-[#6C9BCF] to-[#FF6F61] text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300 ${
                  isCameraActive || isPaused ? "inline-block" : "hidden"
                }`}
              >
                Stop
              </button>
            </div>
          </div>

          {/* Tutorial Video */}
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-[#333333] dark:text-gray-200 mb-4">Tutorial Video</h2>
            <video controls src={bicep} className="w-full rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePose;