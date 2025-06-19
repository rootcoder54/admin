"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { ClientList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { addRequete } from "@/action/requete/add";
import { toast } from "sonner";
import { Spinner } from "../spinner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const formSchema = z.object({
  sujet: z.string().min(1, {
    message: "Le sujet est obligatoire"
  }),
  description: z.string(),
  type: z.string(),
  demandeur: z.string(),
  technicien: z.string(),
  logiciel: z.string(),
  dateDebut: z.date(),
  heure: z.string(),
  clientId: z.string()
});

const FormAddRequete = () => {
  const router = useRouter();

  const { data: clientList, isLoading } = useQuery<ClientList[]>({
    queryKey: ["clients"],
    queryFn: () => fetcher(`/api/client`)
  });

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sujet: "",
      description: "",
      type: "",
      demandeur: "",
      technicien: "",
      logiciel: "RHPaie",
      dateDebut: new Date(),
      heure: new Date().getHours() + ":" + new Date().getMinutes(),
      clientId: ""
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    startTransition(() => {
      addRequete(
        values.sujet,
        values.description,
        values.type,
        values.demandeur,
        values.technicien,
        values.logiciel,
        values.dateDebut,
        values.heure,
        values.clientId
      ).then((data) => {
        form.reset();
        toast.success(`Requête ajoutée avec succès ${data.sujet} `);
        router.push("/requete");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2">
          <h2>
            <span className="text-2xl font-bold">Ajouter une requête</span>
            <hr />
          </h2>
        </div>
        <FormField
          control={form.control}
          name="sujet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objet</FormLabel>
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
                <Textarea {...field} />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionné le type" />
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
          name="logiciel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logiciel</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionné le type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="RHPaie">RHPaie</SelectItem>
                    <SelectItem value="TimeSheet">TimeSheet</SelectItem>
                    <SelectItem value="RHFacture">RHFacture</SelectItem>
                    <SelectItem value="RHData">RHData</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="demandeur"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demandeur</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="technicien"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technicien</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateDebut"
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
          name="heure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heure</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Client</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? clientList?.find(
                            (client) => client.id === field.value
                          )?.nomClient
                        : "Selectionner le client"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  {isLoading ? (
                    <Spinner size={"icon"} />
                  ) : (
                    <Command>
                      <CommandInput placeholder="Recherche client..." />
                      <CommandList>
                        <CommandEmpty>Pas de client.</CommandEmpty>
                        <CommandGroup>
                          {clientList?.map((client) => (
                            <CommandItem
                              value={client.nomClient}
                              key={client.id}
                              onSelect={() => {
                                form.setValue("clientId", client.id);
                              }}
                            >
                              {client.nomClient}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  client.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  )}
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"secondary"}>
          Enregistrer
        </Button>
      </form>
    </Form>
  );
};

export default FormAddRequete;
