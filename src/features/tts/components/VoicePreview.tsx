"use client";

import React from "react";
import { Volume2, Loader2 } from "lucide-react";
import { AudioPlayer } from "@/common/ui/AudioPlayer";

type Props = {
  voiceId: string;
  isLoading: boolean;
  error: string | null;
  audioUrl: string | null;
  onPreview: () => void;
};

export const VoicePreview = ({
  voiceId,
  isLoading,
  error,
  audioUrl,
  onPreview,
}: Props) => {
  return (
    <article className="space-y-4">
      <div className="md:flex md:items-start md:gap-6 space-y-2 md:space-y-0">
        <button
          type="button"
          onClick={onPreview}
          className="cursor-pointer font-medium flex-shrink-0 flex items-center gap-2 text-lg text-blue-600 hover:underline disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Cargando muestra...
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              Probar voz seleccionada
            </>
          )}
        </button>

        {audioUrl && (
          <div className="flex-1">
            <AudioPlayer src={audioUrl} />
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </article>
  );
};
