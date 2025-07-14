import React from "react";
import { DownloadButton } from "@/common/ui/DownloadButton";

type Props = {
  src: string;
};

export const AudioPlayer = ({ src }: Props) => (
  <div className="space-y-2">
    <audio
      controls
      className="w-full h-10"
      aria-label="Reproductor de audio generado a partir del texto ingresado"
    >
      <source src={src} type="audio/mpeg" />
      Tu navegador no soporta audio.
    </audio>
    <DownloadButton src={src} />
  </div>
);
