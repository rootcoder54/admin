"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import Hero from "../_components/Hero";

const page = () => {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
};

export default page;
