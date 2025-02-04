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

export function DeteleIntervention({
  interventionId
}: {
  interventionId: string | undefined;
}) {
  const route = useRouter();
  const supprimer = (id: string) => {
    deleteIntervention(id).then((data) => {
      toast.success(`Intervention ${data.id} supprimer`);
      route.push(`/client/${data.clientId}`);
    });
  };
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
