"use client";

import { toast } from "sonner";
import { List } from "@prisma/client";
import { ElementRef, useRef } from "react";
import {
  ClipboardCopy,
  CopyIcon,
  MoreHorizontal,
  PlusIcon,
  Printer,
  Trash2,
  X
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover";

import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { deleteList } from "@/action/tache/delete-list";
import { copyList } from "@/action/tache/copy-list";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`Liste "${data.title}" supprimée`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`Liste "${data.title}" copiée`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600 dark:text-zinc-100">
          Options
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant="ghost"
        >
          <PlusIcon />
          Ajouter une Tache
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} readOnly />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            readOnly
          />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            <CopyIcon />
            Dupliquer la liste
          </FormSubmit>
        </form>
        <Separator />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal text-red-500 hover:text-red-400"
            >
              <Trash2 />
              Supprimer la liste
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
              <form action={onDelete}>
                <input hidden name="id" id="id" value={data.id} readOnly />
                <input
                  hidden
                  name="boardId"
                  id="boardId"
                  value={data.boardId}
                  readOnly
                />
                <FormSubmit
                  variant="danger"
                >
                  Supprimer
                </FormSubmit>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Link
          href="/tache/[item]/[listId]"
          as={`/tache/${data.boardId}/${data.id}`}
        >
          <Button
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            variant="ghost"
          >
            <ClipboardCopy />
            Transferer Vers un autre tableau
          </Button>
        </Link>
        <Link href={`/imprime/list/${data.boardId}/${data.id}`} target="_blank">
          <Button
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            variant="ghost"
          >
            <Printer />
            Imprimer
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
};
