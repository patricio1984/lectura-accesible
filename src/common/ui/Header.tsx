"use client";

import { ThemeToggle } from "@/common/ui/ThemeToggle";

export const Header = () => {
  return (
    <header className="w-full px-6 py-4 border-b border-gray-300 dark:border-gray-700">
      <div className="flex justify-between max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <h1 className="text-4xl font-bold">Lectura Accesible</h1>
        <ThemeToggle />
      </div>
    </header>
  );
};
