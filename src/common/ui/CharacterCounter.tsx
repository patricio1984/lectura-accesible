import React from "react";

type Props = {
  current: number;
  max: number;
};

export const CharacterCounter = ({ current, max }: Props) => {
  const isWarning = current > max - 100 && current < max;
  const isMax = current === max;

  const colorClass = isMax
    ? "dark:text-red-400 text-red-700"
    : isWarning
      ? "text-orange-500"
      : "text-gray-800 dark:text-gray-200";

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
