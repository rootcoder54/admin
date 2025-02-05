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
import { Edit } from "lucide-react";
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
import { updateContact } from "@/action/contact/update-contact";

const formSchema = z.object({
  nom: z.string().min(1, {
    message: "Le nom est obligatoire"
  }),
  id: z.string(),
  telephone: z.string(),
  poste: z.string(),
  email: z.string(),
  clientId: z.string()
});

export function EditeContact({
  id,
  nom,
  telephone,
  poste,
  email,
  clientId,
  reload
}: {
  id: string;
  nom: string;
  telephone: string | null;
  poste: string | null;
  email: string | null;
  clientId: string;
  reload: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id,
      nom: nom,
      telephone: telephone ? telephone : "",
      poste: poste ? poste : "",
      email: email ? email : "",
      clientId: clientId
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      updateContact(
        values.id,
        values.nom,
        values.telephone,
        values.poste,
        values.email
      ).then((data) => {
        toast.success(`Contact de ${data.nom} edité avec succes`);
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
        <Button variant="outline" size={"icon"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editer Contact</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant={"secondary"} className="border">
              Enregistrer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
