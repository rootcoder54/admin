import * as React from "react";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
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

export const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
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
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{session.user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Poste : {session?.user?.name}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form action={logout}>
                  <Button type="submit" size={"lg"} variant={"link"}>
                    Log Out
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
