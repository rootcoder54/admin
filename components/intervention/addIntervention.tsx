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
import { useTransition } from "react";
import { addIntervention } from "@/action/intervention/add-intervention";
import { Spinner } from "../spinner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";

export const AddIntevention = ({
  id,
  requeteId,
  numero
}: {
  id: string;
  requeteId: string | undefined;
  numero: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const route = useRouter();


  const form = useForm({
    resolver: zodResolver(InterventionSchema),
    defaultValues: {
      numero: numero,
      service: "Genie logiciel",
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
        values.dateCloture,
        values.clientId,
        requeteId
      ).then((data) => {
        route.push(
          `/intervention/${data.clientId}/add/item/${data.id}/${requeteId}`
        );
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
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de la fiche</FormLabel>
                <FormControl>
                  <Input {...field} readOnly disabled />
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
                <FormLabel>Nature de l&apos;intervention</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectionné le type de l'intervention" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Support et assistance">
                        Support et assistance
                      </SelectItem>
                      <SelectItem value="Installation">Installation</SelectItem>
                      <SelectItem value="Extension de licence">
                        Extension de licence
                      </SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateCloture"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de cloture</FormLabel>
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

          <Button type="submit" variant={"secondary"}>
            Suivant
          </Button>
        </form>
      </Form>
    </div>
  );
};
