"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "../_components/Navbar";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { toast } from "sonner";
import { createFormation } from "@/data/formation/userFormation";

const FormationPage = () => {
  const [etat, setEtat] = useState(false);

  const formSchema = z.object({
    nom: z.string().min(1, {
      message: "Le nom est obligatoire"
    }),
    email: z.string().email({
      message: "Email est obligatoire"
    }),
    profession: z.string().min(1, {
      message: "La profession est obligatoire"
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      profession: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success(`${values}`);
    Cookies.set("useremail", values.email, { expires: 100 });
    Cookies.set("usernom", values.nom, { expires: 100 });
    Cookies.set("userprofession", values.profession, { expires: 100 });
    await createFormation(
      values.nom,
      values.email,
      values.profession
    ).finally(
    );
  };

  useEffect(() => {
    const userEmail = Cookies.get("useremail");
    if (!userEmail) {
      setEtat(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center gap-y-4 py-5">
      <Navbar />
      <div>formation</div>
      <Drawer open={etat}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm py-8">
            <DrawerHeader>
              <DrawerTitle>Inscription</DrawerTitle>
              <DrawerDescription>
                Inscrivez pour voir la formation de RHPaie
              </DrawerDescription>
            </DrawerHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom complete</FormLabel>
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
                        <Input
                          type="email"
                          placeholder="exemple@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Inscrire
                </Button>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FormationPage;
