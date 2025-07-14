"use client";

import React, { useState } from "react";
import { useTTS } from "../hooks/useTTS";
import { useVoicePreview } from "../hooks/useVoicePreview";
import { useAudioHistory } from "../hooks/useAudioHistory";
import { TextArea } from "@/common/ui/TextArea";
import { Button } from "@/common/ui/Button";
import { AudioPlayer } from "@/common/ui/AudioPlayer";
import { CharacterCounter } from "@/common/ui/CharacterCounter";
import { ttsSchema } from "../schema";
import { VoiceSelect } from "./VoiceSelect";
import { VoicePreview } from "./VoicePreview";
import { useSafeAddToHistory } from "../hooks/useSafeAddToHistory";
import { FileUploader } from "@/common/ui/FileUpload";

export function TTSForm() {
  const [text, setText] = useState("");
  const [voiceId, setVoiceId] = useState("HbJt0yomFFBFMBQ7I69w");
  const [validationError, setValidationError] = useState<string | null>(null);

  const safeAddToHistory = useSafeAddToHistory();
  const { generate, audioUrl, isLoading } = useTTS();
  const { generatePreview, previewUrl, isPreviewLoading, previewError } =
    useVoicePreview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = ttsSchema.safeParse({ text });

    if (!result.success) {
      const firstError = result.error.format().text?._errors?.[0];
      setValidationError(firstError ?? "Ocurrió un error de validación.");
      return;
    }

    setValidationError(null);

    const url = await generate(text, voiceId);
    if (url) {
      const added = safeAddToHistory(text, voiceId);
      if (!added) return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 max-w-2xl mx-auto"
      aria-live="polite"
      noValidate
    >
      <div className="space-y-2">
        <TextArea
          id="text"
          label="Texto a convertir"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribí un texto para escuchar..."
          maxLength={1000}
        />
        <div className="flex items-center justify-between">
          <FileUploader onTextExtracted={setText} />

          <CharacterCounter current={text.length} max={1000} />
        </div>
      </div>

      <div className="space-y-4">
        <VoiceSelect selected={voiceId} onChange={setVoiceId} />
        <VoicePreview
          voiceId={voiceId}
          isLoading={isPreviewLoading}
          error={previewError}
          audioUrl={previewUrl}
          onPreview={() => generatePreview(voiceId)}
        />
      </div>

      {validationError && (
        <p className="text-red-600 text-base font-medium" role="alert">
          {validationError}
        </p>
      )}

      <div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generando..." : "Generar Audio"}
        </Button>
      </div>

      {audioUrl && (
        <div className="space-y-4">
          <hr className="border-t border-gray-300/30" />
          <h3 className="text-lg font-semibold">Audio generado</h3>
          <AudioPlayer src={audioUrl} />
        </div>
      )}
    </form>
  );
}
