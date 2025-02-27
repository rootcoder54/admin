"use client";

import { Button } from "@/components/ui/button";

import { useRef, useState } from "react";
import { Spinner } from "../spinner";
import { handle } from "@/action/intervention/fiche-intervention";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ArrowBigLeftIcon, File } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function FicheIntervention({
  idIntervention,
  idClient
}: {
  idIntervention: string;
  idClient: string | undefined;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [state, setstate] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlerChange = (file: File | null) => {
    setFile(file);
  };

  const handlerClick = () => {
    fileRef.current?.click();
  };

  const submit = () => {
    setstate(true);
    handle(file, idIntervention).then((data) => {
      if (data !== undefined) {
        toast.success(`Fiche enregistrer`);
        setstate(false);
        router.push(`/client/${idClient}/intervention/${idIntervention}`);
      }
    });
  };

  if (state) {
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <Spinner size={"icon"} />
      </div>
    );
  }
  return (
    <form className="space-y-2 flex flex-col justify-center">
      <div className="flex flex-row items-center gap-x-2">
        <Link
          href={`/client/${idClient}/intervention/${idIntervention}`}
          className="flex items-center"
        >
          <ArrowBigLeftIcon />
          <span>Retour</span>
        </Link>
        <Separator orientation="vertical" className="mx-2 h-6 bg-white" />
        <h3>Chargé la fiche d&apos;intervention </h3>
      </div>

      <div
        className={cn(
          "relative group-hover/file:shadow-2xl cursor-pointer z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
          "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
        )}
        onClick={handlerClick}
      >
        <File className="h-8 w-8 text-neutral-600 dark:text-neutral-400" />
        <Input
          type="file"
          ref={fileRef}
          onChange={(e) => handlerChange(e.target.files?.[0] || null)}
          className="hidden"
        />
      </div>
      {file && (
        <div
          className={cn(
            "bg-white dark:bg-neutral-900 flex flex-col items-start p-4 border w-full mx-auto rounded-md",
            "shadow-lg"
          )}
        >
          <div className="flex justify-between w-full items-center gap-4">
            <p className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
              {file.name}
            </p>
            <p className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>

          <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
            <p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 ">
              {file.type}
            </p>
            <p>modifié le {new Date(file.lastModified).toLocaleDateString()}</p>
          </div>
        </div>
      )}
      <Button variant={"secondary"} onClick={submit}>
        charge
      </Button>
    </form>
  );
}
