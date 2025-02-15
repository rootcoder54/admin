"use client";

import { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAction } from "@/hooks/use-action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { FormPicker } from "./form-picker";
import { createBoard } from "@/action/tache/create-board";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Tache crée!");
      closeRef.current?.click();
      router.push(`/tache/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
      //proModal.onOpen();
    }
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <div className="pb-4 text-center text-sm font-medium text-neutral-600">
                Créer une liste de tache
              </div>
            </DialogTitle>
            <DialogDescription>
              Image de font pour votre Tache.
            </DialogDescription>
          </DialogHeader>
          <form action={onSubmit} className="space-y-4">
            <div className="space-y-4">
              <FormPicker id="image" errors={fieldErrors} />
              <FormInput
                id="title"
                label="Titre"
                type="text"
                errors={fieldErrors}
              />
            </div>
            <FormSubmit className="w-full">Créer</FormSubmit>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
