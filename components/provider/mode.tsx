"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { SidebarMenuButton } from "@/components/ui/sidebar";

export function Mode() {
  const { setTheme, theme } = useTheme();

  const change = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const af = theme === "light" ? "light" : "dark";
  return (
    <SidebarMenuButton onClick={change}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span>{af}</span>
    </SidebarMenuButton>
  );
}
