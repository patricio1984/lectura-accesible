// src/features/tts/hooks/useSafeAddToHistory.ts
"use client";

import { useAudioHistory } from "./useAudioHistory";
import { toast } from "sonner";

export function useSafeAddToHistory() {
  const { addEntry } = useAudioHistory();

  return (text: string, voiceId: string): boolean => {
    const added = addEntry({ text, voiceId });
    if (!added) {
      toast.warning("Este texto ya fue leído con esta voz");
    }
    return added;
  };
}
