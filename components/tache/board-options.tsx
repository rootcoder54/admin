"use client";

import { toast } from "sonner";
import { Image, MoreHorizontal, Printer, Trash2, X } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { deleteBoard } from "@/action/tache/delete-board";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { FormPicker } from "../form/form-picker";
import { bgChange } from "@/action/tache/update-font-board/bgChange";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const router = useRouter();
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDelete = () => {
    execute({ id });
  };

  const onSubmit = (formData: FormData) => {
    const image = formData.get("image") as string;
    console.log(id, image);
    bgChange(id, image);
    router.push(`/tache/${id}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          Options
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal text-red-500 hover:text-red-400"
            >
              <Trash2 />
              Supprimer cette liste
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Suppression</DialogTitle>
              <DialogDescription>
                Etez-vous sûr de vouloir supprimer cette liste ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start items-center">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Annuler
                </Button>
              </DialogClose>
              <Button
                variant="danger"
                onClick={onDelete}
                disabled={isLoading}
              >
                <Trash2 />
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            >
              <Image />
              Changer l&apos;image de font
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Changer l&apos;image de font</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form action={onSubmit}>
              <div className="grid gap-4 py-4">
                <FormPicker id="image" />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  variant={"outline"}
                  className="h-auto w-full justify-center rounded-none p-2 px-5 text-sm font-normal"
                >
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Link
          href={`/imprime/board/${id}`}
          target="_blank"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          )}
        >
          <Printer />
          Imprimer la liste
        </Link>
      </PopoverContent>
    </Popover>
  );
};
