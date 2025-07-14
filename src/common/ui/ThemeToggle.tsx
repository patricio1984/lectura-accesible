"use client";

import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-pressed={theme === "dark"}
      title={`Activar modo ${theme === "dark" ? "claro" : "oscuro"}`}
      className="cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]
                 transition-all duration-200 ease-in-out"
    >
      <span className="sr-only">Cambiar tema</span>
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute w-5 h-5 text-yellow-500 transition-all duration-300
                     ${
                       theme === "dark"
                         ? "rotate-0 scale-100 opacity-100"
                         : "rotate-90 scale-0 opacity-0"
                     }`}
        />
        <Moon
          className={`absolute w-5 h-5 text-gray-700 dark:text-gray-300 transition-all duration-300
                     ${
                       theme === "dark"
                         ? "rotate-90 scale-0 opacity-0"
                         : "rotate-0 scale-100 opacity-100"
                     }`}
        />
      </div>
    </button>
  );
};
