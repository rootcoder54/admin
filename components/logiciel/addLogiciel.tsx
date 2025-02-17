"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../spinner";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { addLogiciel } from "@/action/logiciel/addLogiciel";

const formSchema = z.object({
  nom: z.string().min(1, {
    message: "Le nom est obligatoire"
  }),
  version: z.string().min(1, {
    message: "La version est obligatoire"
  }),
  versionInterne: z.string().min(1, {
    message: "La versionInterne est obligatoire"
  }),
  societe: z.boolean(),
  poste: z
    .number({
      required_error: "Le poste est obligatoire",
      invalid_type_error: "Le poste doit être un nombre"
    })
    .positive("Le nombre doit être positif")
    .or(
      z
        .string()
        .regex(/^\d+$/, "Veuillez entrer un nombre valide")
        .transform(Number)
    ),
  employe: z
    .number({
      required_error: "L'employé est obligatoire",
      invalid_type_error: "L'employé doit être un nombre"
    })
    .positive("Le nombre doit être positif")
    .or(
      z
        .string()
        .regex(/^\d+$/, "Veuillez entrer un nombre valide")
        .transform(Number)
    ),
  clientServeur: z.boolean(),
  type: z.string().min(1, {
    message: "Le type est obligatoire"
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La date doit être au format valide (YYYY-MM-DD)"
  }),
  dossier: z.string().min(1, {
    message: "Le dossier est obligatoire"
  }),
  clientId: z.string()
});

export function AddLogiciel({
  clientId,
  reload
}: {
  clientId: string;
  reload: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      version: "",
      versionInterne: "",
      societe: false,
      date: "",
      poste: 0,
      employe: 0,
      clientServeur: false,
      type: "",
      dossier: "",
      clientId: clientId
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    startTransition(() => {
      addLogiciel(
        values.nom,
        values.version,
        values.versionInterne,
        values.societe,
        values.poste,
        values.employe,
        values.clientServeur,
        values.type,
        values.date,
        values.dossier,
        values.clientId
      ).then((data) => {
        toast.success(`Logiciel crée avec succes ${data.nom}`);
        reload();
      });
    });
  }

  if (isPending) {
    return (
      <div className="w-full flex flex-row items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusIcon />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Ajouter un logiciel</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-2 gap-x-2 gap-y-3">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectionné un logiciel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="RHPaie">RHPaie</SelectItem>
                        <SelectItem value="TimeSheet">TimeSheet</SelectItem>
                        <SelectItem value="RHData">RHData</SelectItem>
                        <SelectItem value="RHFacture">RHFacture</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="versionInterne"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version Interne</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="societe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md  p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Multi-Societé</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientServeur"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md  p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Client /serveur</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="poste"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poste</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employé</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="MONOPOSTE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dossier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dossier installation</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" variant={"secondary"}>
              Enregistrer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
