import React from "react";
import { voices } from "@/features/tts/constants/voices";

type Props = {
  selected: string;
  onChange: (voiceId: string) => void;
};

export const VoiceSelect = ({ selected, onChange }: Props) => {
  return (
    <div className="space-y-1">
      <label htmlFor="voice" className="block text-lg font-medium">
        Seleccionar voz
      </label>
      <select
        id="voice"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring"
      >
        {voices.map((voice) => (
          <option key={voice.id} value={voice.id}>
            {voice.name} - {voice.description}
          </option>
        ))}
      </select>
    </div>
  );
};
