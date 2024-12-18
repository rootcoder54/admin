"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [typePassword, setTypePassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const ckeckChange = () => {
    setShowPassword((s) => !s);
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Bienvenue Sur Admin Malisystem
          </CardTitle>
          <CardDescription>
            Connectez-vous pour avoir accès au BackOffice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Login</Label>
                  <Input
                    id="email"
                    type="text"
                    name="username"
                    value={username}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type={typePassword}
                    name="password"
                    required
                  />
                </div>
                <div className="flex items-center justify-center gap-x-3">
                  <Checkbox
                    id="check"
                    checked={showPassword}
                    onCheckedChange={ckeckChange}
                  />
                  <label htmlFor="check" className="cursor-pointer">
                    Afficher le mot de passe
                  </label>
                </div>
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </div>
              <div className="text-center text-sm">
                Voulez vous retourner sur le
                <Link
                  href="https://malisystem.com/"
                  className="underline underline-offset-4 px-1"
                >
                  Site
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
