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
import { addContrat } from "@/action/contrat/addContrat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const formSchema = z.object({
  debut: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La date doit être au format valide (YYYY-MM-DD)"
  }),
  fin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La date doit être au format valide (YYYY-MM-DD)"
  }),
  type: z.string(),
  reconduction: z.string(),
  clientId: z.string()
});

export function AddContrat({
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
      debut: "",
      fin: "",
      type: "",
      reconduction: "",
      clientId: clientId
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    startTransition(() => {
      addContrat(
        values.debut,
        values.fin,
        values.type,
        values.reconduction,
        values.clientId
      ).then((data) => {
        toast.success(`Contrat de ${data.type} crée avec succes`);
        form.reset();
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un Contrat</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="debut"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date debut</FormLabel>
                  <Input placeholder="YYYY-MM-DD" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fin"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Fin</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY-MM-DD" {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reconduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reconduction</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectionné le mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Automatique">Automatique</SelectItem>
                      <SelectItem value="A la demande du client">
                        A la demande du client
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"outline"}>
              Enregistrer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
