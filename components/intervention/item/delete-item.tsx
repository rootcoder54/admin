"use client";
import { deleteItem } from "@/action/intervention/delete-item";
import { Spinner } from "@/components/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteItem({ id, idClient }: { id: string; idClient: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const supprimer = () => {
    startTransition(() => {
      deleteItem(id).then((data) => {
        toast.success(`Item de ${data.description} supprimé avec succes`);
        router.push(`/client/${idClient}/intervention/${data.interventionId}`);
      });
    });
  };
  if (isPending) {
    return (
      <AlertDialog open={true}>
        <AlertDialogTitle />
        <AlertDialogContent>
          <div className="w-full flex items-center justify-center p-6">
            <Spinner size={"icon"} />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Etez vous sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action sera irreversible
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant={"outline"}
            onClick={() => {
              router.back();
            }}
          >
            Annuler
          </Button>
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
