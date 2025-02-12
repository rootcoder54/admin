"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";

import { useState, useTransition } from "react";
import { Spinner } from "../spinner";
import { handle } from "@/action/intervention/fiche-intervention";
import { Input } from "@/components/ui/input";

export function FicheIntervention() {
  const [isPending, startTransition] = useTransition();
  const [nom, setNom] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  if (isPending) {
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  const submit = () => {
    startTransition(() => {
      handle(file, nom).then((data) => {
        if (data !== undefined) {
          console.log("ooh");
        }
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusIcon />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un Document</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form>
          <Input type="text" onChange={(e) => setNom(e.target.value)} />
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button variant={"secondary"} onClick={submit}>
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
