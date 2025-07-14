import React from "react";
import { render, screen } from "@testing-library/react";
import { CharacterCounter } from "@/common/ui/CharacterCounter";

describe("CharacterCounter", () => {
  it("muestra el contador correctamente", () => {
    render(<CharacterCounter current={42} max={1000} />);
    expect(screen.getByText(/42\s*\/\s*1000\s*caracteres/i)).toBeInTheDocument();
  });
});