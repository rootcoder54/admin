import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { fetcher } from "@/lib/fetcher";
import { RequeteWithClient } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  ChartPie,
  CircleUser,
  ClipboardType,
  ContactRound,
  FileArchive,
  FileStack,
  StickyNote,
  Trello,
  Users
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const DetailRequet = ({ id }: { id: string }) => {
  const { data: requete } = useQuery<RequeteWithClient>({
    queryKey: ["requeteid", id],
    queryFn: () => fetcher(`/api/requete/${id}`)
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Link href={`?id=${id}`}>
          <FileStack />
        </Link>
      </SheetTrigger>
      <SheetContent className="sm:max-w-xl px-14 space-y-4 dark:bg-stone-900">
        <SheetHeader className="space-y-4">
          <StickyNote />
          <SheetTitle className="text-2xl">
            {requete ? (
              requete.sujet
            ) : (
              <Skeleton className="h-8 w-60 rounded-lg" />
            )}
          </SheetTitle>
          <SheetDescription>
            {requete &&
              (requete?.description
                ? requete.description
                : "Pas de description disponible")}
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        {requete && (
          <div className="flex flex-row items-center gap-2">
            <Link href={`/requete/intervention/${id}`}>
              <Button size={"sm"} variant={"blue"}>
                <FileArchive />
                Intervention
              </Button>
            </Link>
          </div>
        )}
        {requete ? (
          <div className="flex flex-col gap-4 space-y-2">
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                <CircleUser /> Technicien{" "}
              </Label>
              <span className="capitalize">
                {requete.technicien ? requete.technicien : "Non attribué"}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                <Users />
                Demandeur{" "}
              </Label>
              <span className="capitalize">
                {requete.demandeur ? requete.demandeur : "Non attribué"}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                <ContactRound />
                Client{" "}
              </Label>
              <span className="capitalize">
                {requete.client ? (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">{requete.client.nomClient}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          @{requete.client.nomClient}
                        </h4>
                        {requete.client.adresse && (
                          <div className="flex items-start gap-2">
                            <span>Adresse:</span>
                            <span className="text-muted-foreground text-xs">
                              {requete.client.adresse}
                            </span>
                          </div>
                        )}
                        {requete.client.telephone && (
                          <div className="flex items-start gap-2">
                            <span>Telephone:</span>
                            <span className="text-muted-foreground text-xs">
                              {requete.client.telephone}
                            </span>
                          </div>
                        )}
                        {requete.client.dateInscription && (
                          <div className="flex items-start gap-2">
                            <span>Date d&apos;adhésion:</span>
                            <span className="text-muted-foreground text-xs">
                              {format(
                                requete.client.dateInscription,
                                "dd/MM/yyyy"
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  "Non attribué"
                )}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                <Trello />
                Logiciel{" "}
              </Label>
              <span className="capitalize">
                {requete.logiciel ? requete.logiciel : "Non attribué"}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                <ClipboardType />
                Type{" "}
              </Label>
              <span className="capitalize">
                {requete.type ? requete.type : "Non attribué"}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                <ChartPie />
                Etat{" "}
              </Label>
              {requete.etat ? (
                <Badge variant={"secondary"}>Fini</Badge>
              ) : (
                <Badge>En cours</Badge>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                <CalendarDays />
                Date Requête{" "}
              </Label>
              <span className="capitalize">
                {requete.dateDebut
                  ? "Le " +
                    format(requete.dateDebut, "dd/MM/yyyy") +
                    " à " +
                    format(requete.dateDebut, "HH:mm")
                  : "Non attribué"}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 space-y-3">
            <Skeleton className="h-6 w-64 rounded-lg" />
            <Skeleton className="h-6 w-64 rounded-lg" />
            <Skeleton className="h-6 w-64 rounded-lg" />
            <Skeleton className="h-6 w-64 rounded-lg" />
            <Skeleton className="h-6 w-64 rounded-lg" />
            <Skeleton className="h-6 w-64 rounded-lg" />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default DetailRequet;
