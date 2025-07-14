"use client";

import React from "react";
import { Section } from "@/common/ui/Section";
import { useAudioHistory } from "../hooks/useAudioHistory";
import { AudioHistoryList } from "./AudioHistoryList";

export const AudioHistorySection = () => {
  const { clearAll, history } = useAudioHistory();

  if (!history.length) return null;

  return (
    <Section
      title={
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold">Historial de lecturas</span>
          <button
            onClick={clearAll}
            className="text-lg text-red-600 hover:underline"
          >
            Borrar todo
          </button>
        </div>
      }
    >
      <AudioHistoryList />
    </Section>
  );
};
