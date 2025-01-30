"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { InterventionSchema } from "./shema";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { ClientList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { useState, useTransition } from "react";
import { addIntervention } from "@/action/intervention/add-intervention";
import { Spinner } from "../spinner";
import { Intervention } from "@prisma/client";
import { AddItemIntevention } from "./addItemIntervention";

export const AddIntevention = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  const [intervention, setIntervention] = useState<Intervention>();
  const [item, setitem] = useState(false);

  const form = useForm({
    resolver: zodResolver(InterventionSchema),
    defaultValues: {
      numero: "",
      service: "",
      intervenant: "",
      nature: "",
      observations: "",
      dateCloture: new Date(),
      clientId: id
    }
  });

  function onSubmit(values: z.infer<typeof InterventionSchema>) {
    startTransition(() => {
      addIntervention(
        values.numero,
        values.service,
        values.intervenant,
        values.nature,
        values.observations,
        "",
        values.dateCloture,
        values.clientId
      ).then((data) => {
        setIntervention(data);
        setitem(true);
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
    <div>
      {!item ? (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de la fiche</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service concerné</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="intervenant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intervenants</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nature de l'intervention</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observations</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant={"secondary"}>
            Suivant
          </Button>
        </form>
      </Form>
      ):(
        <AddItemIntevention intervention={intervention} />
      )}
    </div>
  );
};
