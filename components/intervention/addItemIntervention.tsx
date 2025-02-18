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
import { addItemIntervention } from "@/action/intervention/addItemIntervention";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export const AddItemIntevention = ({
  interventionId,
  clientId
}: {
  interventionId: string;
  clientId: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(ItemInterventionSchema),
    defaultValues: {
      date: new Date(),
      debut: "",
      fin: "",
      description: "",
      interventionId: interventionId
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
        form.reset();
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
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span>choix une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className="flex flex-row space-x-1">
            <Button type="submit" variant={"secondary"}>
              Enregistrer
            </Button>
            <Link href={`/client/${clientId}/intervention/${interventionId}`}>
              <Button>Terminer</Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
