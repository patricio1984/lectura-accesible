import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export type AudioEntry = {
  id: string;
  text: string;
  voiceId: string;
  speed: number;
};

type AudioHistoryStore = {
  history: AudioEntry[];
  addEntry: (entry: Omit<AudioEntry, "id">) => boolean;
  removeEntry: (id: string) => void;
  clearAll: () => void;
};

export const useAudioHistoryStore = create<AudioHistoryStore>()(
  persist(
    (set, get) => ({
      history: [],

      addEntry: (entry: Omit<AudioEntry, "id">) => {
        const exists = get().history.some(
          (e) =>
            e.text === entry.text &&
            e.voiceId === entry.voiceId &&
            e.speed === entry.speed
        );
        if (exists) return false;

        const newEntry = { ...entry, id: nanoid() };
        set((state) => ({
          history: [newEntry, ...state.history],
        }));
        return true;
      },

      removeEntry: (id: string) => {
        set((state) => ({
          history: state.history.filter((entry) => entry.id !== id),
        }));
      },

      clearAll: () => {
        set({ history: [] });
      },
    }),
    {
      name: "audio-history",
    }
  )
);
