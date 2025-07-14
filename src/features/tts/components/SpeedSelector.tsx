"use client";

import React from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export const SpeedSelector = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-1">
      <label htmlFor="speed" className="block text-lg font-medium">
        Velocidad de lectura
      </label>
      <input
        id="speed"
        name="speed"
        type="range"
        min="0.7"
        max="1.2"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
        aria-valuemin={0.7}
        aria-valuemax={1.2}
        aria-valuenow={value}
        aria-label="Velocidad de lectura"
      />
      <p className="text-sm text-gray-700 dark:text-gray-200">
        {value.toFixed(2)}x
      </p>
      <p className="text-xs text-gray-700 dark:text-gray-200">
        Rango: 0.7x (más lento) - 1.2x (más rápido)
      </p>
    </div>
  );
};
