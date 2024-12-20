"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import Navbar from "../_components/Navbar";
import Hero from "../_components/Hero";

const page = () => {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center gap-y-4 py-5">
      <Navbar />
      <Hero />
    </div>
  );
};

export default page;
