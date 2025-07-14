"use client";

import React, { useState } from "react";
import { useAudioHistory } from "../hooks/useAudioHistory";
import axios from "axios";
import { Loader2, Play, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AudioPlayer } from "@/common/ui/AudioPlayer";

export const AudioHistoryList = () => {
  const { history, removeEntry } = useAudioHistory();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlay = async (
    entryId: string,
    text: string,
    voiceId: string,
    speed: number
  ) => {
    setLoadingId(entryId);
    setError(null);
    setAudioUrl(null);
    try {
      const response = await axios.post(
        "/api/tts",
        { text, voiceId, speed },
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(response.data);
      setAudioUrl(url);
      setPlayingId(entryId);
    } catch {
      setError("Error al reproducir el audio.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <ul className="space-y-4">
      <AnimatePresence mode="popLayout">
        {history.map((item) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="border p-4 rounded bg-white dark:bg-gray-800"
          >
            <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
              {item.text.length > 120
                ? item.text.slice(0, 120) + "…"
                : item.text}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Velocidad: {item.speed.toFixed(2)}x
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-12">
              <button
                onClick={() =>
                  handlePlay(item.id, item.text, item.voiceId, item.speed)
                }
                className="cursor-pointer flex items-center gap-2 text-lg font-medium text-blue-600 hover:underline disabled:opacity-50"
                disabled={loadingId === item.id}
              >
                {loadingId === item.id ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {loadingId === item.id ? "Cargando" : "Reproducir"}
              </button>
              <button
                onClick={() => removeEntry(item.id)}
                className="cursor-pointer flex items-center gap-2 text-lg font-medium text-red-500 hover:underline"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
            {error && playingId === item.id && (
              <p className="text-red-600 text-sm mt-1" role="alert">
                {error}
              </p>
            )}
            {audioUrl && playingId === item.id && (
              <div className="space-y-2 mt-2">
                <AudioPlayer src={audioUrl} />
              </div>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};
