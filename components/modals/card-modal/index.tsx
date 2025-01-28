"use client";

import { useQuery } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Header, HeaderSkeleton } from "./header";
import { Description, DescriptionSkeleton } from "./description";
import { Actions, ActionsSkeleton } from "./actions";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  });

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent className="w-full">
          {!cardData ? <HeaderSkeleton /> : <Header data={cardData} />}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
            <div className="col-span-3">
              <div className="w-full space-y-6">
                {!cardData ? (
                  <DescriptionSkeleton />
                ) : (
                  <Description data={cardData} />
                )}
              </div>
            </div>
            {!cardData ? <ActionsSkeleton /> : <Actions data={cardData} />}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerTitle></DrawerTitle>
        {!cardData ? <HeaderSkeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <DescriptionSkeleton />
              ) : (
                <Description data={cardData} />
              )}
            </div>
          </div>
          {!cardData ? <ActionsSkeleton /> : <Actions data={cardData} />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
