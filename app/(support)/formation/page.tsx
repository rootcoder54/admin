"use client";
import Navbar from "../_components/Navbar";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const FormationPage = () => {
  const [etat, setEtat] = useState(false);

  useEffect(() => {
    const user = Cookies.get("useremail");
    if (!user) {
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
                Inscrivez vous à la formation de RHPaie
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Email
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Profession
                </Label>
                <Input
                  id="username"
                  className="col-span-3"
                />
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FormationPage;
