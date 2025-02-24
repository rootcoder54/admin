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
import { Textarea } from "../ui/textarea";
import { addBase } from "@/action/base/addBase";

const formSchema = z.object({
  societe: z.string().min(1, {
    message: "Le nom est obligatoire"
  }),
  chemin: z.string().min(1, {
    message: "Le nom est obligatoire"
  }),
  convention: z.string().min(1, {
    message: "Le nom est obligatoire"
  }),
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
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La date doit être au format valide (YYYY-MM-DD)"
  }),
  commentaire: z.string(),
  clientId: z.string()
});

export function AddBase({
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
      societe: "",
      chemin: "",
      convention: "",
      date: "",
      poste: 0,
      employe: 0,
      commentaire: "",
      clientId: clientId
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    startTransition(() => {
      addBase(
        values.societe,
        values.chemin,
        values.convention,
        values.poste,
        values.employe,
        values.date,
        values.commentaire,
        values.clientId
      ).then((data) => {
        toast.success(`Base de ${data.societe} crée avec succes`);
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
          <DialogTitle>Ajouter une Base</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-2 gap-x-2">
              <FormField
                control={form.control}
                name="societe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Societé</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chemin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chemin</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="convention"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Convention</FormLabel>
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
            </div>
            <FormField
              control={form.control}
              name="commentaire"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commentaire</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"secondary"}>
              Enregistrer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
