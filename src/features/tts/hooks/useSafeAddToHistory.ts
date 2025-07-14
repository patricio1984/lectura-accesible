"use client";

import { useAudioHistory } from "./useAudioHistory";
import { toast } from "sonner";

export function useSafeAddToHistory() {
  const { addEntry } = useAudioHistory();

  return (text: string, voiceId: string, speed: number = 1.0): boolean => {
    const added = addEntry({ text, voiceId, speed });
    if (!added) {
      toast.warning("Este texto ya fue leído con esta voz");
    }
    return added;
  };
}
