import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { VoicePreview } from "@/features/tts/components/VoicePreview";

const mockOnPreview = vi.fn();

const baseProps = {
  voiceId: "123",
  onPreview: mockOnPreview,
  audioUrl: null,
  isLoading: false,
  error: null,
};

describe("VoicePreview", () => {
  it("renderiza botón de previsualización y permite hacer clic", () => {
    render(<VoicePreview {...baseProps} />);
    const button = screen.getByRole("button", {
      name: /Probar voz seleccionada/i,
    });

    fireEvent.click(button);
    expect(mockOnPreview).toHaveBeenCalled();
  });

  it("muestra error si hay error en la previsualización", () => {
    render(<VoicePreview {...baseProps} error="No se pudo cargar la voz." />);
    expect(screen.getByText(/No se pudo cargar la voz/i)).toBeInTheDocument();
  });

  it("renderiza reproductor de audio si hay una URL", () => {
    render(<VoicePreview {...baseProps} audioUrl="https://audio.mp3" />);
    expect(
      screen.getByLabelText(/Reproductor de audio generado/i)
    ).toBeInTheDocument();
  });
});
