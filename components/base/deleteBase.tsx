"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../spinner";
import { deleteBase } from "@/action/base/delete-base";

export function DeleteBase({
  id,
  reload
}: {
  id: string;
  reload: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const supprimer = () => {
    startTransition(() => {
      deleteBase(id).then((data) => {
        toast.success(`Base de ${data.societe} supprimé avec succes`);
        reload();
      });
    });
  };
  if (isPending) {
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size={"icon"}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etez vous sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action sera irreversible
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={supprimer}
            className="bg-red-500 hover:bg-red-400 text-white"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
