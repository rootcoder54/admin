"use client";

import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormPicker } from "../form/form-picker";
import { updateFontBoard } from "@/action/tache/update-font-board";
import { bgChange } from "@/action/tache/update-font-board/bgChange";

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
        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
        >
          Supprimer cette liste
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            >
              Changer l'image de font
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Changer l'image de font</DialogTitle>
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
      </PopoverContent>
    </Popover>
  );
};
