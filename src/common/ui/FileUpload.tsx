"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, FileWarning } from "lucide-react";
import pdfToText from "react-pdftotext";
import { toast } from "sonner";

type Props = {
  onTextExtracted: (text: string) => void;
};

const MAX_CHARS = 1000;

const cleanText = (text: string) =>
  text
    .replace(/\u200B/g, "")
    .replace(/\f/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();

export const FileUploader = ({ onTextExtracted }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [ariaMessage, setAriaMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setFileName(file.name);
    setCharCount(0);
    setIsLoading(true);

    const ext = file.name.split(".").pop()?.toLowerCase();

    try {
      let rawText = "";

      if (ext === "txt") {
        rawText = await file.text();
      } else if (ext === "pdf") {
        rawText = await pdfToText(file);
      } else {
        setError("Solo se permiten archivos .txt o .pdf");
        return;
      }

      const cleaned = cleanText(rawText);
      setCharCount(cleaned.length);

      if (cleaned.length > MAX_CHARS) {
        toast.error(`El texto supera los ${MAX_CHARS} caracteres.`);
        setError(`El archivo contiene ${cleaned.length} caracteres.`);
        return;
      }

      setAriaMessage(`Texto cargado con ${cleaned.length} caracteres.`);
      onTextExtracted(cleaned);
    } catch (err) {
      console.error("Error procesando archivo:", err);
      setError("No se pudo leer el archivo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="file-upload" className="block text-lg font-medium">
        Subir archivo .txt o .pdf
      </label>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50"
        >
          <UploadCloud className="w-4 h-4" />
          {isLoading ? "Procesando..." : "Seleccionar archivo"}
        </button>

        {fileName && (
          <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <FileText className="w-4 h-4" /> {fileName}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        id="file-upload"
        type="file"
        accept=".txt,.pdf"
        className="sr-only"
        onChange={handleFileChange}
        disabled={isLoading}
      />

      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
        <p aria-live="polite" className="sr-only">
          {ariaMessage}
        </p>
        {charCount > 0 && (
          <p
            className={
              charCount > MAX_CHARS ? "text-red-600 font-semibold" : ""
            }
          >
            {charCount} / {MAX_CHARS}
          </p>
        )}
      </div>

      {error && (
        <p
          className="text-red-600 text-sm flex items-center gap-1 mt-1"
          role="alert"
        >
          <FileWarning className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};
