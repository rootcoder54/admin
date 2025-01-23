"use client";
import { UserCog2 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useSession } from "next-auth/react";
import { Spinner } from "../spinner";
import { useState } from "react";
import { Button } from "../ui/button";
import { EditeForm } from "./editeForm";

export const AuthSetting = () => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <Card className="w-[655px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-3 text-neutral-700 dark:text-zinc-300">
          <UserCog2 className="h-12 w-12" />
          <h2 className="text-3xl font-bold ">Profil</h2>
        </CardTitle>
        <CardDescription className="flex items-center justify-center space-x-2">
          <Button
            variant={"secondary"}
            onClick={() => setIsEditing((editer) => !editer)}
          >
            Changer Password
          </Button>
        </CardDescription>
      </CardHeader>
      {session?.user !== null && session?.user !== undefined && (
        <div>
          {!isEditing ? (
            <div className="flex flex-col space-y-3 p-4">
              <div className="px-3 py-2 rounded border flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                <span>Id user :</span>
                <span>{session.user.id ? session.user.id : "Null"}</span>
              </div>
              <div className="px-3 py-2 rounded border flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                <span>Nom :</span>
                <span>{session.user.name ? session.user.name : "Null"}</span>
              </div>
              <div className="px-3 py-2 rounded border flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                <span>Username :</span>
                <span>
                  {session.user.username ? session.user.username : "Null"}
                </span>
              </div>
              <div className="px-3 py-2 rounded border flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                <span>Email :</span>
                <span>{session.user.email ? session.user.email : "Null"}</span>
              </div>
              <div className="px-3 py-2 rounded border flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                <span>UserImage :</span>
                <span>{session.user.image ? session.user.image : "Null"}</span>
              </div>
              <div className="px-3 py-2 rounded border flex flex-col items-start justify-between hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                <span>Password Chiffré :</span>
                <span>
                  {session.user.password ? session.user.password : "Null"}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 p-4">
              <EditeForm />
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
