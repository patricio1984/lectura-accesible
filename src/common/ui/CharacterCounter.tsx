import React from "react";

type Props = {
  current: number;
  max: number;
};

export const CharacterCounter = ({ current, max }: Props) => {
  const isWarning = current > max - 100 && current < max;
  const isMax = current === max;

  const colorClass = isMax
    ? "text-red-600"
    : isWarning
      ? "text-orange-500"
      : "text-gray-500";

  const icon = isMax ? "🟥" : isWarning ? "🟧" : "";

  return (
    <p
      className={`text-sm text-right ${colorClass}`}
      aria-live={isWarning || isMax ? "polite" : undefined}
    >
      {icon} {current}/{max} caracteres
    </p>
  );
};
