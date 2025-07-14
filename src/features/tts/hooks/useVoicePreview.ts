"use client";

import { useState } from "react";
import axios from "axios";

export function useVoicePreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  async function generatePreview(voiceId: string) {
    setIsPreviewLoading(true);
    setPreviewError(null);
    setPreviewUrl(null);

    const text = "Hola, esta es una demostración de voz.";

    try {
      const response = await axios.post(
        "/api/tts",
        { text, voiceId },
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(response.data);
      setPreviewUrl(url);
    } catch (err) {
      console.error("Error al generar la voz de prueba:", err);
      setPreviewError("No se pudo reproducir la muestra. Intentá de nuevo.");
    } finally {
      setIsPreviewLoading(false);
    }
  }

  return {
    generatePreview,
    previewUrl,
    isPreviewLoading,
    previewError,
  };
}
