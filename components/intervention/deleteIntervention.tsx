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
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { deleteIntervention } from "@/action/intervention/delete-intervention";
import { toast } from "sonner";
import { deleteDocument } from "@/action/intervention/delete-document";
import { useTransition } from "react";
import { Spinner } from "../spinner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";

export function DeteleIntervention({
  interventionId
}: {
  interventionId: string | undefined;
}) {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  const supprimer = (id: string) => {
    startTransition(() => {
      deleteIntervention(id).then((data) => {
        if (data.documentId) {
          deleteDocument(data.documentId).then((item) => {
            console.log(item);
            toast.success(`Intervention supprimer`);
            route.push(`/client/${data.clientId}`);
          });
        }
      });
    });
  };
  if (isPending) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle />
          <div className="w-full flex items-center justify-center p-6">
            <Spinner />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!interventionId) {
    return;
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"danger"}>
          <Trash2 /> Supprimer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer?</AlertDialogTitle>
          <AlertDialogDescription>
            Etez-vous sûr de vouloir supprimer cette intervention ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => supprimer(interventionId)}
            className="bg-red-500 hover:bg-red-400 text-white"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
