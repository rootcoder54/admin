"use client";

import { Button } from "@/components/ui/button";
import "./style.css";
import { useEffect } from "react";

const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    window.print();
  }, []);

  return (
    <Button variant={"outline"} onClick={handlePrint} className="no-print">
      Imprimer
    </Button>
  );
};

export default PrintButton;
