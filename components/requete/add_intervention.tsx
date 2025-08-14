"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { AiFillFileAdd } from "react-icons/ai";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { RequeteWithClient } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";

export function AddInterventionDialog({ id }: { id: string }) {
  const { data: requete } = useQuery<RequeteWithClient>({
    queryKey: ["requeteid", id],
    queryFn: () => fetcher(`/api/requete/${id}`)
  });
  console.log(requete);
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size={"sm"} className="size-8">
              <AiFillFileAdd />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ajouter une intervention</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Ajouter une Intervention</DialogTitle>
          <DialogDescription>
            Ajouter une intervention pour la requête {""}
            {format(requete?.dateDebut || new Date(), "yyyyMMdd_HHmm_")}
            {requete?.logiciel ? requete?.logiciel : "RHPaie"}_#
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-7 gap-x-2 py-3 border-b">
          <span className="col-span-2">Date</span>
          <span>Debut</span>
          <span>Fin</span>
          <span className="col-span-3">Description</span>
        </div>
        <Item />
        <DialogFooter>
          <Button type="submit" variant={"blue"}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Item = () => {
  return (
    <div className="grid grid-cols-7 gap-x-2 py-3 border-b">
      <span className="col-span-2">
        <Input type="date" className="w-full" />
      </span>
      <span>
        <Input type="time" />
      </span>
      <span>
        <Input type="time" />
      </span>
      <span className="col-span-3">
        <Textarea placeholder="Description de l'intervention" />
      </span>
    </div>
  );
};
