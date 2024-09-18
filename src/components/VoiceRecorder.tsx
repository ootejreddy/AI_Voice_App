"use client";

import { useState, useEffect } from "react";
import { useDeepgram } from "../lib/contexts/DeepgramContext";
import { addDocument } from "../lib/firebase/firebaseUtils";
import { motion } from "framer-motion";
import { useNotes } from "../lib/contexts/NotesContext";

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const {
    connectToDeepgram,
    disconnectFromDeepgram,
    connectionState,
    realtimeTranscript,
  } = useDeepgram();
  const { triggerUpdate } = useNotes();

  const handleStartRecording = async () => {
    await connectToDeepgram();
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    disconnectFromDeepgram();
    setIsRecording(false);

    if (realtimeTranscript) {
      await addDocument("notes", {
        text: realtimeTranscript,
        timestamp: new Date().toISOString(),
      });
      triggerUpdate();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`w-full py-4 px-6 rounded-full text-white font-bold text-lg transition-colors ${
          isRecording
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {isRecording && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-6"
          />
          <p className="text-lg text-gray-700 text-center">
            {realtimeTranscript || "Listening..."}
          </p>
        </div>
      )}
    </div>
  );
}
