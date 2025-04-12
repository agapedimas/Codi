"use client";

// referensi code dari repo https://github.com/sambowenhughes

// Import necessary modules and components
import { useEffect, useState, useRef } from "react";
import styles from './tempVico.module.css'
import axios from 'axios'

// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

// ini mending indo apa english defaultnya bebas (untuk inggris 'en-US')
export default function MicrophoneComponent({ language = 'id-ID' }: { language?: string }) {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingComplete, setRecordingComplete] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isPaused, setIsPaused] = useState(false);
    const [codeChangesResult, setCodeChanges] = useState<string>("")
    
    // Create a ref to store the full transcript
    const fullTranscriptRef = useRef("");
    
    // Create a timeout ref for pause detection
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const recognitionRef = useRef<any>(null);

    const startRecording = () => {
        setIsRecording(true);
        setRecordingComplete(false);

        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = language; 

        // Event handler for speech recognition results
        recognitionRef.current.onresult = (event: any) => {
            const currentTranscript = event.results[event.results.length - 1][0].transcript;
            
            // If this is a final result (not interim)
            if (event.results[event.results.length - 1].isFinal) {
                // Append the new transcript to the full transcript
                fullTranscriptRef.current += currentTranscript;
                setTranscript(fullTranscriptRef.current.trim());
                
                // Reset the pause timeout
                if (pauseTimeoutRef.current) {
                    clearTimeout(pauseTimeoutRef.current);
                }
                
                // Set a new pause timeout
                pauseTimeoutRef.current = setTimeout(() => {
                    // This will execute if there's a pause in speaking
                    setIsPaused(true);
                    
                    // Restart recognition after a pause
                    if (isRecording && recognitionRef.current) {
                        recognitionRef.current.stop();
                        
                        // Give the system a moment before restarting
                        setTimeout(() => {
                            if (isRecording) {
                                startRecognitionEngine();
                                setIsPaused(false);
                            }
                        }, 300);
                    }
                }, 2000); // 2-second pause detection
            } else {
                // Show interim results
                setTranscript(fullTranscriptRef.current + " " + currentTranscript);
            }
            
            // Log the recognition results and update the transcript state
            // console.log(event.results);
        };
        
        // Handle recognition end
        recognitionRef.current.onend = () => {
            // If we're still supposed to be recording but recognition ended
            // (this can happen naturally after pauses)
            if (isRecording && !recordingComplete && !isPaused) {
                startRecognitionEngine();
            }
        };
        
        // Error handler
        recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            
            // Restart on error if we're still recording
            if (isRecording && !recordingComplete) {
                setTimeout(() => {
                    startRecognitionEngine();
                }, 1000);
            }
        };

        // Start the speech recognition
        startRecognitionEngine();
    };
    
    // Helper function to start the recognition engine
    const startRecognitionEngine = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Error starting recognition:", e);
                // If already started, stop and restart
                try {
                    recognitionRef.current.stop();
                    setTimeout(() => {
                        recognitionRef.current.start();
                    }, 100);
                } catch (err) {
                    console.error("Failed to restart recognition:", err);
                }
            }
        }
    };

    // Cleanup effect when the component unmounts
    useEffect(() => {
        return () => {
            // Stop the speech recognition if it's active
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            
            // Clear any timeout
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current);
            }
        };
    }, []);

    // Function to stop recording
    const stopRecording = () => {
        setIsRecording(false);
        setRecordingComplete(true);
        
        if (recognitionRef.current) {
            // Stop the speech recognition and mark recording as complete
            recognitionRef.current.stop();
            console.log(transcript) // print hasil transcript
        }
        
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
        }
    };

    // Toggle recording state and manage recording actions
    const handleToggleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            // Reset transcript when starting a new recording
            fullTranscriptRef.current = "";
            setTranscript("");
            startRecording();
        } else {
            stopRecording();
        }
    };


    const contohKode = 
    `
    public class Main {
			public static void main(String[] args) {
				System.out.println("halo dim");
			}
        }
    `
    const sendToGemini = async () =>{
        const data = new FormData()
        data.append('audioTranscript', transcript)
        data.append('codeToModify', contohKode)
        
        const response = await axios.post('/api/gemineh', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        try {
            setCodeChanges(response.data.text)
        } catch (error) {
            setCodeChanges("tidak ada hasil");
            console.error('Error transcribing audio:', error);
        }
    }
    
    // Render the microphone component with appropriate UI based on recording state
    return (
        <div className="flex items-center justify-center h-screen w-full">
        <div className="w-full">
            <div className="w-1/4 m-auto rounded-md border p-4">
                <div className="flex-1 flex w-full justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                    {recordingComplete ? "Recorded" : "Recording"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                    {recordingComplete
                        ? "Ready to record"
                        : "Start speaking..."}
                    </p>
                </div>
                {isRecording && (
                    <div className={`rounded-full w-4 h-4 bg-red-400 ${isPaused ? '' : 'animate-pulse'}`} />
                )}
                </div>

                {transcript && (
                <div className="border rounded-md p-2 h-fullm mt-4">
                    <p className="mb-0">{transcript}</p>
                </div>
                )}
            </div>

            <div className="flex items-center justify-center gap-10 w-full mt-5">
            {isRecording ? (
                // Button for stopping recording
                <button
                onClick={handleToggleRecording}
                className={`${styles.tombolmerah} mt-10 m-auto flex items-center justify-center rounded-full w-20 h-20 focus:outline-none`}
                >
                <svg
                    className="h-12 w-12 "
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                </button>
            ) : (
                // Button for starting recording
                <button
                onClick={handleToggleRecording}
                className={`${styles.tombolbiru} mt-10 m-auto flex items-center justify-center rounded-full w-20 h-20 focus:outline-none `}
                >
                <svg
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-white"
                >
                    <path
                    fill="white" // Change fill color to the desired color
                    d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                    />
                </svg>
                </button>
            )}
            </div>
            {
                transcript && recordingComplete ? (
                    <div className="w-full flex justify-center items-center mt-5">
                        <button
                        onClick={sendToGemini}
                        className={`w-12 h-12 my-10 ${styles.tombolmejik}`}
                        >Magic</button>
                    </div>
                ): (
                    ""
                )
            }

            <div className="w-full h-fit text-white mt-10">
                {codeChangesResult}
            </div>
        </div>
    </div>
    );
}