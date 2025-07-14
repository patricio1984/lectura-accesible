"use client";

import React from "react";
import { Download } from "lucide-react";

type Props = {
  src: string;
  filename?: string;
};

export const DownloadButton = ({ src, filename = "audio.mp3" }: Props) => {
  const handleDownload = async () => {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="cursor-pointer flex items-center gap-2 text-lg text-green-600 hover:underline"
    >
      <Download className="w-4 h-4" />
      Descargar
    </button>
  );
};
