"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Mode() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="flex items-center gap-2 p-2 rounded-md text-sm outline-none ring-1 ring-transparent transition-all hover:bg-gray-200 dark:hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-600"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span>Theme</span>
    </button>
  );
}
