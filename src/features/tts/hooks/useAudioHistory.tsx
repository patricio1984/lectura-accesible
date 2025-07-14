import { useAudioHistoryStore } from "../stores/audioHistoryStore";

export function useAudioHistory() {
  return useAudioHistoryStore();
}
