"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Page = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="w-full min-h-screen p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-full h-full"
      />
    </div>
  );
};

export default Page;
