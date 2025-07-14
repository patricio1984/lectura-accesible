// src/features/tts/hooks/useTTS.ts
import { useState } from "react";
import axios from "axios";

export function useTTS() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(
    text: string,
    voiceId: string
  ): Promise<string | null> {
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);
    try {
      const response = await axios.post(
        "/api/tts",
        { text, voiceId },
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(response.data);
      setAudioUrl(url);
      return url;
    } catch (err) {
      console.error("Error al generar audio", err);
      setError("No se pudo generar el audio");
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { audioUrl, generate, isLoading, error };
}
