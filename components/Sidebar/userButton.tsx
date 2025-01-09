"use client";
import * as React from "react";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

import {
  ChevronUp,
  Cloud,
  HelpCircle,
  LogOut,
  Plus,
  Settings,
  User,
  Users
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { logout } from "@/action/auth/logout";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "../spinner";
import { ChevronDown } from "lucide-react";

const UserButton = () => {
  const { data: session, status } = useSession();

  const [isPending, startTransition] = useTransition();

  const submit = () => {
    startTransition(() => {
      logout();
    });
  };

  if (status === "loading" || isPending) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {session?.user !== null && session?.user !== undefined && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="w-fit px-1.5">
                <span className="sr-only"> user </span>
                <div className="flex items-center justify-center rounded-md">
                  <Avatar className="size-7">
                    <AvatarImage
                      src={session.user.image || "/msys.png"}
                      alt="user logo"
                      className="dark:invert"
                    />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                </div>
                <span className="truncate font-semibold">
                  {session.user.name}
                </span>
                <ChevronDown className="opacity-50" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Parametres</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users />
                  <span>Mes Taches</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus />
                  <span>New Team</span>
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href="/support" className="flex w-full gap-2 items-center">
                  <HelpCircle />
                  <span>Support</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cloud />
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form action={submit}>
                  <Button
                    type="submit"
                    size={"lg"}
                    variant={"ghost"}
                    className="h-1 justify-start items-start"
                  >
                    <LogOut />
                    Deconnexion
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export const MemoizedUserButton = React.memo(UserButton);
