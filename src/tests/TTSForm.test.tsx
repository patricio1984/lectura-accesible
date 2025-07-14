import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TTSForm } from "@/features/tts/components/TTSForm";
import { vi } from "vitest";

vi.mock("@/features/tts/hooks/useTTS", () => ({
  useTTS: () => ({
    generate: vi.fn(() => Promise.resolve("test-audio-url")),
    audioUrl: null,
    isLoading: false,
  }),
}));
vi.mock("@/features/tts/hooks/useVoicePreview", () => ({
  useVoicePreview: () => ({
    generatePreview: vi.fn(),
    previewUrl: null,
    isPreviewLoading: false,
    previewError: null,
  }),
}));
vi.mock("@/features/tts/hooks/useSafeAddToHistory", () => ({
  useSafeAddToHistory: () => () => true,
}));

describe("TTSForm", () => {
  it("renderiza el formulario correctamente", () => {
    render(<TTSForm />);
    expect(screen.getByLabelText(/Texto a convertir/i)).toBeInTheDocument();
  });

  it("muestra error si se envía el formulario vacío", async () => {
    render(<TTSForm />);
    const button = screen.getByRole("button", { name: /generar audio/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/texto.*vacío|al menos.*carácter/i);
    });
  });

  it("envía el texto correctamente si es válido", async () => {
    render(<TTSForm />);
    const textarea = screen.getByLabelText(/Texto a convertir/i);
    const button = screen.getByRole("button", { name: /Generar Audio/i });

    fireEvent.change(textarea, { target: { value: "Hola mundo" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });
});
