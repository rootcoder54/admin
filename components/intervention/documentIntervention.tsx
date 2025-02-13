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
import { toast } from "sonner";

export function FicheIntervention({
  idIntervention
}: {
  idIntervention: string;
}) {
  const [isPending, startTransition] = useTransition();
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
      handle(file, idIntervention).then((data) => {
        if (data !== undefined) {
          toast.success(`Fiche enregistrer`);
        }
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusIcon />
          Fiche
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un Document</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="space-y-2">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button variant={"secondary"} onClick={submit}>
            charge
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
