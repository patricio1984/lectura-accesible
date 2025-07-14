import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FileUploader } from "@/common/ui/FileUpload";

describe("FileUploader", () => {
  it("extrae texto de un archivo .txt", async () => {
    const mockText = "Hola mundo";
    const onTextExtracted = vi.fn();

    const file = new File([""], "test.txt", { type: "text/plain" });
    Object.defineProperty(file, "text", {
      value: () => Promise.resolve(mockText),
    });

    render(<FileUploader onTextExtracted={onTextExtracted} />);

    const input = screen.getByLabelText(/Subir archivo/i, {
      selector: "input",
    });
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(onTextExtracted).toHaveBeenCalledWith(mockText);
    });
  });
});
