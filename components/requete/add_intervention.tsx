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
import { useState } from "react";
import { OctagonX } from "lucide-react";
type Intervention = {
  date: string;
  debut: string;
  fin: string;
  texte: string;
};

export function AddInterventionDialog({ id }: { id: string }) {
  const { data: requete } = useQuery<RequeteWithClient>({
    queryKey: ["requeteid", id],
    queryFn: () => fetcher(`/api/requete/${id}`)
  });
  const instance = format(new Date(), "yyyy-MM-dd");

  const [interventions, setInterventions] = useState<Intervention[]>([
    { date: instance, debut: "", fin: "", texte: "" }
  ]);

  const addInterventionIt = () => {
    setInterventions((prev) => [
      ...prev,
      { date: instance, debut: "", fin: "", texte: "" }
    ]);
  };

  const removeIntervention = () => {
    setInterventions((prev) => prev.slice(0, -1));
  };

  const handleItemChange = (index: number, values: Intervention) => {
    setInterventions((prev) =>
      prev.map((item, i) => (i === index ? values : item))
    );
  };

  const handlerSubmit = () => {
    console.log("Données à enregistrer :", interventions);
  };
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
        {interventions.map((item, i) => (
          <Item
            key={i}
            values={item}
            onChange={(values) => handleItemChange(i, values)}
          />
        ))}
        <DialogFooter className="flex flex-row items-center gap-x-3">
          <Button variant="secondary" size="icon" onClick={addInterventionIt}>
            <AiFillFileAdd />
          </Button>
          {interventions.length > 1 && (
            <Button
              variant="secondary"
              size="icon"
              onClick={removeIntervention}
            >
              <OctagonX />
            </Button>
          )}
          <Button type="submit" variant={"blue"} onClick={handlerSubmit}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Item = ({
  values,
  onChange
}: {
  values: Intervention;
  onChange: (values: Intervention) => void;
}) => {
  const handleChange =
    (field: keyof Intervention) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ ...values, [field]: e.target.value });
    };

  return (
    <div className="grid grid-cols-7 gap-x-2 py-3 border-b">
      {/* Date */}
      <span className="col-span-2">
        <Input
          type="date"
          className="w-full"
          value={values.date}
          onChange={handleChange("date")}
        />
      </span>

      {/* Heure de début */}
      <span>
        <Input
          type="time"
          value={values.debut}
          onChange={handleChange("debut")}
        />
      </span>

      {/* Heure de fin */}
      <span>
        <Input type="time" value={values.fin} onChange={handleChange("fin")} />
      </span>

      {/* Description */}
      <span className="col-span-3">
        <Textarea
          placeholder="Description de l'intervention"
          value={values.texte}
          onChange={handleChange("texte")}
        />
      </span>
    </div>
  );
};
