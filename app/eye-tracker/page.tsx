// app/eye-tracker/page.tsx
"use client";

import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';

// Define WebGazer type for TypeScript
declare global {
  interface Window {
    webgazer: any;
  }
}

export default function EyeTracker() {
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [isTracking, setIsTracking] = useState(false);
  const [gazeData, setGazeData] = useState<{ x: number; y: number } | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptLoaded) return;

    // Initialize WebGazer
    const initWebGazer = async () => {
      try {
        console.log("Initializing WebGazer...");
        
        // Set up WebGazer with the specific configuration you provided
        window.webgazer.setGazeListener(function(data: any, elapsedTime: number) {
          if (data == null) {
            return;
          }
          const xprediction = data.x; // these x coordinates are relative to the viewport
          const yprediction = data.y; // these y coordinates are relative to the viewport
          // console.log(elapsedTime); // elapsed time is based on time since begin was called
          
          // Update state with gaze data
          setGazeData({ x: xprediction, y: yprediction });
          
          // Update cursor position
          if (cursorRef.current) {
            cursorRef.current.style.left = `${xprediction}px`;
            cursorRef.current.style.top = `${yprediction}px`;
          }
        }).begin();
        
        setIsTracking(true);
      } catch (error) {
        console.error("Error initializing WebGazer:", error);
      }
    };

    if (isCalibrating) {
      initWebGazer();
    }

    // Cleanup function
    return () => {
      if (window.webgazer) {
        window.webgazer.end();
        console.log("WebGazer terminated");
      }
    };
  }, [scriptLoaded, isCalibrating]);

  const handleCalibrationComplete = () => {
    setIsCalibrating(false);
    console.log("Calibration completed");
  };

  const handleStartTracking = () => {
    setIsCalibrating(true);
  };

  const handleStopTracking = () => {
    if (window.webgazer) {
      window.webgazer.end();
      setIsTracking(false);
      setGazeData(null);
      console.log("Tracking stopped");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <Script 
        src="/webgazer.js"
        onLoad={() => {
          console.log("WebGazer script loaded");
          setScriptLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load WebGazer script");
        }}
      />
      
      <h1 className="text-3xl font-bold mb-6">Eye Tracking Demo</h1>
      
      <div className="mb-8 p-4 bg-white shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Status</h2>
        <p className="mb-2">WebGazer: {scriptLoaded ? "Loaded" : "Loading..."}</p>
        <p className="mb-2">Tracking: {isTracking ? "Active" : "Inactive"}</p>
        {gazeData && (
          <p className="mb-2">
            Gaze Position: X: {gazeData.x.toFixed(2)}, Y: {gazeData.y.toFixed(2)}
          </p>
        )}
      </div>
      
      <div className="flex space-x-4 mb-6">
        {!isTracking ? (
          <button
            onClick={handleStartTracking}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            disabled={!scriptLoaded}
          >
            Start Tracking
          </button>
        ) : (
          <>
            <button
              onClick={handleCalibrationComplete}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Complete Calibration
            </button>
            <button
              onClick={handleStopTracking}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Stop Tracking
            </button>
          </>
        )}
      </div>
      
      {isCalibrating && (
        <div className="mb-8 p-4 bg-yellow-100 border border-yellow-400 rounded-lg w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Calibration Instructions</h2>
          <p>
            Click on each of the dots below to calibrate the eye tracker.
            Try to keep your head still and look directly at each point as you click.
          </p>
        </div>
      )}
      
      {/* Calibration points - simple grid for demonstration */}
      {isCalibrating && (
        <div className="grid grid-cols-3 gap-16 w-full max-w-md mb-8">
          {[...Array(9)].map((_, index) => (
            <div 
              key={index} 
              className="h-6 w-6 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-700 transition"
            />
          ))}
        </div>
      )}
      
      {/* Gaze cursor - visualizes where the user is looking */}
      <div 
        ref={cursorRef}
        className="fixed h-6 w-6 rounded-full bg-red-500 pointer-events-none opacity-50 z-[9999]"
        style={{ display: gazeData ? 'block' : 'none' }}
      />

      
      {/* Target area for testing eye tracking */}
      {isTracking && !isCalibrating && (
        <div className="mt-8 border-2 border-gray-300 rounded-lg p-4 w-full max-w-lg h-64 flex items-center justify-center">
          <p className="text-lg">Look around this area to test the eye tracking</p>
        </div>
      )}
    </div>
  );
}