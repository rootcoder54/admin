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
import { ItemInterventionSchema } from "./shema";
import { z } from "zod";

import { useTransition } from "react";
import { Spinner } from "../spinner";
import { Intervention } from "@prisma/client";
import { addItemIntervention } from "@/action/intervention/addItemIntervention";

export const AddItemIntevention = ({
  intervention
}: {
  intervention: Intervention | undefined;
}) => {
  if (!intervention) {
    return;
  }
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(ItemInterventionSchema),
    defaultValues: {
      date: new Date(),
      debut: "",
      fin: "",
      description: "",
      interventionId: intervention.id
    }
  });

  function onSubmit(values: z.infer<typeof ItemInterventionSchema>) {
    startTransition(() => {
      addItemIntervention(
        values.date,
        values.debut,
        values.fin,
        values.description,
        values.interventionId
      ).then((data) => {
        if (!data) {
          return;
        }
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="debut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Début</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fin</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
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
    </div>
  );
};
