import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { InterventionAll } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Label } from "../ui/label";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { format } from "date-fns";

const DetailInter = ({ id }: { id?: string }) => {
  const { data: intervention } = useQuery<InterventionAll>({
    queryKey: ["interventionId", id],
    queryFn: () => fetcher(`/api/intervention/detail/${id}`)
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"link"}>details</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-xl px-4 space-y-4">
        <SheetHeader>
          <SheetTitle>
            {intervention ? (
              intervention.nature
            ) : (
              <Skeleton className="h-8 w-60 rounded-lg" />
            )}
          </SheetTitle>
          <SheetDescription>
            {intervention &&
              (intervention?.observations
                ? intervention.observations
                : "Pas d'observation disponible")}
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        {intervention ? (
          <div className="flex flex-col gap-4 space-y-2">
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                Numero{" "}
              </Label>
              <span className="capitalize">
                {intervention.numero ? intervention.numero : "Non attribué"}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                Intervenant{" "}
              </Label>
              <span className="capitalize">
                {intervention.intervenant
                  ? intervention.intervenant
                  : "Non attribué"}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                Service{" "}
              </Label>
              <span className="capitalize">
                {intervention.service ? intervention.service : "Non attribué"}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Label className="w-36 font-bold flex flex-row items-center gap-2">
                {" "}
                Client{" "}
              </Label>
              <span className="capitalize">
                {intervention.client ? (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">{intervention.client.nomClient}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          @{intervention.client.nomClient}
                        </h4>
                        {intervention.client.adresse && (
                          <div className="flex items-start gap-2">
                            <span>Adresse:</span>
                            <span className="text-muted-foreground text-xs">
                              {intervention.client.adresse}
                            </span>
                          </div>
                        )}
                        {intervention.client.telephone && (
                          <div className="flex items-start gap-2">
                            <span>Telephone:</span>
                            <span className="text-muted-foreground text-xs">
                              {intervention.client.telephone}
                            </span>
                          </div>
                        )}
                        {intervention.client.dateInscription && (
                          <div className="flex items-start gap-2">
                            <span>Date d&apos;adhésion:</span>
                            <span className="text-muted-foreground text-xs">
                              {format(
                                intervention.client.dateInscription,
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

export default DetailInter;
